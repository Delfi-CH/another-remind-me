import MapEditScreen from "@/components/MapEditScreen";
import TimeEditScreen from "@/components/TimeEditScreen";
import { useEverything } from "@/context/everythingContext";
import { LocationReminder, TimeReminder } from "@/models/reminder";
import { getStyles, styleBigButton } from "@/style/styles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import { Pressable, Switch, Text, TextInput, View } from "react-native";

export default function New() {
  const context = useEverything();
  const styles = getStyles(context.settings.darkMode ?? true);

  const [name, setName] = useState("");

  const [showTimeSubscreen, setShowTimeSubscreen] = useState(false);
  const [showMapSubscreen, setShowMapSubscreen] = useState(false);

  const [sendNotification, setSendNotification] = useState(false);

  function handleTimeSubmit(time: TimeReminder | undefined) {
    setShowTimeSubscreen((previous) => !previous);
    console.log(time ?? "no time set");
  }
  function handleMapSubmit(location: LocationReminder | undefined) {
    setShowMapSubscreen((previous) => !previous);
    console.log(location ?? "no location set");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Reminder</Text>
      <View style={styles.row}>
        <Text style={styles.textLarger}>Name:</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={(value) => setName(value)}
        ></TextInput>
      </View>

      <View style={styles.row}>
        <Text style={styles.textLarger}>Time:</Text>
        <Pressable
          onPress={() => {
            setShowMapSubscreen(false);
            setShowTimeSubscreen((previous) => !previous);
          }}
        >
          <Text style={styles.textLarger}>Edit</Text>
        </Pressable>
        <Text style={styles.textLarger}>| Use:</Text>
        <Switch></Switch>
      </View>

      <TimeEditScreen
        visible={showTimeSubscreen}
        onSubmit={(t) => handleTimeSubmit(t)}
      ></TimeEditScreen>
      <MapEditScreen
        visible={showMapSubscreen}
        onSubmit={(l) => handleMapSubmit(l)}
      ></MapEditScreen>

      <View style={styles.row}>
        <Text style={styles.textLarger}>Map:</Text>
        <Pressable
          onPress={() => {
            setShowTimeSubscreen(false);
            setShowMapSubscreen((previous) => !previous);
          }}
        >
          <Text style={styles.textLarger}>Edit</Text>
        </Pressable>
        <Text style={styles.textLarger}>| Use:</Text>
        <Switch></Switch>
      </View>

      <View style={styles.row}>
        <Text style={styles.textLarger}>Send Notification:</Text>
        <Switch
          value={sendNotification}
          onValueChange={(value) => setSendNotification(value)}
        ></Switch>
      </View>
      <View style={styles.row}>
        <Text style={styles.textLarger}>Set Alarm:</Text>
        <Switch disabled></Switch>
      </View>
      <Pressable
        style={({ pressed }) =>
          styleBigButton(650, 20, 120, 60, "#CC0000", pressed)
        }
      >
        <View style={styles.row}>
          <MaterialIcons name="cancel" color="#FFF" size={30} />
          <Text style={{ ...styles.textLarger, color: "#FFFFFF" }}>Cancel</Text>
        </View>
      </Pressable>
      <Pressable
        style={({ pressed }) =>
          styleBigButton(650, 230, 120, 60, "#00CC00", pressed)
        }
      >
        <View style={styles.row}>
          <MaterialIcons name="save" color="#FFF" size={30} />
          <Text style={{ ...styles.textLarger, color: "#FFFFFF" }}>Save</Text>
        </View>
      </Pressable>

      <View style={styles.row}>
        <Text style={styles.textLarger}>Play Sound</Text>
      </View>
    </View>
  );
}
