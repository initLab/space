import {mqtt} from "./config";
import {setSensor} from "./features/sensorSlice";
import {store} from "./app/store";
import {connect} from 'mqtt/dist/mqtt';
import {setState} from "./features/doorSlice.js";

const sensorTopics = mqtt.sensors.map(sensor => sensor.topic);
const doorStateTopics = mqtt.doorStates.map(state => state.topic);
const client = connect(mqtt.url);

client.on('connect', function () {
    sensorTopics.concat(doorStateTopics).forEach(function (topic) {
        client.subscribe(topic);
    });
});

client.on('message', function(topic, data, message) {
    if (sensorTopics.indexOf(topic) > -1) {
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
    }

    const doorState = mqtt.doorStates.filter(state => state.topic === topic).shift();

    if (doorState) {
        store.dispatch(setState({
            property: doorState.type,
            value: doorState.mapper(data.toString()),
        }));
    }
});
