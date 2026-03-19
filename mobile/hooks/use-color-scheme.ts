import { useThemePreference } from "@/providers/theme-preference";

export function useColorScheme() {
  return useThemePreference().resolvedScheme;
}
