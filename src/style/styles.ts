import { StyleSheet, ViewStyle } from "react-native";

export function getStyles(darkMode: boolean): any {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: darkMode ? "#121418" : "#CCCCCC",
      paddingTop: 50,
      padding: 30,
      gap: 20
    },
    text: {
      fontSize: 15,
      color: darkMode ? "#FFFFFF" : "#121418",
    },
    textLarger: {
      fontSize: 20,
      color: darkMode ? "#FFFFFF" : "#121418",
    },
    title: {
      fontSize: 30,
      color: darkMode ? "#FFFFFF" : "#121418",
    },
    dropdown: {
      backgroundColor: darkMode ? " #1E1F25" : "#F6F8FA",
      maxWidth: "80%",
    },
    dropdownText: {
      color: darkMode ? "#121418" : "#121418",
    },
    row: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      gap: 10,
    },
    input: {
      borderWidth: 1,
      width: "80%",
      height: 50,
      borderColor: darkMode ? "#FFFFFF" : "#121418",
      borderRadius: 10,
      color: darkMode ? "#FFFFFF" : "#121418",
    }
  });
}

export function styleBigButton(top: number, left: number, width: number, height: number, color: string, pressed: boolean, zIndex: number = 1): ViewStyle {
  return {
    position: "absolute",
    width: width,
    height: height,
    backgroundColor: color,
    opacity: pressed ? 0.5 : 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    top: top,
    left: left,
    zIndex: zIndex
  }
}
