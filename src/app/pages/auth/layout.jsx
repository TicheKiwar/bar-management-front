'use client';
import { ProtectedRoute } from '../../hooks/ProtectedRoute';

export default function AuthLayout({ children }) {
    return (
        <ProtectedRoute accessBy="non-authenticated">
            {children}
        </ProtectedRoute>
    );
}