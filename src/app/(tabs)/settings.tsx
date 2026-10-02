import { useEverything } from "@/context/everythingContext";
import { getStyles } from "@/style/styles";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import { useState } from "react";
import { Appearance, Switch, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function Settings() {
  const context = useEverything();
  const styles = getStyles(context.settings.darkMode ?? false);
  const [stylePickerOpen, setStylePickerOpen] = useState(false);
  const [stylePickerValue, setStylePickerValue] = useState(
    context.settings.styleSource === "system"
      ? "system"
      : context.settings.darkMode
        ? "dark"
        : "light",
  );
  const [styleModes, setStyleModes] = useState([
    { label: "Light", value: "light" },
    { label: "Dark", value: "dark" },
    { label: "Use system defaults", value: "system" },
  ]);

  function handleStyleChange(value: string) {
    switch (value) {
      case "light":
        context.updateSettings({
          ...context.settings,
          darkMode: false,
          styleSource: "user",
        });
        break;
      case "dark":
        context.updateSettings({
          ...context.settings,
          darkMode: true,
          styleSource: "user",
        });
        break;
      case "system":
        const systemScheme = Appearance.getColorScheme();
        const dark = systemScheme === "dark";
        context.updateSettings({
          ...context.settings,
          darkMode: dark,
          styleSource: "system",
        });
        break;
      default:
        break;
    }
  }

  function handle12HourClockChange(value: boolean) {
    context.updateSettings({
      ...context.settings,
      use12hourClock: value,
    });
  }

  function handleSoundChange(value: boolean) {
    context.updateSettings({
      ...context.settings,
      allowSounds: value,
    });
  }

  async function handleNotificationChange(value: boolean) {
    if (value) {
      const perms = await Notifications.getPermissionsAsync();
      if (!perms.granted) {
        const status = await Notifications.requestPermissionsAsync();
        if (!status.granted) {
          return;
        }
      }
    }

    context.updateSettings({
      ...context.settings,
      allowNotifications: value,
    });
  }

  async function handleLocationChange(value: boolean) {
    if (value) {
      const foregroundPerms = await Location.getForegroundPermissionsAsync();
      if (!foregroundPerms.granted) {
        const status = await Location.requestForegroundPermissionsAsync();
        if (!status.granted) {
          return;
        }
      }
      const backgroundPerms = await Location.getBackgroundPermissionsAsync();
      if (!backgroundPerms.granted) {
        const status = await Location.requestBackgroundPermissionsAsync();
        if (!status.granted) {
          return;
        }
      }
    }
    context.updateSettings({
      ...context.settings,
      allowGeolocation: value,
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.row}>
        <Text style={styles.textLarger}>Color</Text>
        <DropDownPicker
          open={stylePickerOpen}
          value={stylePickerValue}
          items={styleModes}
          setOpen={setStylePickerOpen}
          setValue={setStylePickerValue}
          setItems={setStyleModes}
          onChangeValue={(value) => handleStyleChange(String(value))}
          style={styles.dropdown}
          textStyle={styles.dropdownText}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.textLarger}>Use 12 Hour Clock: </Text>
        <Switch
          value={context.settings.use12hourClock ?? false}
          onValueChange={(v) => handle12HourClockChange(v)}
        ></Switch>
      </View>
      <View style={styles.row}>
        <Text style={styles.textLarger}>Send Notifications: </Text>
        <Switch
          value={context.settings.allowNotifications ?? false}
          onValueChange={async (v) => await handleNotificationChange(v)}
        ></Switch>
      </View>
      <View style={styles.row}>
        <Text style={styles.textLarger}>Use Location: </Text>
        <Switch
          value={context.settings.allowGeolocation ?? false}
          onValueChange={async (v) => await handleLocationChange(v)}
        ></Switch>
      </View>
      <View style={styles.row}>
        <Text style={styles.textLarger}>Play sounds: </Text>
        <Switch
          value={context.settings.allowSounds ?? false}
          onValueChange={(v) => handleSoundChange(v)}
        ></Switch>
      </View>
    </View>
  );
}
