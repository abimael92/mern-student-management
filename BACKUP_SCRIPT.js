/**
 * Backup script for School Management System
 *
 * - Exports all MongoDB collections to JSON
 * - Zips exported JSON files and uploads directory (if stored locally)
 * - Uploads the archive to an S3 backup bucket
 * - Keeps the last 7 days of backups in S3 (older ones are removed)
 *
 * Usage (from project root or backend):
 *   node BACKUP_SCRIPT.js
 *
 * NOTE: This script is a template. Wire it into your scheduler (cron, CI, etc.)
 * and adjust paths/bucket names as needed.
 */

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { S3Client, PutObjectCommand, ListObjectsV2Command, DeleteObjectCommand } from '@aws-sdk/client-s3';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONGO_URI = process.env.MONGO_URI;
const BACKUP_BUCKET = process.env.BACKUP_BUCKET || process.env.AWS_BUCKET_NAME;
const AWS_REGION = process.env.AWS_REGION;

if (!MONGO_URI || !BACKUP_BUCKET || !AWS_REGION) {
  console.error('Missing MONGO_URI, BACKUP_BUCKET, or AWS_REGION in environment');
  process.exit(1);
}

const s3 = new S3Client({ region: AWS_REGION });

const run = async () => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupDir = path.join(__dirname, 'backups', timestamp);
  const uploadsDir = path.join(__dirname, 'uploads'); // adjust if your uploads live elsewhere

  fs.mkdirSync(backupDir, { recursive: true });

  // 1. Connect to Mongo and export collections
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db;
  const collections = await db.collections();

  for (const coll of collections) {
    const name = coll.collectionName;
    const docs = await coll.find({}).toArray();
    const outPath = path.join(backupDir, `${name}.json`);
    fs.writeFileSync(outPath, JSON.stringify(docs, null, 2));
  }

  await mongoose.disconnect();

  // 2. Create a ZIP archive (simple .tar.gz-like technique could be used; here we just zip folder contents)
  const archiver = await import('archiver');
  const archiveName = `backup-${timestamp}.zip`;
  const archivePath = path.join(__dirname, 'backups', archiveName);
  const output = fs.createWriteStream(archivePath);
  const archive = archiver.default('zip', { zlib: { level: 9 } });

  archive.pipe(output);
  archive.directory(backupDir, 'db');
  if (fs.existsSync(uploadsDir)) {
    archive.directory(uploadsDir, 'uploads');
  }
  await archive.finalize();

  // 3. Upload archive to S3
  const key = `backups/${archiveName}`;
  const fileBuffer = fs.readFileSync(archivePath);

  await s3.send(
    new PutObjectCommand({
      Bucket: BACKUP_BUCKET,
      Key: key,
      Body: fileBuffer
    })
  );

  console.log(`Uploaded backup to s3://${BACKUP_BUCKET}/${key}`);

  // 4. Keep last 7 backups; delete older
  const listed = await s3.send(
    new ListObjectsV2Command({
      Bucket: BACKUP_BUCKET,
      Prefix: 'backups/'
    })
  );

  const backups = (listed.Contents || [])
    .filter((o) => o.Key && o.Key.endsWith('.zip'))
    .sort((a, b) => new Date(b.LastModified) - new Date(a.LastModified));

  const toDelete = backups.slice(7); // keep first 7 (newest)

  for (const obj of toDelete) {
    await s3.send(
      new DeleteObjectCommand({
        Bucket: BACKUP_BUCKET,
        Key: obj.Key
      })
    );
    console.log(`Deleted old backup: ${obj.Key}`);
  }

  console.log('Backup completed successfully');
};

run().catch((err) => {
  console.error('Backup failed:', err);
  process.exit(1);
});

