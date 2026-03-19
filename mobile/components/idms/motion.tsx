import React, { useEffect, useRef } from "react";
import { Animated, Easing, type ViewStyle } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

type AnimatedScreenProps = {
  children: React.ReactNode;
  style?: ViewStyle;
};

export function AnimatedScreen({ children, style }: AnimatedScreenProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(10)).current;

  const run = React.useCallback(() => {
    opacity.setValue(0);
    translateY.setValue(10);
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 260,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 320,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, translateY]);

  useEffect(() => {
    run();
  }, [run]);

  useFocusEffect(
    React.useCallback(() => {
      run();
      return undefined;
    }, [run]),
  );

  return (
    <Animated.View style={[style, { opacity, transform: [{ translateY }] }]}>
      {children}
    </Animated.View>
  );
}

type StaggerItemProps = {
  children: React.ReactNode;
  index: number;
  baseDelay?: number;
  style?: ViewStyle;
};

export function StaggerItem({
  children,
  index,
  baseDelay = 50,
  style,
}: StaggerItemProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(12)).current;

  useEffect(() => {
    const delay = Math.max(0, Math.min(index, 10)) * baseDelay;
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 280,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 340,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [baseDelay, index, opacity, translateY]);

  return (
    <Animated.View style={[style, { opacity, transform: [{ translateY }] }]}>
      {children}
    </Animated.View>
  );
}
