import {Card, Col, Container, Row} from 'react-bootstrap';

import {useDateTimeFormatter} from '../../utils/useDateTimeFormatter.ts';

import './SensorPanel.css';
import {useMemo, useState} from 'react';
import type {MqttReading} from "../../types";

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

function temperatureState(temperature: number = 0) {
    return temperatureThresholds.filter(threshold => threshold < temperature).length;
}

const SensorReadingValue = (
    {isCurrent, timestamp, value}: { isCurrent: boolean, timestamp: string, value: any }) =>
    <span
        className={'huge' + (isCurrent ? '' : ' text-decoration-line-through')}
        title={timestamp}>
        {value}
    </span>;

// function readingValid(reading: MqttReading) {
//     return Object.prototype.hasOwnProperty.call(units, type) && isValid(reading.timestamp) && typeof reading.value === 'number';
// }


const SensorPanel = ({label, readings}: MqttReading) => {
        const {formatDefault, formatDistanceToNow} = useDateTimeFormatter();

        const formatTimestampDate = (ts: Date) => `${formatDefault(ts)} (${formatDistanceToNow(ts)})`;
        const formatTimestamp = (ts: number) => formatTimestampDate(new Date(ts));

    const formatTemperature = (t: number) => Math.round(t) + '°C'
    const formatHumidity = (h: number) => Math.round(h) + '%'
        const [loadTime] = useState<number>(Date.now);

        // console.log(label, readings);

        const values = useMemo(() => {
            const lastValue = Math.max(...Object.values(readings).map(x => x.timestamp));
            const readingAge = loadTime - lastValue;
            const {temperature, humidity, battery} = readings;

            return {
                isCurrent: readingAge <= 2 * MS_TO_H,
                isVisible: readingAge <= 24 * MS_TO_H,
                temperature, humidity, battery,
            }
        }, [loadTime, readings]);

        if (Object.keys(values).length < 1) {
            return null;
        }

        return (<Col>
            <Card bg="primary" text={values.isCurrent ? 'white' : 'secondary'}>
                <Card.Body>
                    <Container>
                        <Row>
                            <Col xs={3}>
                                {values.temperature &&
                                    <i className={'fa-solid fa-5x fa-thermometer-' + temperatureState(values.temperature.value)}/>
                                }
                            </Col>
                            <Col xs={9} className="text-end">
                                <div className="huge">
                                    {values.temperature &&
                                        <SensorReadingValue
                                            value={formatTemperature(values.temperature.value)}
                                            timestamp={formatTimestamp(values.temperature.timestamp)}
                                            isCurrent={values.isCurrent}
                                        />}
                                    {values.temperature && values.humidity && ' '}
                                    {values.humidity &&
                                        <SensorReadingValue
                                            value={formatHumidity(values.temperature.value)}
                                            timestamp={formatTimestamp(values.humidity.timestamp)}
                                            isCurrent={values.isCurrent}
                                        />}
                                </div>
                                <div>
                                    {values.battery &&
                                        <i className={'fa-solid fa-battery-' + batteryState(values.battery.value)}
                                           title={formatTimestamp(values.battery.timestamp)}
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
