import React, { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Colors, Fonts } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

type SurfaceCardProps = PropsWithChildren<{
  padded?: boolean;
}>;

export function SurfaceCard({ children, padded = true }: SurfaceCardProps) {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colorScheme === "dark" ? "#454a53" : "#ffffff",
          borderColor: colorScheme === "dark" ? "#555b66" : "#e6ece9",
          padding: padded ? 16 : 0,
          shadowColor: theme.text,
        },
      ]}
    >
      {children}
    </View>
  );
}

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  rightLabel?: string;
};

export function SectionHeader({
  title,
  subtitle,
  rightLabel,
}: SectionHeaderProps) {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  return (
    <View style={styles.sectionRow}>
      <View style={{ flex: 1 }}>
        <Text
          style={[
            styles.sectionTitle,
            { color: theme.text, fontFamily: Fonts?.sans },
          ]}
        >
          {title}
        </Text>
        {subtitle ? (
          <Text
            style={[
              styles.sectionSubtitle,
              { color: colorScheme === "dark" ? "#c9ced4" : "#6c747e" },
            ]}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>
      {rightLabel ? (
        <View style={[styles.rightBadge, { backgroundColor: theme.tint }]}>
          <Text style={styles.rightBadgeLabel}>{rightLabel}</Text>
        </View>
      ) : null}
    </View>
  );
}

type StatusChipProps = {
  label: string;
  tone: "ok" | "warn" | "danger" | "muted";
};

export function StatusChip({ label, tone }: StatusChipProps) {
  const colorScheme = useColorScheme() ?? "light";

  const palette = {
    ok: { bg: "#e7f8ef", text: "#15803d" },
    warn: { bg: "#fff6e8", text: "#b45309" },
    danger: { bg: "#ffe9ea", text: "#b91c1c" },
    muted: {
      bg: colorScheme === "dark" ? "#59606b" : "#edf1f0",
      text: colorScheme === "dark" ? "#ebedf2" : "#4d5560",
    },
  }[tone];

  return (
    <View style={[styles.chip, { backgroundColor: palette.bg }]}>
      <Text style={[styles.chipLabel, { color: palette.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 22,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  sectionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
  },
  sectionSubtitle: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 18,
  },
  rightLabel: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  rightBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 44,
  },
  rightBadgeLabel: {
    color: "#ffffff",
    fontWeight: "800",
    fontSize: 12,
    textTransform: "none",
  },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    alignSelf: "flex-start",
  },
  chipLabel: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "capitalize",
  },
});
