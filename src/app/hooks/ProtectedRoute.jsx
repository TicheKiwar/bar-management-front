'use client';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

export const ProtectedRoute = ({ children, accessBy }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) return null; // o un spinner

  if (accessBy === "non-authenticated") {
    if (!user) return children;
    router.replace('/');
    return null;
  }

  if (accessBy === "authenticated") {
    if (user) return children;
    router.replace('/login');
    return null;
  }

  return null;
};