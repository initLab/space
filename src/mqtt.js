import {mqtt} from "./config";
import {setSensor} from "./features/sensorSlice";
import {store} from "./app/store";
import {connect} from 'mqtt/dist/mqtt';

const topics = mqtt.sensors.map(sensor => sensor.topic);
const client = connect(mqtt.url);

client.on('connect', function () {
    topics.forEach(function (topic) {
        client.subscribe(topic);
    });
});

client.on('message', function(topic, data, message) {
    // Xiaomi BLE devices send data rarely (10 min), unlike the Espurna-based devices,
    // which can send data every 6 secs. It would be a better idea to just show the retained
    // measurements on page load, instead of waiting for a fresh one.
    //
    // if (message.retain) {
    //     return;
    // }
    store.dispatch(setSensor({
        topic,
        data: data.toString(),
        message: {
            ...message,
            payload: message.payload.toJSON(),
        },
    }));
});
