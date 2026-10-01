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
export enum TimeMeasurement {
    Minutes,
    Hours,
    Days,
    Weeks,
}

export enum Day {
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday
}

export interface DayOfMonth {
    type: "index"|"weekday"
    index?: number
    weekdayIndex?: number
    weekday?: Day
}

export interface TimeInterval {
    type: "regular"|"special"
    regular: RegularTimeInterval
    special: SpecialTimeInterval
}

export interface RegularTimeInterval {
    measurement: TimeMeasurement
    value: number
}

export interface SpecialTimeInterval {
    type: "days"|"workdays"|"weekends"|"dayOfMonth"
    days?: Day[]
    workdays?: boolean
    weekends?: boolean
    dayOfMonth?: DayOfMonth
}

export interface TimeReminder {
    type: "timestamp"|"interval"
    timestamp?: number
    hour?: number
    minute?: number
    interval?: TimeInterval
}

export interface LocationReminder {
    latitude: number
    longitude: number
    radius: number //in meters
}

export interface Sound {
    id: number
    name: string
    uri: string
}

export interface Reminder {
    id: number
    name: string
    type: "time"|"location"|"time&location"
    time?: TimeReminder
    location?: LocationReminder
    sendNotification: boolean
    setAlarm: boolean
    playSound: boolean
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
- Maps