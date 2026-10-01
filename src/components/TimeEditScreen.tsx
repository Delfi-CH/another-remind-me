import { useReminder } from "@/context/reminderContext";
import { getStyles } from "@/style/styles";
import { Pressable, Switch, Text, TextInput, View } from "react-native";
import { TimeMeasurement, TimeReminder, Day } from "@/models/reminder";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from '@react-native-community/datetimepicker';

interface TimeEditScreenProps {
  visible: boolean;
  onSubmit: (time?: TimeReminder) => void;
}

export default function TimeEditScreen(props: TimeEditScreenProps) {
  const context = useReminder();
  const [time, setTime] = useState<TimeReminder>();
  const [timeMeasurementDropdownOpen, setTimeMeasurementDropdownOpen] =
    useState(false);
  const [timeMeasurementValue, setTimeMeasurementValue] = useState(null);
  const [timeMeasurements, setTimeMeasurements] = useState([
    { label: "Minutes", value: TimeMeasurement.Minutes },
    { label: "Hours", value: TimeMeasurement.Hours },
    { label: "Days", value: TimeMeasurement.Days },
    { label: "Weeks", value: TimeMeasurement.Weeks },
  ]);
  const [specialTimeIntervaDropdownOpen, setSpecialTimeIntervaDropdownOpen] =
    useState(false);
  const [specialTimeIntervalValue, setSpecialTimeIntervalValue] = useState(null);
  const [specialTimeIntervalList, setSpecialTimeIntervalList] = useState([
    { label: "today", value: "today" },
    { label: "tomorrow", value: "tomorrow" },
    { label: "on Weekdays...", value: "weekdays"},
    { label: "on Workdays", value: "workdays"},
    { label: "on Weekends", value: "weekends"},
    { label: "on Days of the Month...", value: "dayOfTheMonth"},
  ]);

  const [weekdayDropdownOpen, setWeekdayDropdownOpen] =
    useState(false);
  const [weekdayDropdownValue, setWeekdayDropdownValue] = useState(null);
  const [weekdayDropdownList, setWeekdayDropdownList] = useState([
    { label: "Monday", value: Day.Monday },
    { label: "Tuesday", value: Day.Tuesday },
    { label: "Wednesday", value: Day.Wednesday},
    { label: "Thursday", value: Day.Thursday},
    { label: "Friday", value: Day.Friday},
    { label: "Saturday", value: Day.Saturday},
    { label: "Sunday", value: Day.Sunday},
  ]);


  const [showTimePicker, setShowTimePicker] = useState(false)
  const [timeOfDay, setTimeOfDay] = useState(new Date())

  const styles = getStyles(context.settings.darkMode ?? true);

  return (
      <View style={{
        display: "flex",
        position: "absolute",
        zIndex: 100,
        width: "120%",
        top: 240,
        margin: 10,
      }}>
      {props.visible ? (
        <View
          style={{
            ...styles.container,
            flex: 0,
            position: "absolute",
            height: "100%",
            width: "100%",
            top: 0,
            zIndex: 5,
            opacity: 0.5,
          }}
        ></View>
      ) : (
        ""
      )}
      {props.visible ? (
        <View
          style={{
            ...styles.container,
            width: "100%",
            height: "100%",
            alignItems: "baseline",
            zIndex: 10,
            flex: 0,
            opacity: 1,
            backgroundColor: "#1E1F25",
            padding: 30,
          }}
        >
          <Text
            style={{ ...styles.title, color: "#FFFFFF", alignSelf: "center" }}
          >
            Time
          </Text>
          <View style={styles.row}>
            <Text style={{ ...styles.textLarger, color: "#FFFFFF" }}>in</Text>
            <TextInput
              style={{ ...styles.input, width: "30%", marginRight: -50 }}
              inputMode="numeric"
            ></TextInput>
            <DropDownPicker
                listMode="MODAL"
                modalProps={{
                animationType: "fade",
              }}
              open={timeMeasurementDropdownOpen}
              value={timeMeasurementValue}
              items={timeMeasurements}
              setOpen={setTimeMeasurementDropdownOpen}
              setValue={setTimeMeasurementValue}
              setItems={setTimeMeasurements}
              onChangeValue={(value) => console.log(value)}
              style={{
                ...styles.dropdown,
                width: "60%",
                alignSelf: "center",
                backgroundColor: "#F6F8FA",
              }}
              onOpen={()=> StatusBar.setHidden(true, "slide")}
              onClose={()=> StatusBar.setHidden(false, "slide")}
              textStyle={{ ...styles.dropdownText, width: "10%" }}
              containerStyle={{ width: "90%" }}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.textLarger}>Repeat:</Text>
            <Switch></Switch>
          </View>
          <View style={styles.row}>
          <Pressable onPress={() => props.onSubmit()}>
            <Text style={{ ...styles.textLarger, color: "#FFFFFF" }}>Save</Text>
          </Pressable>
          <Pressable onPress={() => props.onSubmit()}>
            <Text style={{ ...styles.textLarger, color: "#FFFFFF" }}>
              Cancel
            </Text>
          </Pressable>
          </View>
          <View
            style={{
              borderBottomWidth: 10,
              borderBottomColor: "#FFFFFF",
              height: 10,
              width: "200%",
              left: -30,
            }}
          ></View>
          <View style={styles.row}>
            <Text style={{ ...styles.textLarger, color: "#FFFFFF" }}>at</Text>
            <Pressable onPress={()=> setShowTimePicker((previous)=> !previous)}><Text style={{ ...styles.textLarger, color: "#FFFFFF", borderWidth: 1, borderColor: "#FFFFFF", padding: 10, borderRadius: 10, marginRight: -50 }}>{timeOfDay.getHours()}:{timeOfDay.getMinutes()}</Text></Pressable>
            {showTimePicker ? <DateTimePicker mode="time" value={new Date()} onDismiss={()=>setShowTimePicker((previous)=> !previous)} onValueChange={(e, date)=>{setTimeOfDay(date); setShowTimePicker((previous)=> !previous)}}></DateTimePicker> : ""}
            <DropDownPicker
              listMode="MODAL"
              modalProps={{
                animationType: "fade"
              }}
              open={specialTimeIntervaDropdownOpen}
              value={specialTimeIntervalValue}
              items={specialTimeIntervalList}
              setOpen={setSpecialTimeIntervaDropdownOpen}
              setValue={setSpecialTimeIntervalValue}
              setItems={setSpecialTimeIntervalList}
              onChangeValue={(value) => {
                console.log(value)
                if (value === "weekdays") {
                    setWeekdayDropdownOpen((previous)=>!previous)
                }
              }}
              style={{
                ...styles.dropdown,
                width: "60%",
                alignSelf: "center",
                backgroundColor: "#F6F8FA",
              }}
              textStyle={{ ...styles.dropdownText, width: "10%" }}
              containerStyle={{ width: "90%" }}
              onOpen={()=> StatusBar.setHidden(true, "slide")}
              onClose={()=> StatusBar.setHidden(false, "slide")}
            />
          </View>
          {weekdayDropdownOpen ? <DropDownPicker
          listMode="MODAL"
          modalProps={{
                animationType: "fade"
              }}
              multiple={true}
              open={weekdayDropdownOpen}
              value={weekdayDropdownValue}
              items={weekdayDropdownList}
              setOpen={setWeekdayDropdownOpen}
              setValue={setWeekdayDropdownValue}
              setItems={setWeekdayDropdownList}
              onChangeValue={(value) => {
                console.log(value)
              }}
              style={{
                ...styles.dropdown,
                width: "60%",
                alignSelf: "center",
                backgroundColor: "#F6F8FA",
              }}
              textStyle={{ ...styles.dropdownText, width: "10%" }}
              containerStyle={{ width: "90%" }}
              onOpen={()=> StatusBar.setHidden(true, "slide")}
              onClose={()=> StatusBar.setHidden(false, "slide")}
            /> : ""}
          <View style={styles.row}>
            <Text style={styles.textLarger}>Repeat:</Text>
            <Switch></Switch>
          </View>
          <View style={styles.row}>
          <Pressable onPress={() => props.onSubmit()}>
            <Text style={{ ...styles.textLarger, color: "#FFFFFF" }}>Save</Text>
          </Pressable>
          <Pressable onPress={() => props.onSubmit()}>
            <Text style={{ ...styles.textLarger, color: "#FFFFFF" }}>
              Cancel
            </Text>
          </Pressable>
          </View>
        </View>
      ) : (
        ""
      )}
    </View>
  );
  
}
