# HRIS Platform Technical Assessment

## Overview

This project is a multi-tenant Human Resource Information System (HRIS) built using React.js, Firebase, and Node.js. The system enables employers to manage employee records, upload sensitive documents securely, and enforce strict access control using Firebase Authentication and Security Rules.

The architecture prioritizes **security, scalability, and tenant isolation**.

---

## Tech Stack

* React.js (Frontend)
* Firebase Authentication
* Firebase Firestore
* Firebase Storage
* Firebase Cloud Functions
* Vercel (Deployment)

---

## Environment Variables

The following environment variables are required:

| Variable                               | Description                  |
| -------------------------------------- | ---------------------------- |
| REACT_APP_FIREBASE_API_KEY             | Firebase API Key             |
| REACT_APP_FIREBASE_AUTH_DOMAIN         | Firebase Auth Domain         |
| REACT_APP_FIREBASE_PROJECT_ID          | Firebase Project ID          |
| REACT_APP_FIREBASE_STORAGE_BUCKET      | Firebase Storage Bucket      |
| REACT_APP_FIREBASE_MESSAGING_SENDER_ID | Firebase Messaging Sender ID |
| REACT_APP_FIREBASE_APP_ID              | Firebase App ID              |

### Local Setup

1. Create a `.env` file in `/client`
2. Add the variables above
3. Run `npm install`
4. Run `npm start`

---

## Authentication & Authorization

### Approach

Authentication is handled using Firebase Auth with email/password login.

Authorization is implemented using **Firebase Custom Claims**.

### Why Custom Claims?

Custom Claims are stored securely in Firebase Auth tokens and cannot be modified by the client.

If roles were stored in Firestore:

* A malicious user could modify their role field
* They could escalate privileges (e.g., become admin)

Custom Claims prevent:

* Role tampering
* Unauthorized privilege escalation

---

## Firestore Data Model

### Structure Choice: Top-Level Collection

Collection: `employees`

Each document:

```
{
  fullName: string,
  nationalId: string,
  jobTitle: string,
  department: string,
  startDate: timestamp,
  status: string,
  employerId: string
}
```

### Justification

1. Enables efficient querying across employees
2. Supports indexing and scalability
3. Avoids deeply nested queries

### Tenant Isolation

Each document includes `employerId`, which is matched against `request.auth.uid`.

This prevents:

* Employer A accessing Employer B’s data
* Enumeration attacks across tenants

### Future Extensibility

Employees can later be upgraded to full users by linking:

```
employee.userId = Firebase Auth UID
```

No migration required.

---

## Firestore Security Rules

Security rules enforce:

* Only authenticated users can access data
* Employers can only access their own records
* Admins (via custom claims) can access all data
* `createdAt` cannot be modified
* Role fields cannot be changed by clients

Example reasoning:

```
// Prevents an employer from accessing another employer's employees
```

---

## File Upload & Storage

### Storage Path

```
Documents/{employerId}/{employeeId}/{YYYY-MM}/{filename}.pdf
```

### Security Approach

* Only authenticated users can upload
* Access restricted to matching employerId
* Files are NOT publicly accessible

### Public URL vs Signed URL

* Public URL → accessible by anyone (insecure)
* Signed URL → time-limited secure access

This system uses **authenticated access**, preventing unauthorized downloads.

---

## Cloud Function (SendGrid Email)

### Trigger

Firestore `onCreate` event for new documents.

### Why Cloud Function?

If implemented in frontend:

* API key would be exposed
* Attackers could send unlimited emails
* Could lead to spam abuse and billing issues

### Protected Approach

* SendGrid key stored securely in environment variables
* Function runs server-side
* Errors handled gracefully

---

## Firestore Backups

### Approach

* Use Cloud Scheduler
* Trigger Firestore export daily

### Storage

* Google Cloud Storage bucket
* Naming: `hris-backups-{date}`

### Retention Policy

* 30–90 days recommended

### Verification

* Restore backup to staging environment
* Validate data integrity

---

## Architecture Overview

System Flow:

1. User logs in via Firebase Auth
2. Token includes Custom Claims (role)
3. React app renders protected routes
4. Firestore rules enforce access control
5. File uploads stored in Firebase Storage
6. Cloud Function triggers email notification

---

## Security Review

### Authentication

* Firebase Auth ensures identity verification
* Unauthorized users cannot access system

### Authorization

* Firestore + Storage rules enforce tenant isolation
* Custom Claims prevent privilege escalation

### Secrets Management

* API keys stored in `.env`
* SendGrid key stored in Firebase environment

### Known Gaps

* No UI validation for roles yet
* No audit logging
* No rate limiting

---

## Honest Gaps & Improvements

### Incomplete Areas

* Full admin dashboard not implemented
* Email UI not fully customizable
* No advanced error handling UI

### Risks

* Limited UI feedback
* Minimal validation

### Next Steps (Given 1 Week)

* Implement role-based UI rendering
* Improve UI/UX
* Add audit logs
* Add pagination and search
* Strengthen validation

---

## Deployment

* Hosted on Vercel
* Firebase backend services connected

---

## Conclusion

This project demonstrates a secure, scalable HRIS platform with strong emphasis on:

* Tenant isolation
* Secure authentication and authorization
* Cloud-based architecture

The system is designed for production readiness with clear pathways for extension.
