import { Stack, useRootNavigationState, useRouter } from "expo-router";
import * as NativeSplash from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import SafeScreen from "../components/SafeScreen";
import SplashScreen from "../components/SplashScreen";
import COLORS from "../constants/color";
import { authStorage } from "../storage/authStorage";

NativeSplash.preventAutoHideAsync().catch(() => { });

export const unstable_settings = {
  initialRouteName: "(auth)",
};

export default function RootLayout() {
  const router = useRouter();
  const navState = useRootNavigationState();

  const [splashFinished, setSplashFinished] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  const finishSplash = useCallback(() => {
    setSplashFinished(true);
  }, []);

  const hideNativeSplash = useCallback(() => {
    NativeSplash.hideAsync().catch(() => { });
  }, []);

  useEffect(() => {
    let active = true;

    async function checkToken() {
      try {
        const token = await authStorage.getToken();
        if (!active) return;
        setHasToken(Boolean(token));
      } catch (error) {
        console.log("ERROR TOKEN:", error);
        if (active) setHasToken(false);
      } finally {
        if (active) setAuthChecked(true);
      }
    }

    checkToken();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!splashFinished || !authChecked || !navState?.key) return;

    router.replace(hasToken ? "/(tabs)" : "/(auth)/login");
  }, [splashFinished, authChecked, hasToken, navState?.key, router]);

  // Splash ke time sirf splash dikhao, Stack mount nahi hoga
  if (!splashFinished) {
    return (
      <View style={styles.splashRoot} onLayout={hideNativeSplash}>
        <StatusBar hidden style="light" />
        <SplashScreen onFinish={finishSplash} />
      </View>
    );
  }

  return (
    <PaperProvider>
      <SafeAreaProvider>
        <StatusBar style="light" />

        <View style={styles.container}>
          <SafeScreen>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(auth)" />
              <Stack.Screen name="(tabs)" />
            </Stack>
          </SafeScreen>
        </View>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  splashRoot: {
    flex: 1,
    backgroundColor: "#0B0B14",
  },
});