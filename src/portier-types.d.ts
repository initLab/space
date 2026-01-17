export type PortierDevice = {
    id: string,
    name: string,
    type: string,
    group: string,
    number: number,
    public: boolean,
    supported_actions: string[],
    statuses: { [status: string]: string | boolean },
};

export type SpaceError = Error & {
    status: number
}


export type RawMqttReading = {
    timestamp: number,
    value: number,
};

export type PortierActionLogEntry = {
    id: number,
    createdAt: string,
    deviceId: string,
    action: string,
    User?: { name: string, username: string, },
    Application?: { name: string, },
}

export type MqttSensorHistory = { [metric: string]: [[number, number, number, number]] }