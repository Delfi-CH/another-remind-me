import { StyleSheet } from "react-native";

export function getStyles(darkMode: boolean): any {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: darkMode ? "#121418" : "#FFFFFF",
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
  });
}
