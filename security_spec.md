# Security Specification for Akash Studio Academy

## Data Invariants
1. A user profile MUST match the request.auth.uid.
2. A message MUST have a valid content string (max 500 chars).
3. A message's userId MUST match the request.auth.uid.
4. Lessons are read-only for authenticated students.

## The Dirty Dozen Payloads (Rejection Targets)
1. User profile with `role: 'admin'` sent by a non-admin.
2. Message with `userId: 'attacker_id'` sent by `user_id`.
3. Message content > 1MB.
4. Deleting a message owned by someone else.
5. Reading lessons without authentication.
6. Creating a lesson as a student (only admin).
7. Updating `createdAt` on an existing message.
8. Injecting `isVerified: true` into a user profile.
9. Using a non-alphanumeric character as a document ID for a message.
10. Creating a user profile for a different email than the one in the auth token.
11. Sending a message with a future timestamp.
12. Bulk list query of all users without being an admin.

## Implementation logic
- `isValidUser()`: checks `userId`, `email`, `role`.
- `isValidMessage()`: checks `userId`, `content`.
- `isOwner()`: `request.auth.uid == userId`.
