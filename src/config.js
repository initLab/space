export const mqtt = {
    url: import.meta.env.VITE_MQTT_URL,
    sensors: [{
        label: 'Big room',
        topic: 'sensors-xiaomi-ble/big-room/temperature',
    }, {
        label: 'Small room',
        topic: 'sensors-xiaomi-ble/small-room/temperature',
    }, {
        label: 'Kitchen',
        topic: 'sensors-xiaomi-ble/kitchen/temperature',
    }],
    doorStates: [{
        type: 'locked',
        topic: 'NetControl/initLab/out/ch28',
        mapper: msg => JSON.parse(msg).value.raw === 1,
    }, {
        type: 'unlocked',
        topic: 'NetControl/initLab/out/ch29',
        mapper: msg => JSON.parse(msg).value.raw === 1,
    }, {
        type: 'closed',
        topic: 'NetControl/initLab/out/ch30',
        mapper: msg => JSON.parse(msg).value.raw === 1,
    }],
};

export const grafana = {
    temperature: {
        dashboard: {
            id: 'C-7GPzXMk',
            name: 'temperatures',
        },
        panels: [4, 5, 10],
    },
    humidity: {
        dashboard: {
            id: 'd19kszuGk',
            name: 'humidity',
        },
        panels: [4, 5, 10],
    },
};
