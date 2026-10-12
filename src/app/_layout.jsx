import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { authStorage } from "../storage/authStorage";

import { SafeAreaProvider } from "react-native-safe-area-context";
import Loader from "../components/Loader";
import SafeScreen from "../components/SafeScreen";




export default function RootLayout() {

  const [loading, setLoading] = useState(true);


  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await authStorage.getToken();

        if (token) {
          router.replace("/(tabs)")
        }
        else {
          router.replace("/(auth)/login");
        }
        setLoading(false);


      } catch (err) {
        console.log("ERROR TOKEN", err);
      } finally {
        setLoading(false);
      }
    }

    checkToken();
  }, [])

  if (loading) {
    return <Loader />
  }


  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Stack screenOptions={{ headerShown: false }} >
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </SafeScreen>
    </SafeAreaProvider>
  )
}
