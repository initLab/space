export const mqtt = {
    url: 'wss://spitfire.initlab.org:8083/mqtt',
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
