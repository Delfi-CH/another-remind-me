import { NativeTabs } from "expo-router/unstable-native-tabs";
import { useEverything } from "@/context/everythingContext";

export default function TabsLayout() {
  const context = useEverything()
  return (
      <NativeTabs hidden={!context.showTabs}>
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
  );
}
