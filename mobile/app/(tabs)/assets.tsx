import React from "react";
import { Pressable, FlatList, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { AnimatedScreen, StaggerItem } from "@/components/idms/motion";
import { SectionHeader, StatusChip, SurfaceCard } from "@/components/idms/ui";
import { Colors, Fonts } from "@/constants/theme";
import { devices } from "@/data/mock";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AssetsScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <AnimatedScreen style={{ flex: 1 }}>
        <View style={[styles.headerWrap, { paddingTop: insets.top + 14 }]}>
          <SectionHeader
            title="Assets"
            subtitle="All monitored tenant devices"
            rightLabel={`${devices.length} units`}
          />
        </View>
        <FlatList
          data={devices}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[
            styles.list,
            { paddingBottom: 122 + Math.max(insets.bottom, 0) },
          ]}
          renderItem={({ item, index }) => (
            <StaggerItem index={index}>
              <Pressable
                onPress={() => router.push(`/device/${item.id}` as any)}
                style={({ pressed }) => [
                  styles.cardWrap,
                  { opacity: pressed ? 0.94 : 1 },
                ]}
              >
                <SurfaceCard>
                  <View style={styles.cardHeader}>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={[
                          styles.deviceName,
                          { color: theme.text, fontFamily: Fonts?.sans },
                        ]}
                      >
                        {item.name}
                      </Text>
                      <Text
                        style={[
                          styles.deviceType,
                          {
                            color:
                              colorScheme === "dark" ? "#d3d7dd" : "#6e7681",
                          },
                        ]}
                      >
                        {item.type}
                      </Text>
                    </View>
                    <StatusChip
                      label={item.status}
                      tone={
                        item.status === "online"
                          ? "ok"
                          : item.status === "warning"
                            ? "warn"
                            : "danger"
                      }
                    />
                  </View>

                  <View style={styles.metaGrid}>
                    <View style={styles.metaItem}>
                      <Ionicons name="heart" size={16} color={theme.tint} />
                      <Text style={[styles.metaText, { color: theme.text }]}>
                        Health {item.health}%
                      </Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Ionicons name="location" size={16} color={theme.tint} />
                      <Text style={[styles.metaText, { color: theme.text }]}>
                        {item.location}
                      </Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Ionicons name="time" size={16} color={theme.tint} />
                      <Text style={[styles.metaText, { color: theme.text }]}>
                        Last seen {item.lastSeen}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.footerRow}>
                    <Text
                      style={[
                        styles.footerText,
                        {
                          color: colorScheme === "dark" ? "#d3d7dd" : "#6e7681",
                        },
                      ]}
                    >
                      Tap to open digital twin
                    </Text>
                    <Ionicons
                      name="chevron-forward"
                      size={18}
                      color={theme.tint}
                    />
                  </View>
                </SurfaceCard>
              </Pressable>
            </StaggerItem>
          )}
        />
      </AnimatedScreen>
    </View>
  );
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
  cardWrap: {
    borderRadius: 20,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 10,
  },
  deviceName: {
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: -0.3,
  },
  deviceType: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: "600",
  },
  metaGrid: {
    marginTop: 14,
    gap: 8,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  metaText: {
    fontSize: 13,
    fontWeight: "600",
  },
  footerRow: {
    marginTop: 16,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: "#edf2ef",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    fontWeight: "600",
  },
});
