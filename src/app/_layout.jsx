import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { authStorage } from "../storage/authStorage";

import Loader from "../components/Loader";
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
    <Stack >
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  )
}
