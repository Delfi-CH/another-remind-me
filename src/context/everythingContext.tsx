  import {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
  } from "react";
  import { Reminder } from "@/models/reminder";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { Settings } from "@/models/settings";

  interface EverythingContextType {
    reminders: Reminder[];
    settings: Settings;
    isLoading: boolean;
    showTabs: boolean;
    addReminder: (reminder: Reminder) => void;
    updateReminder: (id: number, reminder: Reminder) => void;
    deleteReminder: (id: number) => void;
    updateSettings: (settins: Settings) => void;
    toggleTabs: () => void;
    setTabs: (visible: boolean) => void;
  }

  const ReminderContext = createContext<EverythingContextType | undefined>(
    undefined,
  );

  export function EverythingProvider({ children }: { children: ReactNode }) {
    const [reminders, setReminders] = useState<Reminder[]>([]);
    const [settings, setSettings] = useState<Settings>({});
    const [loaded, setLoaded] = useState(false);
    const [showTabs, setShowTabs] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      if (!loaded || isLoading) {
        return;
      }
      async function saveRemiders() {
        const json = JSON.stringify(reminders);
        try {
          await AsyncStorage.setItem("reminders", json);
          console.log("Reminders saved");
        } catch (err) {
          console.error("Could not save reminders: " + err);
        }
        const json2 = JSON.stringify(settings);
        try {
          await AsyncStorage.setItem("settings", json2);
          console.log("Settings saved");
        } catch (err) {
          console.error("Could not save settings: " + err);
        }
      }
      saveRemiders();
    }, [reminders, settings, loaded]);

    useEffect(() => {
      async function loadReminders() {
        try {
          const data = await AsyncStorage.getItem("settings");
          if (data === null) {
            return;
          }
          const obj = JSON.parse(data);
          setSettings(obj);
          console.log("Settings loaded");
        } catch (err) {
          console.error("Could not load settings: " + err);
        }
        try {
          const data = await AsyncStorage.getItem("reminders");
          if (data === null) {
            return;
          }
          const obj = JSON.parse(data);
          setReminders(obj);
          console.log("Reminders loaded");
        } catch (err) {
          console.error("Could not load reminders: " + err);
        }
        setIsLoading(false);
        setLoaded(true);
      }

      loadReminders();
    }, []);

    function addReminder(reminder: Reminder): void {
      setReminders((current) => [...current, reminder]);
    }

    function updateReminder(id: number, reminder: Reminder): void {
      setReminders((current) => current.map((r) => (r.id === id ? reminder : r)));
    }

    function deleteReminder(id: number): void {
      setReminders((current) => current.filter((r) => r.id !== id));
    }

    function updateSettings(settings: Settings): void {
      setSettings(settings);
    }

    function toggleTabs(): void {
      setShowTabs((previous)=> !previous)
    }

    function setTabs(visible: boolean): void {
      setShowTabs(visible)
    }

    return (
      <ReminderContext.Provider
        value={{
          reminders,
          settings,
          showTabs,
          isLoading,
          addReminder,
          updateReminder,
          deleteReminder,
          updateSettings,
          toggleTabs,
          setTabs
        }}
      >
        {children}
      </ReminderContext.Provider>
    );
  }

  export function useEverything() {
    const context = useContext(ReminderContext);
    if (!context) {
      throw new Error(
        "useReminder can only be used inside the ReminderProvider!",
      );
    }
    return context;
  }
