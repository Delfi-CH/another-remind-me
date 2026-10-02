import { EverythingProvider } from "@/context/everythingContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <EverythingProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </EverythingProvider>
  );
}
