import React, { Suspense } from "react";

type SuspenseWrapperProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

// Componente para aislar partes dinámicas de la aplicación
// Esto permite que el resto de la página (Shell) se cargue instantáneamente
// mientras este contenido se "streamea" desde el servidor.
// Fundamental para PPR (Partial Prerendering).

export default function SuspenseWrapper({
  children,
  fallback,
}: SuspenseWrapperProps) {
  return (
    <Suspense
      fallback={
        fallback || (
          <div className="animate-pulse h-20 bg-gray-100 rounded-md w-full" />
        )
      }
    >
      {children}
    </Suspense>
  );
}
