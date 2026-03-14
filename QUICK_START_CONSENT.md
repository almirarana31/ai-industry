# Quick Start: Consent Management Setup

## 🚀 5-Minute Setup Guide

### Step 1: Configure Environment Variables

Edit `/backend/.env`:

```env
# Add these lines to your .env file
PRIVASIMU_BASE_URL="https://api.privasimu.com"
PRIVASIMU_SECRET_KEY="your-secret-key-here"
PRIVASIMU_CLIENT_ID="your-client-id-here"
PRIVASIMU_COLLECTION_POINT_CODE="your-collection-point-code"
```

**Where to get credentials:**
- Contact Privasimu support to obtain your credentials
- Or use the values from the PDF documentation if you have test credentials

---

### Step 2: Run Database Migration

```bash
cd backend
npx prisma migrate dev --name add_user_consent
npx prisma generate
```

This creates the `UserConsent` table in your database.

---

### Step 3: Install Dependencies (if needed)

```bash
# Backend
cd backend
npm install axios zod

# Frontend
cd frontend
npm install zustand
```

---

### Step 4: Start the Application

```bash
# Terminal 1: Start backend
cd backend
npm run dev

# Terminal 2: Start frontend
cd frontend
npm run dev
```

---

### Step 5: Test the Feature

1. **Open browser:** http://localhost:3000
2. **Login** to your account
3. **Navigate to:** Settings → Privacy (or directly to http://localhost:3000/settings/privacy)
4. **Test features:**
   - ✅ Page loads consent preferences
   - ✅ Toggle switches work
   - ✅ Click "Save Preferences" button
   - ✅ See success toast notification
   - ✅ Click "Sync" button to refresh from Privasimu

---

## 🧪 Testing Without Privasimu (Demo Mode)

If you don't have Privasimu credentials yet, you can test with mock data:

**Edit `/frontend/src/lib/api.ts`:**

```typescript
// Line 14
const DEMO_MODE = true; // Keep this as true for testing
```

In demo mode:
- Frontend uses mock consent data
- No real API calls to Privasimu
- All UI features work normally
- Perfect for development and testing

---

## 📋 Verification Checklist

After setup, verify these work:

- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Privacy settings page loads
- [ ] Consent items display correctly
- [ ] Toggle switches respond to clicks
- [ ] "Save Preferences" button works
- [ ] Success toast appears after saving
- [ ] "Sync" button refreshes data
- [ ] Loading spinners appear during operations

---

## 🐛 Troubleshooting

### Backend won't start

**Error:** `PRIVASIMU_SECRET_KEY is not configured`

**Solution:** Add Privasimu credentials to `/backend/.env`

---

### Database migration fails

**Error:** `Can't reach database server`

**Solution:** 
1. Make sure PostgreSQL is running
2. Check `DATABASE_URL` in `/backend/.env`
3. Run: `docker-compose up -d` (if using Docker)

---

### Frontend shows "Failed to fetch consent data"

**Solution:**
1. Check backend is running on port 3001
2. Enable demo mode in `/frontend/src/lib/api.ts`
3. Check browser console for errors

---

### Consent changes don't persist

**Solution:**
1. Check backend logs for errors
2. Verify Privasimu credentials are correct
3. Test with demo mode first

---

## 📚 Next Steps

1. **Read full documentation:** See `CONSENT_IMPLEMENTATION.md`
2. **Configure production:** Update `.env` with production Privasimu credentials
3. **Test end-to-end:** Test with real Privasimu API
4. **Deploy:** Follow deployment checklist in main documentation

---

## 🆘 Need Help?

- **Backend errors:** Check `/backend/logs` or console output
- **Frontend errors:** Check browser DevTools console
- **API errors:** Check Privasimu API status
- **Database errors:** Check PostgreSQL logs

---

## 📁 Key Files Created/Modified

### Backend
- ✅ `/backend/src/services/privasimu.service.ts` (NEW)
- ✅ `/backend/src/services/consent.service.ts` (NEW)
- ✅ `/backend/src/controllers/consent.controller.ts` (NEW)
- ✅ `/backend/src/routes/consent.routes.ts` (NEW)
- ✅ `/backend/src/routes/index.ts` (UPDATED)
- ✅ `/backend/prisma/schema.prisma` (UPDATED)
- ✅ `/backend/.env.example` (UPDATED)

### Frontend
- ✅ `/frontend/src/store/consent.store.ts` (NEW)
- ✅ `/frontend/src/lib/api.ts` (UPDATED)
- ✅ `/frontend/src/app/settings/privacy/page.tsx` (UPDATED)

---

## ✨ Features Implemented

✅ **Backend:**
- Privasimu API integration
- Token management (auto-refresh)
- Consent CRUD operations
- Audit logging
- Error handling

✅ **Frontend:**
- Zustand state management
- Real-time UI updates
- Loading states
- Error handling
- Success/error notifications
- Sync functionality

✅ **Database:**
- UserConsent model
- Audit trail support
- Token caching

---

**That's it! You're ready to use consent management. 🎉**

For detailed information, see `CONSENT_IMPLEMENTATION.md`.
