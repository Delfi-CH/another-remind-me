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
  isLoaded: boolean;
  showTabs: boolean;
  addReminder: (reminder: Reminder) => void;
  updateReminder: (id: string, reminder: Reminder) => void;
  deleteReminder: (id: string) => void;
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
  const [isLoaded, setIsLoaded] = useState(false);
  const [showTabs, setShowTabs] = useState(true);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    async function saveData() {
      try {
        await AsyncStorage.setItem("reminders", JSON.stringify(reminders));

        await AsyncStorage.setItem("settings", JSON.stringify(settings));

        console.log("Data saved");
      } catch (err) {
        console.error("Could not save data:", err);
      }
    }

    saveData();
  }, [reminders, settings, isLoaded]);

  useEffect(() => {
    async function loadData() {
      try {
        const settingsData = await AsyncStorage.getItem("settings");
        const remindersData = await AsyncStorage.getItem("reminders");

        if (settingsData !== null) {
          setSettings(JSON.parse(settingsData));
        }

        if (remindersData !== null) {
          setReminders(JSON.parse(remindersData));
        }
      } catch (err) {
        console.error("Could not load data:", err);
      } finally {
        console.log("Data loaded")
        setIsLoaded(true);
      }
    }

    loadData();
  }, []);

  function addReminder(reminder: Reminder): void {
    setReminders((current) => [...current, reminder]);
  }

  function updateReminder(id: string, reminder: Reminder): void {
    setReminders((current) => current.map((r) => (r.id === id ? reminder : r)));
  }

  function deleteReminder(id: string): void {
    setReminders((current) => current.filter((r) => r.id !== id));
  }

  function updateSettings(settings: Settings): void {
    setSettings(settings);
  }

  function toggleTabs(): void {
    setShowTabs((previous) => !previous);
  }

  function setTabs(visible: boolean): void {
    setShowTabs(visible);
  }

  return (
    <ReminderContext.Provider
      value={{
        reminders,
        settings,
        showTabs,
        isLoaded,
        addReminder,
        updateReminder,
        deleteReminder,
        updateSettings,
        toggleTabs,
        setTabs,
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
