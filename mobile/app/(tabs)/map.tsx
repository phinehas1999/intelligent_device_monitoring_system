import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import MapView, { Marker, UrlTile } from "react-native-maps";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { AnimatedScreen, StaggerItem } from "@/components/idms/motion";
import { SectionHeader, StatusChip, SurfaceCard } from "@/components/idms/ui";
import { devices } from "@/data/mock";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function MapScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const onlineCount = devices.filter((d) => d.status === "online").length;
  const offlineCount = devices.filter((d) => d.status === "offline").length;
  const mapTilerKey = process.env.EXPO_PUBLIC_MAPTILER_KEY;
  const usesMapTiler = Boolean(mapTilerKey);
  const tileTemplate = usesMapTiler
    ? `https://api.maptiler.com/maps/${colorScheme === "dark" ? "streets-v2-dark" : "streets-v2"}/{z}/{x}/{y}.png?key=${mapTilerKey}`
    : `https://{s}.basemaps.cartocdn.com/${colorScheme === "dark" ? "dark_all" : "light_all"}/{z}/{x}/{y}.png`;
  const attributionLabel = usesMapTiler
    ? "MapTiler | OpenStreetMap contributors"
    : "CARTO | OpenStreetMap contributors";

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <AnimatedScreen
        style={[
          styles.overlayTop,
          { top: insets.top + 10, left: 16, right: 16 },
        ]}
      >
        <StaggerItem index={0}>
          <SurfaceCard>
            <SectionHeader
              title="Locate Devices"
              subtitle={
                usesMapTiler
                  ? "Hosted MapTiler live view"
                  : "Hosted CARTO live view"
              }
            />
            <View style={styles.summaryRow}>
              <StatusChip label={`${onlineCount} online`} tone="ok" />
              <StatusChip label={`${offlineCount} offline`} tone="danger" />
              <StatusChip label={`${devices.length} total`} tone="muted" />
            </View>
            <View
              style={[
                styles.searchMock,
                {
                  backgroundColor:
                    colorScheme === "dark" ? "#58606c" : "#f1f5f3",
                },
              ]}
            >
              <Ionicons name="search" size={16} color={theme.icon} />
              <Text style={[styles.searchText, { color: theme.icon }]}>
                Search devices or locations
              </Text>
            </View>
          </SurfaceCard>
        </StaggerItem>
      </AnimatedScreen>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 9.033,
          longitude: 38.74,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        mapType="none"
      >
        <UrlTile
          urlTemplate={tileTemplate}
          subdomains={usesMapTiler ? [] : ["a", "b", "c", "d"]}
          maximumZ={19}
          flipY={false}
        />
        {devices.map((device) => (
          <Marker
            key={device.id}
            coordinate={{ latitude: device.lat, longitude: device.lng }}
            title={device.name}
            description={`${device.location} • ${device.status}`}
            pinColor={
              device.status === "online"
                ? "#15803d"
                : device.status === "warning"
                  ? "#b45309"
                  : "#b91c1c"
            }
            onCalloutPress={() => router.push(`/device/${device.id}` as any)}
          />
        ))}
      </MapView>

      <View
        style={[
          styles.attributionWrap,
          {
            backgroundColor:
              colorScheme === "dark"
                ? "rgba(46, 52, 63, 0.9)"
                : "rgba(255, 255, 255, 0.82)",
          },
        ]}
      >
        <Text
          style={[
            styles.attributionText,
            { color: colorScheme === "dark" ? "#e5e7eb" : "#374151" },
          ]}
        >
          {attributionLabel}
        </Text>
      </View>

      <View
        style={[
          styles.bottomPanel,
          { left: 16, right: 16, bottom: 92 + Math.max(insets.bottom, 8) },
        ]}
      >
        <StaggerItem index={1}>
          <SurfaceCard>
            <View style={styles.bottomHeader}>
              <Text style={[styles.bottomTitle, { color: theme.text }]}>
                Nearby Assets
              </Text>
              <Pressable onPress={() => router.push("/assets")}>
                <Text style={[styles.linkText, { color: theme.tint }]}>
                  Open all
                </Text>
              </Pressable>
            </View>
            {devices.slice(0, 2).map((device) => (
              <View key={device.id} style={styles.bottomRow}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.bottomName, { color: theme.text }]}>
                    {device.name}
                  </Text>
                  <Text
                    style={[
                      styles.bottomMeta,
                      { color: colorScheme === "dark" ? "#d3d7dd" : "#6e7681" },
                    ]}
                  >
                    {device.location}
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
            ))}
          </SurfaceCard>
        </StaggerItem>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: "100%", height: "100%" },
  overlayTop: {
    position: "absolute",
    zIndex: 3,
  },
  summaryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 10,
  },
  searchMock: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 11,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  searchText: {
    fontSize: 13,
    fontWeight: "600",
  },
  bottomPanel: {
    position: "absolute",
    zIndex: 3,
  },
  attributionWrap: {
    position: "absolute",
    right: 12,
    bottom: 70,
    zIndex: 2,
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  attributionText: {
    fontSize: 10,
    fontWeight: "600",
  },
  bottomHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  bottomTitle: {
    fontSize: 15,
    fontWeight: "800",
  },
  linkText: {
    fontSize: 12,
    fontWeight: "700",
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#edf2ef",
  },
  bottomName: {
    fontSize: 14,
    fontWeight: "700",
  },
  bottomMeta: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 3,
  },
});
