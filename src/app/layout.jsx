'use client';
import { AuthContextProvider } from './context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <QueryClientProvider client={queryClient}>
          <AuthContextProvider>
            {children}
          </AuthContextProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}