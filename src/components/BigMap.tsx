import { useEverything } from "@/context/everythingContext";
import { getStyles, styleBigButton } from "@/style/styles";
import { useImage } from "expo-image";
import * as Location from "expo-location";
import { GoogleMaps, useLocationPermissions } from "expo-maps";
import { useEffect, useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface BigMapProps {
  active: boolean;
  coordinates: Coordinates;
  onClose: () => void;
  onSave: () => void;
  onCoordinateChange: (coordinates: Coordinates) => void;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export default function BigMap(props: BigMapProps) {
  const [status, requestPermission] = useLocationPermissions();
  const [myCoordinates, setMyCoordinates] = useState<Coordinates>();
  const context = useEverything();
  const styles = getStyles(context.settings.darkMode ?? true);
  const myIcon = useImage(require("@/assets/images/currentLocation.svg"), {
    maxWidth: 64,
    maxHeight: 64,
    tintColor: "#FF0000",
  });

  useEffect(() => {
    async function getMapPerms() {
      if (!status?.granted) {
        await requestPermission();
      }
    }

    async function getCurrentLocation() {
      const foregroundPerms = await Location.getForegroundPermissionsAsync();
      if (!foregroundPerms.granted) {
        const status = await Location.requestForegroundPermissionsAsync();
        if (!status.granted) {
          return;
        }
      }
      const location = await Location.getCurrentPositionAsync();
      setMyCoordinates({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    }

    getMapPerms();
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (props.active) {
      context.setTabs(false);
    } else {
      context.setTabs(true);
    }
  }, [props.active]);

  if (props.active) {
    return (
      <View
        style={{
          ...styles.container,
          backgroundColor: "#1E1F25",
          width: "300%",
          height: "300%",
        }}
      >
        <Modal
          animationType="slide"
          transparent={false}
          visible={props.active}
          onRequestClose={() => {
            props.onClose();
          }}
        >
          <GoogleMaps.View
            style={{ height: "90%" }}
            cameraPosition={{ coordinates: myCoordinates, zoom: 10 }}
            markers={[
              {
                coordinates: props.coordinates,
                draggable: true,
              },
              {
                coordinates: myCoordinates,
                icon: myIcon ?? undefined,
                zIndex: 100,
                anchor: { x: 0.5, y: 0.5 },
              },
            ]}
            onMapClick={(c) => {
              props.onCoordinateChange({
                latitude: c.coordinates.latitude ?? 0,
                longitude: c.coordinates.longitude ?? 0,
              });
            }}
          ></GoogleMaps.View>
            <Pressable
              style={({ pressed }) =>
                styleBigButton(750, 20, 120, 60, "#CC0000", pressed)
              }
              onPress={() => props.onClose()}
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
                styleBigButton(750, 230, 120, 60, "#00CC00", pressed)
              }
              onPress={() => props.onSave()}
            >
              <View style={styles.row}>
                <MaterialIcons name="save" color="#FFF" size={30} />
                <Text style={{ ...styles.textLarger, color: "#FFFFFF" }}>
                  Save
                </Text>
              </View>
            </Pressable>
        </Modal>
      </View>
    );
  }
}
