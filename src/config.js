export const mqtt = {
    url: import.meta.env.MQTT_URL,
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

export const sensors = {
    'sensors-xiaomi-ble/big-room/temperature': {
        type: 'Temperature',
        label: 'Big room',
    },
    'sensors-xiaomi-ble/small-room/temperature': {
        type: 'Temperature',
        label: 'Small room',
    },
    'sensors-xiaomi-ble/kitchen/temperature': {
        type: 'Temperature',
        label: 'Kitchen',
    },
};

export const grafana = {
    dashboard: {
        id: 'SGAb0ZXMk',
        name: 'temperature-and-humidity',
    },
    panels: [4, 5, 10],
};
