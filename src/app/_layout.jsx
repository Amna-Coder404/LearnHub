import { Stack, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";

import { authStorage } from "../storage/authStorage";
import SafeScreen from "../components/SafeScreen";
import SplashScreen from "../components/SplashScreen";

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get("screen");

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
    backgroundColor: "#0B0B14",
  },
  splashOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: SCREEN_W,
    height: SCREEN_H,
    backgroundColor: "#0B0B14",
    zIndex: 9999,
    elevation: 9999,
  },
});