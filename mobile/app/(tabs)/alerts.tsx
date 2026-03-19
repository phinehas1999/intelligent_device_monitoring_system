import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Ionicons } from "@expo/vector-icons";
import { AnimatedScreen, StaggerItem } from "@/components/idms/motion";
import { SectionHeader, StatusChip, SurfaceCard } from "@/components/idms/ui";
import { Colors, Fonts } from "@/constants/theme";
import { alerts } from "@/data/mock";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AlertsScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <AnimatedScreen style={{ flex: 1 }}>
        <View style={[styles.headerWrap, { paddingTop: insets.top + 14 }]}>
          <SectionHeader
            title="Alerts"
            subtitle="Incident timeline and response queue"
            rightLabel={`${alerts.filter((a) => a.status === "open").length} open`}
          />
        </View>
        <FlatList
          data={alerts}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[
            styles.list,
            { paddingBottom: 122 + Math.max(insets.bottom, 0) },
          ]}
          renderItem={({ item, index }) => (
            <StaggerItem index={index}>
              <SurfaceCard>
                <View style={styles.cardTopRow}>
                  <View
                    style={[
                      styles.severityDot,
                      { backgroundColor: getSeverityColor(item.severity) },
                    ]}
                  />
                  <Text
                    style={[
                      styles.timeText,
                      { color: colorScheme === "dark" ? "#d3d7dd" : "#6e7681" },
                    ]}
                  >
                    {item.time}
                  </Text>
                  <View style={{ flex: 1 }} />
                  <StatusChip
                    label={item.status}
                    tone={
                      item.status === "open"
                        ? "danger"
                        : item.status === "acknowledged"
                          ? "warn"
                          : "ok"
                    }
                  />
                </View>

                <Text
                  style={[
                    styles.alertMsg,
                    { color: theme.text, fontFamily: Fonts?.sans },
                  ]}
                >
                  {item.message}
                </Text>
                <Text
                  style={[
                    styles.alertMeta,
                    { color: colorScheme === "dark" ? "#d3d7dd" : "#6e7681" },
                  ]}
                >
                  {item.deviceName} • Severity {item.severity}
                </Text>

                <View style={styles.footerRow}>
                  <Ionicons
                    name={
                      item.status === "resolved"
                        ? "checkmark-circle"
                        : "alert-circle"
                    }
                    size={16}
                    color={
                      item.status === "resolved"
                        ? "#15803d"
                        : getSeverityColor(item.severity)
                    }
                  />
                  <Text style={[styles.footerText, { color: theme.text }]}>
                    Tap to open incident details
                  </Text>
                </View>
              </SurfaceCard>
            </StaggerItem>
          )}
        />
      </AnimatedScreen>
    </View>
  );
}

function getSeverityColor(level: "low" | "medium" | "high" | "critical") {
  if (level === "critical") return "#b91c1c";
  if (level === "high") return "#dc2626";
  if (level === "medium") return "#b45309";
  return "#15803d";
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerWrap: {
    paddingHorizontal: 18,
    paddingBottom: 6,
  },
  list: {
    paddingHorizontal: 18,
    paddingTop: 4,
    gap: 14,
  },
  cardTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  severityDot: {
    width: 9,
    height: 9,
    borderRadius: 999,
  },
  timeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  alertMsg: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: -0.2,
  },
  alertMeta: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: "600",
  },
  footerRow: {
    marginTop: 14,
    borderTopWidth: 1,
    borderTopColor: "#edf2ef",
    paddingTop: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  footerText: {
    fontSize: 12,
    fontWeight: "600",
  },
});
