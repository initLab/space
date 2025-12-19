import {Col, Row} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';

import {sensors} from '../../config.ts';
import SensorPanel from './SensorPanel.tsx';
import {useMqttStatus} from '../../hooks/useEndpoints.ts';
import LoadingIcon from '../LoadingIcon.tsx';
import ErrorMessage from '../ErrorMessage.tsx';
import {useMemo} from 'react';
import type {MqttReading} from "../../types";

declare global {
    interface Array<T> {
        mapToObj<TK, TV>(kf: (x: T) => TK, vf: (x: T) => TV): { [k in TK as string]: TV }
    }
}

Array.prototype.mapToObj = function <T, TK, TV>(kf: (x: T) => TK, vf: (x: T) => TV): { [k in TK as string]: TV } {
    return Object.fromEntries(this.map(x => [kf(x), vf(x)]));
}

const SensorReadings = () => {
        const {t} = useTranslation();

        const {
            data: mqttStatus = {},
            error,
            isLoading,
        } = useMqttStatus({
            refreshInterval: 60_000,
        });

        const sensorReadings = useMemo<MqttReading[]>(() => {
            const results = [];
            for (const [topic, config] of Object.entries(sensors)) {
                const readings = Object.entries(mqttStatus)
                    .filter(([t]) => t.startsWith(topic))
                    // const values = readings.mapToObj((t,r) => [t.substring(topic.length + 1), r])
                    .mapToObj(
                        ([t]) => t.substring(topic.length + 1),
                        ([, r]) => r
                    );
                results.push({label: config.label, readings: readings});
            }
            return results;
        }, [mqttStatus]);

        return (<>
            <Row>
                <Col>
                    <h3>{t('views.dashboard.sensor_readings')}</h3>
                </Col>
            </Row>
            {isLoading && <Row>
                <Col className="text-center">
                    <LoadingIcon large/>
                </Col>
            </Row>}
            {error && <Row>
                <Col>
                    <ErrorMessage error={error}/>
                </Col>
            </Row>}
            {mqttStatus && <Row className="row-cols-1 row-cols-md-2 row-cols-xxl-4 g-3">
                {sensorReadings.map(sensorReading =>
                    <SensorPanel key={sensorReading.label} {...sensorReading} />
                )}
            </Row>}
        </>);
    }
;

export default SensorReadings;
