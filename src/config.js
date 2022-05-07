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
