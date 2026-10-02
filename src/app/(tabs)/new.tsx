import MapEditScreen from "@/components/MapEditScreen";
import TimeEditScreen from "@/components/TimeEditScreen";
import { useEverything } from "@/context/everythingContext";
import { LocationReminder, TimeReminder, Reminder, TimeMeasurement } from "@/models/reminder";
import { getStyles, styleBigButton } from "@/style/styles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useEffect, useState } from "react";
import {
  Pressable,
  Switch,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from "react-native";
import * as Crypto from "expo-crypto";
import { useRouter } from "expo-router";
import * as Notifications from "expo-notifications";
import { Alert } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function New() {
  const context = useEverything();
  const router = useRouter();
  const styles = getStyles(context.settings.darkMode ?? true);

  const [name, setName] = useState("");
  const [useTime, setUseTime] = useState(false);
  const [useMap, setUseMap] = useState(false);
  const [timeReminder, setTimeReminder] = useState<TimeReminder | undefined>();
  const [mapReminder, setMapReminder] = useState<
    LocationReminder | undefined
  >();

  const [showTimeSubscreen, setShowTimeSubscreen] = useState(false);
  const [showMapSubscreen, setShowMapSubscreen] = useState(false);

  const [sendNotification, setSendNotification] = useState(true);

  async function setNotification(content: string, minutes: number) {
    const perms = await Notifications.getPermissionsAsync();
    if (!perms.granted) {
      const status = await Notifications.requestPermissionsAsync();
      if (!status.granted) {
        return;
      }
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Reminder!",
        body: content,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: minutes * 60,
      },
    });
    console.log("set!")
  }
  function handleTimeSubmit(time: TimeReminder | undefined) {
    setShowTimeSubscreen((previous) => !previous);
    console.log(time ?? "no time set");
    if (time) {
      setTimeReminder(time);
    }
  }

  function handleMapSubmit(location: LocationReminder | undefined) {
    setShowMapSubscreen((previous) => !previous);
    console.log(location ?? "no location set");
    if (location) {
      setMapReminder(location);
    }
  }

  async function handleSubmit() {
    if (name === "") {
      Alert.alert("Error", "You need to add a title!");
      return;
    }
    if (!useTime && !useMap) {
      Alert.alert("Error", "You need to use either time or location or both!");
      return;
    }
    let reminder: Reminder = {
      id: Crypto.randomUUID(),
      type: "time+location",
      name: name,
      sendNotification: sendNotification,
      setAlarm: false,
      playSound: false,
    };
    if (useTime && useMap) {
      reminder.type = "time+location";
      reminder.time = timeReminder;
      reminder.location = mapReminder;
    } else if (useTime && !useMap) {
      reminder.type = "time";
      reminder.time = timeReminder;
    } else if (!useTime && useMap) {
      reminder.type = "location";
      reminder.location = mapReminder;
    } else {
      Alert.alert("Error", "You need to use either time or location or both!");
      return;
    }

    if (reminder.type === "time" && reminder.time?.interval?.type === "regular" && reminder.time.interval.regular?.measurement === TimeMeasurement.Minutes) {
      await setNotification(reminder.name, reminder.time.interval.regular?.value ?? 1)
    }

    context.addReminder(reminder);
    router.navigate("/");
  }

  if (!context.isLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={"large"}></ActivityIndicator>
      </View>
    );
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
        <Switch
          value={useTime}
          onValueChange={(value) => setUseTime(value)}
        ></Switch>
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
        <Switch
          value={useMap}
          onValueChange={(value) => setUseMap(value)}
        ></Switch>
      </View>

      <View style={styles.row}>
        <Text style={styles.textLarger}>Send Notification:</Text>
        <Switch
          value={sendNotification}
          disabled
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
        onPress={() => router.navigate("/")}
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
        onPress={async ()=> await handleSubmit()}
      >
        <View style={styles.row}>
          <MaterialIcons name="save" color="#FFF" size={30} />
          <Text style={{ ...styles.textLarger, color: "#FFFFFF" }}>Save</Text>
        </View>
      </Pressable>

      <View style={styles.row}>
        <Text style={styles.textLarger}>Play Sound:</Text>
        <Switch disabled></Switch>
      </View>
    </View>
  );
}
