import { useReminder } from "@/context/reminderContext";
import { getStyles } from "@/style/styles";
import { Text, View } from "react-native";

export default function Index() {
  const context = useReminder();
  const styles = getStyles(context.settings.darkMode ?? true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Reminders</Text>
    </View>
  );
}
