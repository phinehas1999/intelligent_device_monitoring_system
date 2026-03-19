import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { AnimatedScreen, StaggerItem } from "@/components/idms/motion";
import { SectionHeader, StatusChip, SurfaceCard } from "@/components/idms/ui";
import { Colors, Fonts } from "@/constants/theme";
import { alerts, dashboardStats, devices } from "@/data/mock";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function DashboardScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const insets = useSafeAreaInsets();
  const chartBars = [64, 52, 88, 46, 71, 95, 73];
  const topRisk = [...devices].sort((a, b) => a.health - b.health).slice(0, 3);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: insets.top + 14,
          paddingBottom: 122 + Math.max(insets.bottom, 0),
        },
      ]}
    >
      <AnimatedScreen>
        <SectionHeader
          title="Admin Dashboard"
          subtitle="Real-time health overview for your tenant"
        />

        <View style={styles.statsGrid}>
          {dashboardStats.map((stat, index) => (
            <StaggerItem
              key={stat.id}
              index={index}
              style={styles.statsItemWrap}
            >
              <SurfaceCard>
                <View style={styles.statHeaderRow}>
                  <Ionicons
                    name={index % 2 === 0 ? "analytics" : "pulse"}
                    color={theme.tint}
                    size={18}
                  />
                  <Text style={[styles.trend, { color: theme.tint }]}>
                    {stat.trend}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.statValue,
                    { color: theme.text, fontFamily: Fonts?.sans },
                  ]}
                >
                  {stat.value}
                </Text>
                <Text
                  style={[
                    styles.statLabel,
                    { color: colorScheme === "dark" ? "#d3d7dd" : "#6e7681" },
                  ]}
                >
                  {stat.label}
                </Text>
              </SurfaceCard>
            </StaggerItem>
          ))}
        </View>

        <StaggerItem index={4} style={styles.sectionSpacing}>
          <SurfaceCard>
            <SectionHeader
              title="System Health"
              subtitle="Last 7 intervals"
              rightLabel="Live"
            />
            <View style={styles.chartRow}>
              {chartBars.map((value, idx) => (
                <View key={`bar-${idx}`} style={styles.barWrap}>
                  <View
                    style={[
                      styles.bar,
                      {
                        height: value,
                        backgroundColor: idx > 4 ? "#b91c1c" : theme.tint,
                      },
                    ]}
                  />
                </View>
              ))}
            </View>
          </SurfaceCard>
        </StaggerItem>

        <StaggerItem index={5} style={styles.sectionSpacing}>
          <SurfaceCard>
            <SectionHeader title="Top Risk Devices" />
            {topRisk.map((device, idx) => (
              <View
                key={device.id}
                style={[
                  styles.riskRow,
                  idx === topRisk.length - 1 ? { borderBottomWidth: 0 } : null,
                ]}
              >
                <View>
                  <Text style={[styles.deviceName, { color: theme.text }]}>
                    {device.name}
                  </Text>
                  <Text
                    style={[
                      styles.deviceMeta,
                      { color: colorScheme === "dark" ? "#d3d7dd" : "#6e7681" },
                    ]}
                  >
                    {device.location}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.healthText,
                    { color: device.health < 70 ? "#b91c1c" : "#b45309" },
                  ]}
                >
                  {device.health}%
                </Text>
              </View>
            ))}
          </SurfaceCard>
        </StaggerItem>

        <StaggerItem index={6} style={styles.sectionSpacing}>
          <SurfaceCard>
            <SectionHeader
              title="Recent Alerts"
              rightLabel={`${alerts.length}`}
            />
            {alerts.slice(0, 3).map((alert) => (
              <View key={alert.id} style={styles.alertRow}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.alertTitle, { color: theme.text }]}>
                    {alert.message}
                  </Text>
                  <Text
                    style={[
                      styles.alertMeta,
                      { color: colorScheme === "dark" ? "#d3d7dd" : "#6e7681" },
                    ]}
                  >
                    {alert.deviceName} • {alert.time}
                  </Text>
                </View>
                <StatusChip
                  label={alert.severity}
                  tone={
                    alert.severity === "critical"
                      ? "danger"
                      : alert.severity === "high"
                        ? "warn"
                        : "muted"
                  }
                />
              </View>
            ))}
          </SurfaceCard>
        </StaggerItem>
      </AnimatedScreen>
    </ScrollView>
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
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -7,
    rowGap: 14,
  },
  statsItemWrap: {
    width: "50%",
    paddingHorizontal: 7,
  },
  statHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  trend: {
    fontSize: 12,
    fontWeight: "800",
  },
  statValue: {
    fontSize: 26,
    fontWeight: "800",
    marginTop: 14,
  },
  statLabel: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: "600",
  },
  chartRow: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
    minHeight: 102,
  },
  barWrap: {
    flex: 1,
    backgroundColor: "#eef3f1",
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  bar: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  riskRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#edf2ef",
  },
  deviceName: {
    fontSize: 15,
    fontWeight: "700",
  },
  deviceMeta: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "500",
  },
  healthText: {
    fontSize: 17,
    fontWeight: "800",
  },
  alertRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: "700",
  },
  alertMeta: {
    marginTop: 3,
    fontSize: 12,
    fontWeight: "500",
  },
  sectionSpacing: {
    marginTop: 12,
  },
});
