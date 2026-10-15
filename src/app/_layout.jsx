import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import SafeScreen from "../components/SafeScreen";
import SplashScreen from "../components/SplashScreen";
import COLORS from "../constants/color";
import { authStorage } from "../storage/authStorage";

export default function RootLayout() {
  const router = useRouter();
  const [splashFinished, setSplashFinished] = useState(false);

  const finishSplash = useCallback(() => {
    setSplashFinished(true);
  }, []);

  useEffect(() => {
    let active = true;

    async function checkToken() {
      try {
        const token = await authStorage.getToken();
        if (!active) return;
        router.replace(token ? "/(tabs)" : "/(auth)/login");
      } catch (error) {
        console.log("ERROR TOKEN:", error);
        if (active) {
          router.replace("/(auth)/login");
        }
      }
    }

    checkToken();

    return () => {
      active = false;
    };
  }, [router]);

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

        {!splashFinished && (
          <View style={styles.splashOverlay}>
            <SplashScreen onFinish={finishSplash} />
          </View>
        )}
      </SafeAreaProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  splashOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.background,
    zIndex: 9999,
    elevation: 9999,
  },
});