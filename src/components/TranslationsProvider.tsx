"use client";

import { createContext, useContext } from "react";

type Messages = {
  [key: string]: any;
};

const TranslationsContext = createContext<Messages | null>(null);

export function TranslationsProvider({
  children,
  messages,
}: {
  children: React.ReactNode;
  messages: Messages;
}) {
  return (
    <TranslationsContext.Provider value={messages}>
      {children}
    </TranslationsContext.Provider>
  );
}

type TOptions = {
  returnObjects?: boolean;
};

export function useTranslation() {
  const messages = useContext(TranslationsContext);
  if (!messages) {
    throw new Error("useTranslation must be used within a TranslationsProvider");
  }

  const t = (
    key: string,
    options?: TOptions | string  // ✅ Permitir string como fallback
  ): string | string[] | any => {
    const keys = key.split(".");
    let value: any = messages;
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        value = undefined;
        break;
      }
    }

    // Si `returnObjects`, devolver el valor incluso si es objeto
    if (options && typeof options === "object" && options.returnObjects) {
      return value !== undefined ? value : key;
    }

    // Si es string o array, devolverlo
    if (typeof value === "string" || Array.isArray(value)) {
      return value;
    }

    // Si el segundo argumento es un string, tratarlo como valor por defecto
    if (typeof options === "string") {
      return options;
    }

    // Fallback al key si no hay valor ni default
    return key;
  };

  return { t };
}