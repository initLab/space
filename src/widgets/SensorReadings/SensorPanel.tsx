import {Card, Col, Container, Row} from 'react-bootstrap';

import {useDateTimeFormatter} from '../../utils/useDateTimeFormatter.ts';

import './SensorPanel.css';
import {useMemo, useState} from 'react';
import type {MqttReading} from "../../types";
import type {RawMqttReading} from "../../portier-types";

const temperatureThresholds = [18, 24, 26, 32];

const MS_TO_H = 1000 * 60 * 60;

/**
 * @see https://fontawesome.com/search?q=battery&o=r&m=free
 **/
function batteryState(level?: number) {
    if (!level) return undefined;
    if (level >= 100) return 5;
    if (level >= 75) return 4;
    if (level >= 50) return 3;
    if (level >= 25) return 2;
    // show full by default
    return 5;
}

function isCurrent(now: number, readingTime: number): boolean {
    return now - readingTime <= 2 * MS_TO_H;
}

function isVisible(now: number, readingTime: number): boolean {
    return now - readingTime <= 24 * MS_TO_H;
}

function temperatureState(temperature: number = 0) {
    return temperatureThresholds.filter(threshold => threshold < temperature).length;
}

const SensorReadingValue = ({reading, valueFormat}: {
    reading: RawMqttReading,
    valueFormat: (v: any) => string
}) => {
    const {formatTimestamp} = useDateTimeFormatter();
    const [loadTime] = useState<number>(Date.now);


    return <span
        className={'huge' + (isCurrent(loadTime, reading.timestamp) ? '' : ' text-decoration-line-through')}
        title={formatTimestamp(reading.timestamp)}>
        {valueFormat(reading.value)}
    </span>;
}

const SensorPanel = ({label, readings}: MqttReading) => {

        const formatTemperature = (t: number) => Math.round(t) + '°C'
        const formatHumidity = (h: number) => Math.round(h) + '%'
        const [loadTime] = useState<number>(Date.now);
        const {formatTimestamp} = useDateTimeFormatter();

        // console.log(label, readings);

        const state = useMemo(() => {
            const lastTimestamp = Math.max(...Object.values(readings).map(x => x.timestamp));

            return {
                lastTimestamp: lastTimestamp,
                readings
            }
        }, [readings]);

        if (Object.keys(state).length < 1) {
            return null;
        }

        if (!isVisible(loadTime, state.lastTimestamp)) return <></>;

        return (<Col>
            <Card bg="primary" text={isCurrent(loadTime, state.lastTimestamp) ? 'white' : 'secondary'}>
                <Card.Body>
                    <Container>
                        <Row>
                            <Col xs={3}>
                                {state.readings.temperature &&
                                    <i className={'fa-solid fa-5x fa-thermometer-' + temperatureState(state.readings.temperature.value)}/>
                                }
                            </Col>
                            <Col xs={9} className="text-end">
                                <div className="huge">
                                    {state.readings.temperature &&
                                        <SensorReadingValue
                                            reading={state.readings.temperature}
                                            valueFormat={formatTemperature}
                                        />}
                                    {state.readings.temperature && state.readings.humidity && ' '}
                                    {state.readings.humidity &&
                                        <SensorReadingValue
                                            reading={state.readings.humidity}
                                            valueFormat={formatHumidity}
                                        />}
                                </div>
                                <div>
                                    {state.readings.battery &&
                                        <i className={'fa-solid fa-battery-' + batteryState(state.readings.battery.value)}
                                           title={formatTimestamp(state.readings.battery.timestamp)}
                                        />} {' '}
                                    {label}
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
        </Col>);
    }
;


export default SensorPanel;
