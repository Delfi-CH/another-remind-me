import { ReminderProvider } from "@/context/reminderContext";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import { useRouter } from "expo-router";

export default function RootLayout() {
  const router = useRouter();
  return (
    <ReminderProvider>
      <NativeTabs>
        <NativeTabs.Trigger name="index">
          <NativeTabs.Trigger.Label>My Reminders</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon md="alarm" />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="new">
          <NativeTabs.Trigger.Label>New Reminder</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon md="add" />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="settings">
          <NativeTabs.Trigger.Label>Settings</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon md="settings" />
        </NativeTabs.Trigger>
      </NativeTabs>
    </ReminderProvider>
  );
}
