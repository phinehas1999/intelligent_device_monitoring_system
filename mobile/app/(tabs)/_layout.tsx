import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { MaterialCommunityIcons as MCIcon } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const activeTheme = Colors[colorScheme ?? "light"];
  const insets = useSafeAreaInsets();
  const tabBarHeight = 45 + Math.max(insets.bottom, 4);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeTheme.tint,
        tabBarInactiveTintColor: colorScheme === "dark" ? "#a7b0bb" : "#6f7a86",
        tabBarShowLabel: false,
        headerStyle: {
          backgroundColor:
            colorScheme === "dark" ? activeTheme.background : "#ffffff",
        },
        headerShadowVisible: false,
        headerTitleStyle: {
          fontWeight: "800",
          letterSpacing: -0.3,
        },
        headerTintColor: activeTheme.text,
        tabBarStyle: {
          position: "absolute",
          height: tabBarHeight,
          paddingBottom: Math.max(insets.bottom, 4),
          paddingTop: 8,
          borderTopWidth: 0,
          backgroundColor: colorScheme === "dark" ? "#444a54" : "#ffffff",
          marginHorizontal: 18,
          marginBottom: 22,
          borderRadius: 26,
          shadowColor: "#111827",
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.14,
          shadowRadius: 24,
          elevation: 10,
        },
        tabBarItemStyle: {
          marginHorizontal: 2,
          marginTop: 2,
          borderRadius: 18,
        },
        tabBarIconStyle: {
          marginBottom: 0,
        },
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => (
            <MCIcon size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="assets"
        options={{
          title: "Assets",
          tabBarIcon: ({ color }) => (
            <MCIcon size={28} name="chip" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="alerts"
        options={{
          title: "Alerts",
          tabBarIcon: ({ color }) => (
            <MCIcon size={28} name="bell" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          tabBarIcon: ({ color }) => (
            <MCIcon size={28} name="map" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <MCIcon size={28} name="cog" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
