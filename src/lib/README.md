# Redux Toolkit Setup

This directory contains the Redux Toolkit setup with RTK Query for API calls and state management.

## Directory Structure

```
src/lib/
├── store.ts                 # Redux store configuration
├── hooks.ts                 # Typed Redux hooks
├── api/
│   └── apiSlice.ts         # Base RTK Query API slice
├── features/
│   └── auth/
│       ├── authSlice.ts    # Auth state management
│       └── authApiSlice.ts # Auth API endpoints
└── providers/
    └── ReduxProvider.tsx   # Redux Provider component
```

## Base URL

The API base URL is configured as: `http://localhost:5000/api/`

## Usage Examples

### 1. Using Auth API Hooks in Components

```tsx
'use client';

import { useLoginMutation, useRegisterMutation } from '@/lib/features/auth/authApiSlice';
import { useState } from 'react';

export default function LoginForm() {
  const [login, { isLoading, error }] = useLoginMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await login({ email, password }).unwrap();
      console.log('Login successful:', result);
      // User and token are automatically stored in Redux state and localStorage
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Login'}
      </button>
      {error && <p>Error occurred</p>}
    </form>
  );
}
```

### 2. Using Auth State Selectors

```tsx
'use client';

import { useAppSelector } from '@/lib/hooks';
import { selectCurrentUser, selectIsAuthenticated } from '@/lib/features/auth/authSlice';

export default function UserProfile() {
  const user = useAppSelector(selectCurrentUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <p>Please log in</p>;
  }

  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <p>Email: {user?.email}</p>
    </div>
  );
}
```

### 3. Logout Example

```tsx
'use client';

import { useLogoutMutation } from '@/lib/features/auth/authApiSlice';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const [logout, { isLoading }] = useLogoutMutation();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      router.push('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <button onClick={handleLogout} disabled={isLoading}>
      {isLoading ? 'Logging out...' : 'Logout'}
    </button>
  );
}
```

### 4. Protected Route Example

```tsx
'use client';

import { useAppSelector } from '@/lib/hooks';
import { selectIsAuthenticated } from '@/lib/features/auth/authSlice';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedPage() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <p>Redirecting...</p>;
  }

  return <div>Protected content</div>;
}
```

### 5. Register Example

```tsx
'use client';

import { useRegisterMutation } from '@/lib/features/auth/authApiSlice';
import { useState } from 'react';

export default function RegisterForm() {
  const [register, { isLoading, error }] = useRegisterMutation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await register(formData).unwrap();
      console.log('Registration successful:', result);
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Name"
      />
      <input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="Email"
      />
      <input
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        placeholder="Password"
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Creating account...' : 'Register'}
      </button>
      {error && <p>Registration failed</p>}
    </form>
  );
}
```

## Available Auth API Hooks

- `useLoginMutation()` - Login user
- `useRegisterMutation()` - Register new user
- `useLogoutMutation()` - Logout user
- `useGetMeQuery()` - Get current user data
- `useRefreshTokenMutation()` - Refresh authentication token
- `useForgotPasswordMutation()` - Request password reset
- `useResetPasswordMutation()` - Reset password with token
- `useChangePasswordMutation()` - Change user password

## Available Auth Selectors

- `selectCurrentUser(state)` - Get current user object
- `selectCurrentToken(state)` - Get current auth token
- `selectIsAuthenticated(state)` - Get authentication status

## Available Auth Actions

- `setCredentials({ user, token })` - Manually set user and token
- `updateUser(user)` - Update user data
- `logout()` - Clear auth state

## Features

- Automatic token management (stored in localStorage)
- Automatic token injection in API requests
- Persistent authentication across page refreshes
- Type-safe API calls and state management
- Optimistic updates and cache invalidation
- Error handling built-in

## Adding New API Endpoints

To add new endpoints, create a new API slice file similar to `authApiSlice.ts`:

```tsx
import { apiSlice } from '../../api/apiSlice';

export const yourApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getItems: builder.query({
      query: () => 'items',
      providesTags: ['Items'],
    }),
    createItem: builder.mutation({
      query: (data) => ({
        url: 'items',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Items'],
    }),
  }),
});

export const { useGetItemsQuery, useCreateItemMutation } = yourApiSlice;
```
