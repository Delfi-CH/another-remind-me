# Architecture

## Components

- Container

- Card

- Tabs (native & Generic)

- Switch

- Text input

- Button (with & without border)

- Drop-down

- Calendar

- Timepicker

- Map

- Checkbox

## Navigation

Expo Router with Tabs

Routes: 

- /

- /settings

- /new

## Datamodels

```ts
enum TimeMeasurements {
    Minutes,
    Hours,
    Days,
    Weeks,
}

enum Days {
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday
}

interface DayOfMonth {
    type: "index"|"weekday"
    index?: number
    weekdayIndex?: number
    weekday?: Day
}

interface TimeInterval {
    type: "regular"|"special"
    regular: RegularTimeInterval
    special: SpecialTimeInterval
}

interface RegularTimeInterval {
    measurement: TimeMeasurement
    value: number
}

interface SpecialTimeInterval {
    type: "days"|"workdays"|"weekends"|"dayOfMonth"
    days?: Day[]
    workdays?: bool
    weekends?: bool
    dayOfMonth?: DayOfMonth
}

interface TimeReminder {
    type: "timestamp"|"interval"
    timestamp?: number
    hour?: number
    minute?: number
    interval?: TimeInterval
}

interface LocationReminder {
    latitude: number
    longitude: number
    radius: number //in meters
}

interface Sound {
    id: number
    name: string
    uri: string
}

interface Reminder {
    id: number
    name: string
    type: "time"|"location"|"time&location"
    time?: TimeReminder
    location?: LocationReminder
    sendNotification: bool
    setAlarm: bool
    playSound: bool
    sound?: Sound
}
```

## State & Sideeffects

Shared State:
    
 - List of reminders
 - Sounds
 - Settings
 - Local Time
 - GPS Data

Local State:

- /:
    - none

- /new:
    - Local Reminder Object
    - MapData

- /settings
    - Permissions

APIs:

Expo: 

- SQLITE
- Location
- Notification
- Background Process
- Audio
- Battery (performance saving background process)
- Calendar
- FileSystem
- LocalAuthentication
- Maps?

Custom:

- Alarm
- Maps?
