import { useEverything } from "@/context/everythingContext";
import { getStyles, styleBigButton } from "@/style/styles";
import { useState } from "react";
import { Pressable, Text, View, TextInput } from "react-native";
import BigMap, { Coordinates } from "./BigMap";
import { GoogleMaps } from "expo-maps";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LocationReminder } from "@/models/reminder";

interface MapEditScreenProps {
  visible: boolean;
  onSubmit: (location: LocationReminder|undefined) => void;
}

export default function MapEditScreen(props: MapEditScreenProps) {
  const context = useEverything();
  const styles = getStyles(context.settings.darkMode ?? true);
  const [showBigMap, setShowBigMap] = useState(false);
  const [coordinates, setCoordinates] = useState<Coordinates>();

  return (
    <View
      style={{
        display: "flex",
        position: "absolute",
        zIndex: 100,
        width: "120%",
        height: "100%",
        top: 250,
        margin: 10,
      }}
    >
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
        <>
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
              paddingTop: 0
            }}
          >
            <Text
              style={{ ...styles.title, color: "#FFFFFF", alignSelf: "center" }}
            >
              Map
            </Text>
            <BigMap
              coordinates={coordinates ?? { latitude: 0, longitude: 0 }}
              active={showBigMap}
              onClose={() => {
                setShowBigMap((previous) => !previous);
              }}
              onSave={() => {
                setShowBigMap((previous) => !previous);
              }}
              onCoordinateChange={(coordinates) => setCoordinates(coordinates)}
            ></BigMap>
            <GoogleMaps.View 
              style={{width: "100%", height: "35%"}}
              cameraPosition={{coordinates: coordinates, zoom: 11}}
              markers={[{
                coordinates: coordinates
              }]}
            >

            </GoogleMaps.View>
            <Pressable
              onPress={() => {
                setShowBigMap((previous) => !previous);
              }}
            >
              <Text
                style={{
                  ...styles.textLarger,
                  color: "#FFFFFF",
                  alignSelf: "center",
                }}
              >
                Edit Coordinates
              </Text>
              <View style={styles.row}>
              <Text style={{
                  ...styles.textLarger,
                  color: "#FFFFFF",
                }}>Radius:</Text>
                <TextInput
                              style={{ ...styles.input, width: "10%" }}
                              inputMode="numeric"
                            ></TextInput>
                <Text style={{
                  ...styles.textLarger,
                  color: "#FFFFFF",
                }}>m</Text>
                </View>
            </Pressable>
            <Pressable
              style={({ pressed }) =>
                styleBigButton(400, 20, 120, 60, "#CC0000", pressed)
              }
              onPress={() => props.onSubmit(undefined)}
            >
              <View style={styles.row}>
                <MaterialIcons name="cancel" color="#FFF" size={30} />
                <Text style={{ ...styles.textLarger, color: "#FFFFFF" }}>
                  Cancel
                </Text>
              </View>
            </Pressable>
            <Pressable
              style={({ pressed }) =>
                styleBigButton(400, 230, 120, 60, "#00CC00", pressed)
              }
              onPress={() => props.onSubmit(undefined)}
            >
              <View style={styles.row}>
                <MaterialIcons name="save" color="#FFF" size={30} />
                <Text style={{ ...styles.textLarger, color: "#FFFFFF" }}>
                  Save
                </Text>
              </View>
            </Pressable>
          </View>
        </>
      ) : (
        ""
      )}
    </View>
  );
}
