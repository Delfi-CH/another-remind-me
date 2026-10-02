import { useEverything } from "@/context/everythingContext";
import { TimeMeasurement } from "@/models/reminder";
import { getStyles } from "@/style/styles";
import { FlatList, Text, View, ActivityIndicator, Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Index() {
  const context = useEverything();
  const styles = getStyles(context.settings.darkMode ?? true);

  if (!context.isLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={"large"}></ActivityIndicator>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Reminders</Text>
      <FlatList
        data={context.reminders}
        ListEmptyComponent={
          <><Text style={styles.textLarger}>No reminders...</Text></>
        }
        renderItem={({ item }) => (
          <View style={{display: "flex", borderWidth: 1, borderColor: "#FFFFFF", padding:10, marginTop: 10}}>
            <View style={styles.row}>
              {item.type === "time" || item.type === "time+location" ? (
                <>
                  {item.time?.type === "interval" &&
                  item.time?.interval?.type === "regular" ? (
                    <>
                      <Text style={styles.text}>
                        From {new Date(item.time.interval.regular?.start).getHours()}:{new Date(item.time.interval.regular?.start).getMinutes()}{" "}
                        {item.time.interval.regular?.repeat ? "every" : "after"}{" "}
                        {item.time.interval.regular?.value}{" "}
                        {
                          TimeMeasurement[
                            item.time?.interval?.regular?.measurement
                          ]
                        }
                      </Text>
                    </>
                  ) : (
                    <>
                      <Text style={styles.text}>
                        {item.time?.interval?.special?.type === "days"
                          ? "on"
                          : item.time?.interval?.special?.weekends ||
                              item.time?.interval?.special?.workdays
                            ? "every "
                            : " "}
                        {item.time?.interval?.special?.type === "days"
                          ? "on"
                          : item.time?.interval?.special?.weekends ||
                              item.time?.interval?.special?.workdays
                            ? item.time?.interval?.special?.weekends
                              ? "Weekend"
                              : "Workday"
                            : item.time?.interval?.special?.type}{" "}
                        at {item.time?.hour ?? ""}:{item.time?.minute ?? ""}
                      </Text>
                    </>
                  )}
                </>
              ) : (
                <></>
              )}
              {item.type === "location" || item.type === "time+location" ? (
                <>
                  <Text style={styles.text}>
                    at{" "}
                    {item.location?.latitude >= 0
                      ? item.location?.latitude.toFixed(5) + "N"
                      : item.location?.latitude.toFixed(5) + "S"}{" "}
                    {item.location?.longitude >= 0
                      ? item.location?.longitude.toFixed(5) + "E"
                      : item.location?.longitude.toFixed(5) + "W"}{" "}
                    within {item.location?.radius}m
                  </Text>
                </>
              ) : (
                <></>
              )}
            </View>
            <Text style={styles.textLarger}>{item.name}</Text>
            
            <Pressable style={{borderWidth: 1, borderColor: "#CC0000", borderRadius: 3, width: 110, backgroundColor: "#CC0000"}}
              onPress={()=>context.deleteReminder(item.id)}
            >
              <View style={styles.row}>
              <MaterialIcons name="delete"  color="#FFF" size={30}></MaterialIcons>
              <Text style={styles.textLarger}>Delete</Text>
              </View>
            </Pressable>
            
          </View>
        )}
      ></FlatList>
    </View>
  );
}
