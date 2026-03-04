import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import connectDB from '../config/db.js';

dotenv.config();

const users = [
    {
        username: 'admin',
        email: 'admin@school.edu',
        password: 'Admin@2024Secure!',
        role: 'admin',
        profile: {
            firstName: 'Admin',
            lastName: 'User',
        },
        isActive: true
    },
    {
        username: 'admin2',
        email: 'admin2@school.edu',
        password: 'Admin@2024Secure!',
        role: 'admin',
        profile: {
            firstName: 'Admin',
            lastName: 'Two',
        },
        isActive: true
    },
    {
        username: 'director',
        email: 'director@school.edu',
        password: 'Director@2024Secure!',
        role: 'director',
        profile: {
            firstName: 'Director',
            lastName: 'User',
        },
        isActive: true
    },
    {
        username: 'wilson',
        email: 'wilson@school.edu',
        password: 'Teacher@2024Secure!',
        role: 'teacher',
        profile: {
            firstName: 'Wilson',
            lastName: 'Teacher',
        },
        isActive: true
    },
    {
        username: 'emma.j',
        email: 'emma.j@student.edu',
        password: 'Student@2024Secure!',
        role: 'student',
        profile: {
            firstName: 'Emma',
            lastName: 'Johnson',
        },
        isActive: true
    },
    {
        username: 'nurse',
        email: 'nurse@school.edu',
        password: 'Nurse@2024Secure!',
        role: 'nurse',
        profile: {
            firstName: 'Nurse',
            lastName: 'User',
        },
        isActive: true
    },
    {
        username: 'secretary',
        email: 'secretary@school.edu',
        password: 'Secretary@2024Secure!',
        role: 'secretary',
        profile: {
            firstName: 'Secretary',
            lastName: 'User',
        },
        isActive: true
    }
];

const seedUsers = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await connectDB();

        console.log('Clearing existing users...');
        await User.deleteMany({});

        console.log('Creating users from User Guide...');
        for (const userData of users) {
            const user = new User(userData);
            await user.save();
            console.log(`✅ Created: ${user.email} (${user.role})`);
        }

        console.log('\n✅ Database seeded successfully!');
        console.log('\n' + '='.repeat(50));
        console.log('📋 DEFAULT LOGINS FROM USER GUIDE:');
        console.log('='.repeat(50));
        users.forEach(u => {
            console.log(`${u.role.padEnd(10)}: ${u.email} / ${u.password}`);
        });
        console.log('='.repeat(50));

        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding error:', error);
        process.exit(1);
    }
};

seedUsers();