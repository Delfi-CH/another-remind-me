import { Text, View, StyleSheet, Pressable } from "react-native";
import AlarmModule from "../../Klock/modules/alarm-module/src/AlarmModule";
import type { Alarm, AlarmNotification } from "../../Klock/modules/alarm-module/src/AlarmModule.types"

export default function Index() {
  async function scheduleAlarmIn2Minutes() {
    const alarm: Alarm = {
      id: Date.now() % 2147483647,
      triggerAt: Date.now() + 0.5 * 60 * 1000, // now + 2 Minutes
      label: "Test 123",
      group: "idk",
    };
  
    const notification: AlarmNotification = {
      id: alarm.id + 1,
      delay: 1 * 60 * 1000, // 1 Minute
      alarm: alarm,
    }
  
    await AlarmModule.scheduleAlarm(alarm);
    await AlarmModule.scheduleAlarmNotification(notification);
  }
  return (
    <View style={styles.container}>
      <Text>Edit src/app/index.tsx to edit this screen.</Text>
      <Pressable onPress={async()=>await scheduleAlarmIn2Minutes()}><Text>Alarm</Text></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
