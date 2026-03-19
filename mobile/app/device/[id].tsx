import React from "react";
import { ScrollView, StyleSheet, Text, View, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { AnimatedScreen, StaggerItem } from "@/components/idms/motion";
import { SectionHeader, StatusChip, SurfaceCard } from "@/components/idms/ui";
import { Colors, Fonts } from "@/constants/theme";
import { alerts, devices } from "@/data/mock";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function DeviceDetailScreen() {
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const device = devices.find((item) => item.id === id) ?? devices[0];
  const deviceAlerts = alerts.filter((item) => item.deviceId === device.id);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: insets.top + 14,
          paddingBottom: 56 + Math.max(insets.bottom, 0),
        },
      ]}
    >
      <AnimatedScreen>
        <View style={styles.pageHeader}>
          <Pressable onPress={() => router.back()} style={styles.headerBack}>
            <Ionicons name="chevron-back" size={28} color={theme.tint} />
          </Pressable>
          <View style={{ width: 40 }} />
        </View>
        <StaggerItem index={0}>
          <SurfaceCard>
            <View style={styles.heroRow}>
              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    styles.heroTitle,
                    { color: theme.text, fontFamily: Fonts?.sans },
                  ]}
                >
                  {device.name}
                </Text>
                <Text
                  style={[
                    styles.heroSub,
                    { color: colorScheme === "dark" ? "#d3d7dd" : "#6e7681" },
                  ]}
                >
                  {device.type} • {device.location}
                </Text>
              </View>
              <StatusChip
                label={device.status}
                tone={
                  device.status === "online"
                    ? "ok"
                    : device.status === "warning"
                      ? "warn"
                      : "danger"
                }
              />
            </View>

            <View style={styles.telemetryGrid}>
              <View style={styles.telemetryItem}>
                <Text style={[styles.metricLabel, { color: theme.icon }]}>
                  Temperature
                </Text>
                <Text style={[styles.metricValue, { color: theme.text }]}>
                  {device.temperature}C
                </Text>
              </View>
              <View style={styles.telemetryItem}>
                <Text style={[styles.metricLabel, { color: theme.icon }]}>
                  Vibration
                </Text>
                <Text style={[styles.metricValue, { color: theme.text }]}>
                  {device.vibration} g
                </Text>
              </View>
              <View style={styles.telemetryItem}>
                <Text style={[styles.metricLabel, { color: theme.icon }]}>
                  Voltage
                </Text>
                <Text style={[styles.metricValue, { color: theme.text }]}>
                  {device.voltage}V
                </Text>
              </View>
            </View>
          </SurfaceCard>
        </StaggerItem>

        <StaggerItem index={1} style={styles.sectionSpacing}>
          <SurfaceCard>
            <SectionHeader title="Device Metadata" rightLabel="Digital Twin" />
            <InfoRow
              label="Device ID"
              value={device.id}
              textColor={theme.text}
              subTextColor={colorScheme === "dark" ? "#d3d7dd" : "#6e7681"}
            />
            <InfoRow
              label="Health Score"
              value={`${device.health}%`}
              textColor={theme.text}
              subTextColor={colorScheme === "dark" ? "#d3d7dd" : "#6e7681"}
            />
            <InfoRow
              label="Firmware"
              value={device.firmware}
              textColor={theme.text}
              subTextColor={colorScheme === "dark" ? "#d3d7dd" : "#6e7681"}
            />
            <InfoRow
              label="IP Address"
              value={device.ipAddress}
              textColor={theme.text}
              subTextColor={colorScheme === "dark" ? "#d3d7dd" : "#6e7681"}
            />
            <InfoRow
              label="Last Seen"
              value={device.lastSeen}
              textColor={theme.text}
              subTextColor={colorScheme === "dark" ? "#d3d7dd" : "#6e7681"}
            />
          </SurfaceCard>
        </StaggerItem>

        <StaggerItem index={2} style={styles.sectionSpacing}>
          <SurfaceCard>
            <SectionHeader
              title="Alert History"
              rightLabel={`${deviceAlerts.length}`}
            />
            {deviceAlerts.length ? (
              deviceAlerts.map((item) => (
                <View key={item.id} style={styles.alertRow}>
                  <Ionicons
                    name={
                      item.severity === "critical" ? "alert-circle" : "warning"
                    }
                    size={16}
                    color={item.severity === "critical" ? "#b91c1c" : "#b45309"}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.alertTitle, { color: theme.text }]}>
                      {item.message}
                    </Text>
                    <Text
                      style={[
                        styles.alertMeta,
                        {
                          color: colorScheme === "dark" ? "#d3d7dd" : "#6e7681",
                        },
                      ]}
                    >
                      {item.time} • {item.status}
                    </Text>
                  </View>
                </View>
              ))
            ) : (
              <Text
                style={[
                  styles.emptyText,
                  { color: colorScheme === "dark" ? "#d3d7dd" : "#6e7681" },
                ]}
              >
                No alerts for this device yet.
              </Text>
            )}
          </SurfaceCard>
        </StaggerItem>
      </AnimatedScreen>
    </ScrollView>
  );
}

function InfoRow({
  label,
  value,
  textColor,
  subTextColor,
}: {
  label: string;
  value: string;
  textColor: string;
  subTextColor: string;
}) {
  return (
    <View style={styles.infoRow}>
      <Text style={[styles.label, { color: subTextColor }]}>{label}</Text>
      <Text style={[styles.value, { color: textColor }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 18,
    gap: 16,
  },
  heroRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 10,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: -0.4,
  },
  heroSub: {
    marginTop: 5,
    fontSize: 13,
    fontWeight: "600",
  },
  telemetryGrid: {
    marginTop: 16,
    flexDirection: "row",
    gap: 12,
  },
  telemetryItem: {
    flex: 1,
    backgroundColor: "#eef3f1",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  metricLabel: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  metricValue: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: "800",
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
  },
  value: {
    fontSize: 14,
    fontWeight: "800",
    maxWidth: "60%",
    textAlign: "right",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#edf2ef",
    paddingTop: 12,
    marginTop: 12,
  },
  alertRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: "#edf2ef",
    paddingTop: 12,
    marginTop: 12,
  },
  alertTitle: {
    fontSize: 13,
    fontWeight: "700",
  },
  alertMeta: {
    marginTop: 3,
    fontSize: 12,
    fontWeight: "600",
  },
  emptyText: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: "600",
  },
  actionsRow: {
    alignItems: "flex-start",
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginTop: 12,
  },
  backLink: {
    fontSize: 14,
    fontWeight: "700",
  },
  sectionSpacing: {
    marginTop: 12,
  },
  pageHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  headerBack: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 6,
  },
  pageHeaderTitle: {
    fontSize: 16,
    fontWeight: "800",
  },
});
