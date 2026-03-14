# Consent Management Implementation Guide

## Overview

This document describes the complete implementation of **Privasimu Consent Management** integration for the AI Literacy Training Platform. The system allows users to manage their privacy preferences through an external consent management service (Privasimu).

---

## Architecture

### System Flow

```
User → Frontend (Next.js) → Backend API (Express) → Privasimu API
                ↓                    ↓
         Zustand Store        PostgreSQL Database
```

### Key Components

1. **Backend Services**
   - `privasimu.service.ts` - External API client for Privasimu
   - `consent.service.ts` - Business logic for consent management
   - `consent.controller.ts` - HTTP request handlers
   - `consent.routes.ts` - API route definitions

2. **Frontend Components**
   - `consent.store.ts` - Zustand state management
   - `api.ts` - API client with consent endpoints
   - `privacy/page.tsx` - Privacy settings UI

3. **Database**
   - `UserConsent` model in Prisma schema

---

## Implementation Details

### 1. Database Schema

**File:** `/backend/prisma/schema.prisma`

Added `UserConsent` model:

```prisma
model UserConsent {
  id                    String    @id @default(uuid())
  
  // Privasimu integration fields
  privasimuToken        String?   @db.Text
  privasimuTokenExpiry  DateTime?
  collectionPointCode   String?
  
  // Consent preferences (synced with Privasimu)
  consents              Json      @default("[]")
  
  // Metadata
  lastSyncedAt          DateTime?
  consentVersion        String    @default("1.0")
  ipAddress             String?
  userAgent             String?
  
  createdAt             DateTime  @default(now())
  updatedAt             DateTime  @updatedAt
  
  userId                String    @unique
  user                  User      @relation(fields: [userId], references: [id])
  
  @@index([userId])
  @@index([lastSyncedAt])
}
```

**Migration Command:**
```bash
cd backend
npx prisma migrate dev --name add_user_consent
npx prisma generate
```

---

### 2. Backend Implementation

#### Privasimu API Client (`privasimu.service.ts`)

Handles communication with external Privasimu service:

**Key Methods:**
- `generateToken(userId, name)` - Generate JWT token for user
- `getConsents(token, collectionPointCode)` - Fetch available consents
- `saveConsents(token, consents, isAgree)` - Save user's consent selections
- `isTokenExpired(expiryDate)` - Check token validity
- `validateConfig()` - Validate environment configuration

**API Endpoints Used:**
- `POST /user/consents/request-token` - Token generation
- `GET /user/consents/{collection_point_code}` - Get consents
- `POST /user/consents/{collection_point_code}` - Save consents

#### Consent Service (`consent.service.ts`)

Business logic layer:

**Key Methods:**
- `getUserConsent(userId)` - Get user's consent preferences (auto-syncs if needed)
- `updateUserConsent(userId, consentUpdates)` - Update consent preferences
- `syncUserConsent(userId)` - Force sync with Privasimu
- `getConsentHistory(userId, limit)` - Get audit trail
- `logConsentChange(...)` - Log changes to audit log

**Features:**
- Automatic token refresh when expired
- Local caching in PostgreSQL
- Audit trail logging
- Error handling and retry logic

#### Consent Controller (`consent.controller.ts`)

HTTP request handlers with validation:

**Endpoints:**
- `GET /api/consent` - Get current user's consent preferences
- `PUT /api/consent` - Update consent preferences
- `POST /api/consent/sync` - Force sync with Privasimu
- `GET /api/consent/history` - Get consent change history

**Features:**
- Zod schema validation
- Authentication required
- Audit logging
- Error handling

#### Routes (`consent.routes.ts`)

Mounts consent endpoints with authentication middleware.

---

### 3. Frontend Implementation

#### Consent Store (`consent.store.ts`)

Zustand store for state management:

**State:**
```typescript
{
  consentData: ConsentData | null;
  isLoading: boolean;
  error: string | null;
  isSaving: boolean;
  lastFetchedAt: Date | null;
}
```

**Actions:**
- `fetchConsent()` - Fetch from API
- `updateConsent(updates)` - Save to API
- `toggleConsent(code)` - Toggle local state
- `syncConsent()` - Force sync
- `reset()` - Reset store

**Features:**
- Persistent storage (localStorage)
- Optimistic UI updates
- Error handling
- Loading states

#### API Client (`api.ts`)

Added `consentAPI` with methods:

```typescript
consentAPI = {
  getConsent(): Promise<ApiResponse<ConsentData>>,
  updateConsent(consents): Promise<ApiResponse<ConsentData>>,
  syncConsent(): Promise<ApiResponse<ConsentData>>,
  getConsentHistory(limit?): Promise<ApiResponse<AuditLog[]>>
}
```

**Features:**
- Demo mode support (mock data)
- Authentication headers
- Error handling
- Type safety

#### Privacy Settings Page (`privacy/page.tsx`)

Updated UI with full API integration:

**Features:**
- Dynamic consent rendering from API
- Real-time toggle switches
- Loading states (spinner)
- Error states (alert banner)
- Success/error toasts
- Sync button with animation
- Save button with loading state
- Last synced timestamp
- Disabled states during operations

**User Flow:**
1. Page loads → Fetch consent data from API
2. User toggles consent → Update local state
3. User clicks "Save" → Send to API → Update Privasimu → Show success toast
4. User clicks "Sync" → Force refresh from Privasimu

---

### 4. Environment Configuration

**File:** `/backend/.env.example`

Added Privasimu configuration:

```env
# Privasimu Consent Management
PRIVASIMU_BASE_URL="https://api.privasimu.com"
PRIVASIMU_SECRET_KEY="your-privasimu-secret-key"
PRIVASIMU_CLIENT_ID="your-privasimu-client-id"
PRIVASIMU_COLLECTION_POINT_CODE="your-collection-point-code"
```

**Setup Instructions:**
1. Copy `.env.example` to `.env`
2. Contact Privasimu to get credentials:
   - Secret Key
   - Client ID
   - Collection Point Code
3. Update `.env` with real values

---

## API Documentation

### Backend Endpoints

#### 1. Get User Consent

```http
GET /api/consent
Authorization: Bearer {access_token}
```

**Response:**
```json
{
  "success": true,
  "message": "Consent data retrieved successfully",
  "data": {
    "userId": "user-123",
    "consents": [
      {
        "code": "93778942",
        "name": "Marketing Communications",
        "description": "Receive marketing emails",
        "is_agree": false
      }
    ],
    "lastSyncedAt": "2026-03-14T10:30:00Z",
    "consentVersion": "1.0"
  }
}
```

#### 2. Update User Consent

```http
PUT /api/consent
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "consents": [
    { "code": "93778942", "is_agree": true },
    { "code": "82458070", "is_agree": false }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Consent preferences updated successfully",
  "data": { /* updated consent data */ }
}
```

#### 3. Sync Consent

```http
POST /api/consent/sync
Authorization: Bearer {access_token}
```

**Response:**
```json
{
  "success": true,
  "message": "Consent data synced successfully",
  "data": { /* synced consent data */ }
}
```

#### 4. Get Consent History

```http
GET /api/consent/history?limit=50
Authorization: Bearer {access_token}
```

**Response:**
```json
{
  "success": true,
  "message": "Consent history retrieved successfully",
  "data": [
    {
      "id": "log-1",
      "action": "consent_updated",
      "details": { "consents": ["93778942"] },
      "createdAt": "2026-03-14T10:00:00Z"
    }
  ]
}
```

---

## Testing Guide

### 1. Backend Testing

**Prerequisites:**
- PostgreSQL running
- Privasimu credentials configured in `.env`

**Steps:**

```bash
# 1. Run database migration
cd backend
npx prisma migrate dev

# 2. Start backend server
npm run dev

# 3. Test endpoints with curl or Postman

# Get consent (requires auth token)
curl -X GET http://localhost:3001/api/consent \
  -H "Authorization: Bearer YOUR_TOKEN"

# Update consent
curl -X PUT http://localhost:3001/api/consent \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"consents":[{"code":"93778942","is_agree":true}]}'

# Sync consent
curl -X POST http://localhost:3001/api/consent/sync \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 2. Frontend Testing

**Prerequisites:**
- Backend running
- User logged in

**Steps:**

```bash
# 1. Start frontend
cd frontend
npm run dev

# 2. Navigate to privacy settings
# http://localhost:3000/settings/privacy

# 3. Test functionality:
# - Page loads consent data
# - Toggle switches work
# - Save button persists changes
# - Sync button refreshes data
# - Success/error toasts appear
# - Loading states display correctly
```

### 3. Demo Mode Testing

**Enable Demo Mode:**

Edit `/frontend/src/lib/api.ts`:
```typescript
const DEMO_MODE = true; // Set to true for testing without backend
```

**Features in Demo Mode:**
- Mock consent data
- Simulated API delays
- No real API calls
- Perfect for UI testing

---

## Deployment Checklist

### Backend

- [ ] Run Prisma migration: `npx prisma migrate deploy`
- [ ] Set environment variables in production:
  - `PRIVASIMU_BASE_URL`
  - `PRIVASIMU_SECRET_KEY`
  - `PRIVASIMU_CLIENT_ID`
  - `PRIVASIMU_COLLECTION_POINT_CODE`
- [ ] Verify Privasimu API connectivity
- [ ] Test consent endpoints with production credentials
- [ ] Enable audit logging
- [ ] Set up monitoring for Privasimu API errors

### Frontend

- [ ] Set `DEMO_MODE = false` in `/frontend/src/lib/api.ts`
- [ ] Configure `NEXT_PUBLIC_API_URL` environment variable
- [ ] Test privacy settings page in production
- [ ] Verify consent persistence
- [ ] Test error handling (network failures, API errors)
- [ ] Verify toast notifications work
- [ ] Test loading states

### Database

- [ ] Backup database before migration
- [ ] Run migration: `npx prisma migrate deploy`
- [ ] Verify `UserConsent` table created
- [ ] Check indexes are created
- [ ] Test database performance with consent queries

---

## Troubleshooting

### Common Issues

#### 1. "Failed to generate Privasimu token"

**Cause:** Invalid credentials or network issue

**Solution:**
- Verify `PRIVASIMU_SECRET_KEY` and `PRIVASIMU_CLIENT_ID` in `.env`
- Check Privasimu API is accessible
- Review backend logs for detailed error

#### 2. "Consent data not found"

**Cause:** User has no consent record yet

**Solution:**
- First API call will create consent record automatically
- Verify user is authenticated
- Check database for `UserConsent` entry

#### 3. Token expired errors

**Cause:** Privasimu token expired

**Solution:**
- System automatically refreshes tokens
- If issue persists, check token expiry logic in `consent.service.ts`
- Verify Privasimu token expiry format

#### 4. Frontend not loading consent data

**Cause:** API endpoint not accessible or CORS issue

**Solution:**
- Check `NEXT_PUBLIC_API_URL` is correct
- Verify backend is running
- Check browser console for errors
- Verify CORS configuration in backend

#### 5. Consent changes not persisting

**Cause:** API call failing or validation error

**Solution:**
- Check network tab in browser DevTools
- Verify request payload format
- Check backend logs for validation errors
- Ensure user is authenticated

---

## Security Considerations

### Authentication

- All consent endpoints require authentication
- JWT tokens validated on every request
- Refresh token mechanism for expired tokens

### Data Privacy

- Consent data stored encrypted in PostgreSQL
- Privasimu tokens stored securely
- Audit trail for all consent changes
- IP address and user agent logged for compliance

### API Security

- Rate limiting on consent endpoints
- Input validation with Zod schemas
- SQL injection prevention (Prisma ORM)
- XSS protection (React escaping)

### GDPR Compliance

- User can view all consent preferences
- User can update consent at any time
- Audit trail for consent changes
- Right to be forgotten (delete consent data)

---

## Future Enhancements

### Planned Features

1. **Consent Banner**
   - First-time user consent prompt
   - GDPR/CCPA compliance banner
   - Cookie consent integration

2. **Consent History UI**
   - View past consent changes
   - Export consent history
   - Filter by date range

3. **Admin Dashboard**
   - View organization-wide consent statistics
   - Export consent reports
   - Manage consent templates

4. **Email Notifications**
   - Notify user when consent changes
   - Remind user to review consent periodically
   - Compliance notifications

5. **Multi-language Support**
   - Translate consent descriptions
   - Support for regional compliance (GDPR, CCPA, etc.)

6. **Consent Versioning**
   - Track consent policy versions
   - Require re-consent when policy changes
   - Version history

---

## File Structure

```
backend/
├── prisma/
│   └── schema.prisma                 # Updated with UserConsent model
├── src/
│   ├── controllers/
│   │   └── consent.controller.ts     # NEW: HTTP request handlers
│   ├── services/
│   │   ├── privasimu.service.ts      # NEW: Privasimu API client
│   │   └── consent.service.ts        # NEW: Business logic
│   └── routes/
│       ├── consent.routes.ts         # NEW: Route definitions
│       └── index.ts                  # UPDATED: Mount consent routes
└── .env.example                      # UPDATED: Privasimu config

frontend/
├── src/
│   ├── app/
│   │   └── settings/
│   │       └── privacy/
│   │           └── page.tsx          # UPDATED: Full API integration
│   ├── lib/
│   │   └── api.ts                    # UPDATED: Added consentAPI
│   └── store/
│       └── consent.store.ts          # NEW: Zustand store
└── .env.example                      # (if needed for frontend config)
```

---

## Support

For issues or questions:

1. **Backend Issues:** Check `/backend/logs` for error details
2. **Frontend Issues:** Check browser console for errors
3. **Privasimu API Issues:** Contact Privasimu support
4. **Database Issues:** Check PostgreSQL logs

---

## Changelog

### Version 1.0.0 (2026-03-14)

**Added:**
- Privasimu API integration
- UserConsent database model
- Backend consent service, controller, and routes
- Frontend consent store and API client
- Privacy settings page with full API integration
- Audit logging for consent changes
- Environment configuration for Privasimu

**Features:**
- Get user consent preferences
- Update consent preferences
- Sync with Privasimu service
- View consent history
- Real-time UI updates
- Loading and error states
- Success/error notifications

---

## License

This implementation is part of the AI Literacy Training Platform.
All rights reserved.
