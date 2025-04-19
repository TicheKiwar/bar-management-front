'use client'; // Necesario porque usamos QueryClientProvider

import React from 'react'; // Añade esta línea
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './globals.css'; // Tus estilos globales (reemplaza a index.css)

export const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <React.StrictMode>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </React.StrictMode>
      </body>
    </html>
  );
}