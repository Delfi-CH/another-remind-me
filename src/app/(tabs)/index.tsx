import { Text, View, StyleSheet, Pressable } from "react-native";
import { getStyles } from "@/style/global";
import { useReminder } from "@/context/reminderContext";


export default function Index() {
  const context = useReminder();
  const styles = getStyles(context.settings.darkMode ?? true)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Reminders</Text>
    </View>
  );
}

