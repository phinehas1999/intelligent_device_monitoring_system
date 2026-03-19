import React, { createContext, useContext, useMemo, useState } from "react";
import { useColorScheme as useRNColorScheme } from "react-native";

type ThemePreference = "system" | "light" | "dark";
type Scheme = "light" | "dark";

type ThemePreferenceContextValue = {
  preference: ThemePreference;
  resolvedScheme: Scheme;
  setPreference: (value: ThemePreference) => void;
  togglePreference: () => void;
};

const ThemePreferenceContext =
  createContext<ThemePreferenceContextValue | null>(null);

export function ThemePreferenceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const systemScheme = useRNColorScheme();
  const [preference, setPreference] = useState<ThemePreference>("system");

  const resolvedScheme: Scheme =
    preference === "system"
      ? systemScheme === "dark"
        ? "dark"
        : "light"
      : preference;

  const value = useMemo<ThemePreferenceContextValue>(
    () => ({
      preference,
      resolvedScheme,
      setPreference,
      togglePreference: () => {
        setPreference((current) => {
          const activeScheme: Scheme =
            current === "system"
              ? systemScheme === "dark"
                ? "dark"
                : "light"
              : current;
          return activeScheme === "dark" ? "light" : "dark";
        });
      },
    }),
    [preference, resolvedScheme, systemScheme],
  );

  return (
    <ThemePreferenceContext.Provider value={value}>
      {children}
    </ThemePreferenceContext.Provider>
  );
}

export function useThemePreference() {
  const context = useContext(ThemePreferenceContext);
  if (!context) {
    throw new Error(
      "useThemePreference must be used within ThemePreferenceProvider",
    );
  }
  return context;
}
