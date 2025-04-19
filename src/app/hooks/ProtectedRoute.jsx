'use client'; // Necesario porque usamos hooks y navegación del cliente

import { useRouter } from 'next/navigation';
import { UserAuth } from "../context/AuthContent";

export const ProtectedRoute = ({ children, accessBy }) => {
  const { user } = UserAuth();
  const router = useRouter();

  if (accessBy === "non-authenticated") {
    if (!user) {
      return children;
    } else {
      router.replace('/');
      return null;
    }
  } else if (accessBy === "authenticated") {
    if (user) {
      return children;
    }
  }

  router.replace('/login');
  return null;
};