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
