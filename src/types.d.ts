import type {RawMqttReading} from "./portier-types";

export type SpaceAccessToken = {
    accessToken: string,
    accessTokenExpire: any,
    refreshToken: string,
}

export type MqttReading = { label: string, readings: {[type: string]: RawMqttReading}};