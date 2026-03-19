import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Ionicons } from "@expo/vector-icons";
import { AnimatedScreen, StaggerItem } from "@/components/idms/motion";
import { SectionHeader, StatusChip, SurfaceCard } from "@/components/idms/ui";
import { Colors, Fonts } from "@/constants/theme";
import { useThemePreference } from "@/providers/theme-preference";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const { preference, setPreference, togglePreference } = useThemePreference();
  const insets = useSafeAreaInsets();

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
          title="Settings"
          subtitle="Tenant, users, and integration controls"
        />

        <StaggerItem index={0}>
          <SurfaceCard>
            <View style={styles.rowTop}>
              <Text
                style={[
                  styles.groupTitle,
                  { color: theme.text, fontFamily: Fonts?.sans },
                ]}
              >
                Workspace
              </Text>
              <StatusChip label="Pro plan" tone="ok" />
            </View>

            <View style={styles.settingRow}>
              <View style={styles.iconContainer}>
                <Ionicons name="moon" size={18} color={theme.text} />
                <Text style={[styles.text, { color: theme.text }]}>
                  Dark Mode
                </Text>
              </View>
              <Switch
                value={colorScheme === "dark"}
                onValueChange={togglePreference}
                trackColor={{ false: "#cbd5e1", true: theme.tint }}
              />
            </View>

            <View style={styles.settingRow}>
              <View style={styles.iconContainer}>
                <Ionicons name="desktop" size={18} color={theme.text} />
                <Text style={[styles.text, { color: theme.text }]}>
                  Follow System
                </Text>
              </View>
              <Switch
                value={preference === "system"}
                onValueChange={(enabled) =>
                  setPreference(enabled ? "system" : colorScheme)
                }
                trackColor={{ false: "#cbd5e1", true: theme.tint }}
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.settingRow}>
              <View style={styles.iconContainer}>
                <Ionicons name="notifications" size={18} color={theme.text} />
                <Text style={[styles.text, { color: theme.text }]}>
                  Push Notifications
                </Text>
              </View>
              <Switch
                value={true}
                onValueChange={() => {}}
                trackColor={{ false: "#cbd5e1", true: theme.tint }}
              />
            </View>
          </SurfaceCard>
        </StaggerItem>

        <StaggerItem index={1} style={styles.sectionSpacing}>
          <SurfaceCard>
            <Text
              style={[
                styles.groupTitle,
                { color: theme.text, fontFamily: Fonts?.sans },
              ]}
            >
              Tenant & Access
            </Text>

            {[
              { icon: "business", label: "Tenant Profile" },
              { icon: "people", label: "User Management" },
              { icon: "key", label: "API Keys" },
              { icon: "shield-checkmark", label: "Privacy Policy" },
            ].map((item, index) => (
              <Pressable key={item.label} style={styles.pressableRow}>
                <View style={styles.iconContainer}>
                  <Ionicons
                    name={item.icon as any}
                    size={18}
                    color={theme.text}
                  />
                  <Text style={[styles.text, { color: theme.text }]}>
                    {item.label}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={theme.icon} />
                {index < 3 ? <View style={styles.rowDivider} /> : null}
              </Pressable>
            ))}
          </SurfaceCard>
        </StaggerItem>

        <StaggerItem index={2} style={styles.sectionSpacing}>
          <SurfaceCard>
            <Text
              style={[
                styles.groupTitle,
                { color: theme.text, fontFamily: Fonts?.sans },
              ]}
            >
              Support
            </Text>
            <Text
              style={[
                styles.supportText,
                { color: colorScheme === "dark" ? "#d3d7dd" : "#6e7681" },
              ]}
            >
              Need help with onboarding sensors or setting alert rules? Reach
              out to platform support directly from the admin portal.
            </Text>
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
  rowTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  groupTitle: {
    fontSize: 16,
    fontWeight: "800",
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  text: { fontSize: 14, fontWeight: "700" },
  divider: {
    height: 1,
    backgroundColor: "#edf2ef",
    marginVertical: 12,
  },
  pressableRow: {
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
  },
  rowDivider: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 1,
    backgroundColor: "#edf2ef",
  },
  supportText: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 20,
  },
  sectionSpacing: {
    marginTop: 12,
  },
});
