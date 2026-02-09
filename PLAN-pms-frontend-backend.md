# PMS Implementation Plan: Pages 1-8 (Frontend & Backend)

**Goal:** Implement the first 8 pages of the AyurGrid PMS with meticulous attention to UI/UX guidelines and robust backend integration, following a specific "Frontend -> Verify -> Backend" cycle for each page.

**Source of Truth:**

- **Design System:** `e:/ayurgrid/design-system/MASTER.md`
- **UI Guidelines:** `e:/ayurgrid/guideline uiux for screen 1-9/`
- **Database:** Supabase (`public.users`, `public.hospitals`, `public.staff`, etc. to be created)

## 🔄 Execution Protocol (Per Page)

1. **Read Guidelines:** Analyze the specific folder in `guideline uiux for screen 1-9/` for the current page.
2. **Frontend Implementation:** Build the UI using Next.js, Tailwind CSS, and Shadcn UI.
    - *Focus:* Pixel-perfect design, responsiveness, aesthetic polish.
3. **Frontend Verification:** Verify the page renders correctly on local and Vercel.
4. **Backend Integration:**
    - Setup database schema/migration if needed.
    - Implement Server Actions / API routes.
    - Connect forms to Supabase.
5. **Full Verification:** Test the complete flow (UI + Data).

---

## 📅 Phase 1: Authentication & Access

### 1. Login Screen

**Folder:** `ayurgrid_login_-_deep_herbal_variant`

- [ ] **Frontend:**
  - Create `src/app/login/page.tsx`
  - Implement "Deep Herbal" variant design.
  - Add login form (Email/Phone).
- [ ] **Verify Frontend:** Check responsive layout and aesthetics.
- [ ] **Backend:**
  - Integrate `supabase.auth.signInWithPassword` or OTP.
  - Handle auth state changes.
- [ ] **Verify Full:** Successful login redirects to dashboard/onboarding.

### 2. OTP Verification Screen

**Folder:** `otp_verification_screen`

- [ ] **Frontend:**
  - Create `src/app/auth/verify/page.tsx`
  - Design OTP input layout.
- [ ] **Verify Frontend:** Visual check.
- [ ] **Backend:**
  - Implement OTP verification logic.
  - Handle resend OTP.
- [ ] **Verify Full:** Verify OTP completes authentication.

### 3. Account Recovery & Password Reset

**Folder:** `account_recovery_&_password_reset`

- [ ] **Frontend:**
  - Create `src/app/auth/recovery/page.tsx`
  - Design recovery request and reset password forms.
- [ ] **Verify Frontend:** Visual check.
- [ ] **Backend:**
  - Implement password reset email trigger.
  - Implement password update logic.
- [ ] **Verify Full:** Test full recovery flow.

---

## 🏥 Phase 2: Onboarding Implementation

### 4. Clinic Identity & Legal Ownership

**Folder:** `onboarding__clinic_identity_&_legal_ownership`

- [ ] **Frontend:**
  - Create `src/app/onboarding/identity/page.tsx`
  - Design form for Clinic Name, Logo, Legal Entity type.
- [ ] **Verify Frontend:** Visual check.
- [ ] **Backend:**
  - Create `hospitals` table in Supabase.
  - Implement insert/update logic for clinic details.
  - Handle Logo upload to Supabase Storage.
- [ ] **Verify Full:** Data persists to DB.

### 5. Location & Infrastructure

**Folder:** `onboarding__location_&_infrastructure_setup`

- [ ] **Frontend:**
  - Create `src/app/onboarding/location/page.tsx`
  - Design address, geolocation, and facilities form.
- [ ] **Verify Frontend:** Visual check.
- [ ] **Backend:**
  - Update `hospitals` table with location data.
  - Implement map integration (if required/feasible).
- [ ] **Verify Full:** Location data saves correctly.

### 6. Account Security & Verification

**Folder:** `onboarding__account_security_&_verification`

- [ ] **Frontend:**
  - Create `src/app/onboarding/security/page.tsx`
  - Design 2FA setup or document upload UI.
- [ ] **Verify Frontend:** Visual check.
- [ ] **Backend:**
  - Implement document upload (KYC) to Storage.
  - Update verification status in DB.
- [ ] **Verify Full:** Documents upload and link to hospital.

### 7. IPD Configuration

**Folder:** `onboarding__in-patient_department_configuration`

- [ ] **Frontend:**
  - Create `src/app/onboarding/ipd/page.tsx`
  - Design bed/ward configuration UI.
- [ ] **Verify Frontend:** Visual check.
- [ ] **Backend:**
  - Create `wards` and `beds` tables.
  - Implement logic to add/edit wards and beds.
- [ ] **Verify Full:** IPD hierarchy saves correctly.

---

## 👥 Phase 3: Staff Management (Initial)

### 8. Staff Invitation (Part 1)

**Folder:** `staff_invitation_&_account_setup_1`

- [ ] **Frontend:**
  - Create `src/app/settings/staff/invite/page.tsx`
  - Design staff invitation form (Email, Role).
- [ ] **Verify Frontend:** Visual check.
- [ ] **Backend:**
  - Integrates with `supabase.auth.admin.inviteUserByEmail` (or custom email logic).
  - Create `staff` profile records.
- [ ] **Verify Full:** Invite email sent/simulated and record created.

---

## ✅ Verification Checklist

For each page, before marking complete:

- [ ] **UI:** Matches "Pro Max" design system guidelines?
- [ ] **Responsive:** Works on Mobile and Desktop?
- [ ] **Type Safety:** No TypeScript errors?
- [ ] **Data:** Data correctly saves/retrieves from Supabase?
- [ ] **Error Handling:** Graceful error messages shown?
