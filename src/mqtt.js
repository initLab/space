import { mqtt } from './config';
import { store } from './app/store';
import { connect } from 'precompiled-mqtt';
import { setState } from './features/doorSlice.js';

const doorStateTopics = mqtt.doorStates.map(state => state.topic);
const client = connect(mqtt.url);

client.on('connect', function () {
    doorStateTopics.forEach(function (topic) {
        client.subscribe(topic);
    });
});

client.on('message', function (topic, data) {
    data = data.toString();

    const doorState = mqtt.doorStates.filter(state => state.topic === topic).shift();

    if (doorState) {
        store.dispatch(setState({
            property: doorState.type,
            value: doorState.mapper(data),
        }));
    }
});
