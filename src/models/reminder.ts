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

export interface TimeInterval {
    type: "regular"|"special"
    regular: RegularTimeInterval
    special: SpecialTimeInterval
}

export interface RegularTimeInterval {
    measurement: TimeMeasurement
    value: number,
    repeat: boolean
}

export interface SpecialTimeInterval {
    type: "days"|"workdays"|"weekends"
    days?: Day[]
    workdays?: boolean
    weekends?: boolean
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
    radius: number // in meters
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
