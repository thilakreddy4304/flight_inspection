# Authentication in Flight Inspection System

## Overview

This document describes the authentication implementation in the Flight Inspection System front-end. The system includes sign-up and sign-in pages that match the provided design mockups.

## Features

### Sign-in Page

- Email and password authentication
- "Remember me" functionality
- "Forgot password" link
- Social sign-in options (Google, Microsoft)
- Redirects to sign-up page for new users

### Sign-up Page

- Email and password registration
- "Remember me" functionality
- Social sign-up options (Google, Microsoft)
- Redirects to sign-in page for existing users

### Authentication Flow

- Protected routes requiring authentication
- Automatic redirection to sign-in page when accessing protected routes without authentication
- Remembers and redirects to originally requested page after successful sign-in
- Logout functionality in both header and dashboard

## Implementation Details

### Authentication Context

The authentication state is managed through React Context API, providing:

- Current user information
- Authentication status
- Loading state during authentication operations
- Login, signup, and logout functions

### Protected Routes

Protected routes are implemented using a wrapper component that:

- Checks if the user is authenticated
- Shows a loading state while checking authentication
- Redirects to the sign-in page if not authenticated
- Preserves the original destination URL for post-authentication redirection

### Mock Authentication

For demonstration purposes, the system uses mock authentication:

- Simulates API calls with a 1-second delay
- Stores authentication token in localStorage
- Provides mock user data upon successful authentication

### Styling

- Matches the provided design mockups
- Implements consistent styling across authentication pages
- Provides visual feedback during loading states
- Uses styled-components for CSS-in-JS styling

## Integration with Backend

When ready to integrate with a real backend:

1. Update the authentication methods in `AuthContext.tsx` to call your actual API endpoints
2. Implement proper token handling and refresh mechanisms
3. Connect user profile data to your backend services
4. Implement proper error handling for authentication failures

## File Structure

```
src/
├── components/
│   └── ProtectedRoute.tsx  # Route guard for authenticated access
├── context/
│   └── AuthContext.tsx     # Authentication state management
└── pages/
    ├── SignIn.tsx          # Sign-in page
    └── SignUp.tsx          # Sign-up page
```
