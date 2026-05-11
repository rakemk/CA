# CA Growth Hub

Professional CA firm management dashboard with transactions, clients, and analytics.

## Local Development

### Prerequisites
- Node.js 18+
- Backend (ca-firm) running locally on port 8080 or 8081

### Setup & Running

1. Install dependencies:
   ```bash
   npm install
   ```

2. Verify `.env.local` points to your backend:
   ```
   VITE_API_BASE_URL=http://localhost:8081
   VITE_ENABLE_MANUAL_LOGIN=false
   ```
   - If backend started on 8080, update to `http://localhost:8080`
   - Set `VITE_ENABLE_MANUAL_LOGIN=true` only when you also enable backend manual login config
   - Check backend startup logs to confirm active port

3. Start frontend dev server:
   ```bash
   npm run dev
   ```
   Frontend will run on `http://localhost:3000`

### OTP Testing
- Endpoint: `POST http://localhost:3000/login` → enters OTP flow
- API calls go to `${VITE_API_BASE_URL}/api/auth/request-otp`
- In dev mode, OTPs are logged to backend console (no email/SMS required)

### Dev-Only Manual Login
- Backend config (`application.properties`):
   - `app.auth.manual-enabled=true`
   - `app.auth.manual-identifier=you@example.com` (or phone)
- Frontend config (`.env.local`):
   - `VITE_ENABLE_MANUAL_LOGIN=true`
- This enables a `Manual Login` button on the login page in development mode only.
- No credentials are hardcoded in source; access is controlled by local config.

### Troubleshooting Port Issues
- Backend: Default 8080; if busy, falls back to 8081, 8082, ...
- Frontend: Port 3000 (configured in `vite.config.ts`)
- To check what port backend actually started on, look for startup log: `"listening on port XX"`

test1@gmail.com -> user
admin1@gmail.com -> admin
superadmin1@gmail.com -> super_admin