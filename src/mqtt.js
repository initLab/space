import { mqtt } from './config';
import { setSensor } from './features/sensorSlice';
import { store } from './app/store';
import { connect } from 'precompiled-mqtt';
import { setState } from './features/doorSlice.js';

const sensorTopics = mqtt.sensors.map(sensor => sensor.topic);
const doorStateTopics = mqtt.doorStates.map(state => state.topic);
const client = connect(mqtt.url);

client.on('connect', function () {
    sensorTopics.concat(doorStateTopics).forEach(function (topic) {
        client.subscribe(topic);
    });
});

client.on('message', function (topic, data, message) {
    data = data.toString();

    if (sensorTopics.indexOf(topic) > -1) {
        const {
            timestamp,
            value,
        } = JSON.parse(data);

        store.dispatch(setSensor({
            topic,
            timestamp,
            value,
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
            value: doorState.mapper(data),
        }));
    }
});
