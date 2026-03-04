# Troubleshooting – School Management System

Common issues, causes, and fixes for the MERN School Management System.

---

## 1. Database Connection Issues

### Symptom

- Backend logs show: `MongoDB connection error` or `MongoDB URI is undefined`.
- API returns 500 on all endpoints.

### Causes

- `MONGO_URI` not set or incorrect in `.env`.
- Network/firewall rules block Atlas or Mongo instance.
- MongoDB user credentials are invalid.

### Fix

1. Verify `.env`:

   ```bash
   echo $MONGO_URI
   ```

2. Confirm MongoDB Atlas IP allow‑list includes your server IP.
3. Test connection locally (e.g., with `mongosh`).
4. Restart backend after updating `.env`.

---

## 2. JWT Token Problems

### Symptom

- Frequent `401 Unauthorized`.
- Users are logged out unexpectedly.

### Causes

- Access token expired (15‑minute lifetime).
- Refresh token cookie is missing or invalid.
- System clock skew between client and server.

### Fix

1. Confirm cookies:
   - `accessToken` and `refreshToken` are set after `/api/auth/login`.
2. Check `JWT_SECRET` and `JWT_REFRESH_SECRET` match between login and validation environments.
3. Verify system time on the server (NTP).
4. If refresh endpoint (`/api/auth/refresh`) is failing, check:
   - Refresh token exists in DB and not revoked.
   - Cookie domain/path configuration.

---

## 3. File Upload Failures

### Symptom

- `400` responses from `/api/upload/*`.
- Error: “Only image files allowed” or “File too large”.

### Causes

- Unsupported file type (e.g., `.exe` or non‑image for profile).
- File exceeds configured size limits (5MB images, 10MB PDFs).
- AWS credentials or bucket misconfigured.

### Fix

1. Verify accepted file types:
   - Profile: `jpg`, `png`, `gif`.
   - Documents: `pdf`.
2. Check `.env`:
   - `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, `AWS_BUCKET_NAME`.
3. Ensure IAM policy grants:
   - `s3:PutObject`, `s3:GetObject`, `s3:DeleteObject` on the bucket/prefix.
4. Check backend logs for details around S3 errors.

---

## 4. Role / Permission Errors

### Symptom

- `403 Forbidden` when accessing a page or API.

### Causes

- User’s `role` doesn’t include required permission (RBAC).
- Route is protected with `restrictTo` and doesn’t list this role.

### Fix

1. Log in as an admin.
2. Go to **User Management**:
   - Confirm the user’s role is set correctly.
3. Adjust route permissions if business rules changed.

---

## 5. CORS and Cookie Issues

### Symptom

- Frontend cannot reach API; errors like `CORS policy: No 'Access-Control-Allow-Origin'`.
- httpOnly cookies not set in browser.

### Causes

- `CLIENT_ORIGIN` mismatch.
- Missing `credentials: true` on CORS and Axios/fetch.

### Fix

1. Ensure backend CORS config:

   ```js
   cors({
     origin: 'http://localhost:5173', // or prod frontend URL
     credentials: true
   })
   ```

2. On frontend, set `withCredentials: true` if using cookies.
3. For production, ensure domain/HTTPS configuration is correct.

---

## 6. Seed Script Problems

### Symptom

- `npm run seed` fails with validation errors or duplicate keys.

### Causes

- Database already contains conflicting data (duplicate emails/usernames).
- Schema changed after seeding script was written.

### Fix

1. For local dev, you can drop the database or collections before seeding.
2. Update the seed script to align with current schema.
3. Ensure unique fields (emails/usernames) are not being reused.

---

## 7. Frontend Not Loading / Blank Screen

### Symptom

- Browser shows blank page or console errors.

### Causes

- Vite build errors or missing `.env` vars.
- Incorrect `VITE_API_URL`.

### Fix

1. Check browser console (F12) for JavaScript errors.
2. Verify:
   - `VITE_API_URL` points to correct `/api` base.
3. Rebuild:

   ```bash
   cd frontend
   npm run build
   npm run dev
   ```

---

## 8. Performance Issues

### Symptom

- Slow API responses or UI lag on large lists.

### Causes

- Missing indexes on Mongo collections.
- Lack of pagination.
- Caching disabled or misconfigured.

### Fix

1. Ensure recommended indexes are created (see `API_DOCS` / DB section).
2. Verify list endpoints accept `page` and `limit` and that frontend uses them.
3. Enable and monitor Redis caching if configured.

