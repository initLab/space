export const sensors = {
    'sensors/big-room/temperature': {
        type: 'Temperature',
        label: 'Big room',
    },
    'sensors/small-room/temperature': {
        type: 'Temperature',
        label: 'Small room',
    },
    'sensors/kitchen/temperature': {
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
