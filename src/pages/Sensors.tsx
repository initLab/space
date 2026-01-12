import {Col, Row} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {sensors} from '../config.ts';
import {useMqttHistory} from "../hooks/useEndpoints.ts";
import EChartsReact from "echarts-for-react";

const Sensors = () => {
    const {t} = useTranslation();
    const {data} = useMqttHistory();

    if(!data) return <></>;

    return <>
        <Row>
            <Col>
                <h2>{t('views.sensors.title')}</h2>
            </Col>
        </Row>
        <Row className="row-cols row-cols-1 row-cols-xxl-2">

            {Object.entries(data).map(([sensor, metrics]) => {

                const temperature = metrics['sensor_temperature'];
                const humidity = metrics['sensor_humidity'];

                const matchedSensor = Object.keys(sensors).find(n => n.includes(sensor));
                const label = sensors[matchedSensor??''].label ?? sensor;

                const yAxis = [];
                const series = [];

                const parse = (d: [number, number]):  [number, number] => [d[0]*1000, d[1]];

                if(temperature) {
                    yAxis.push({
                        name: t('views.sensors.temperature'),
                        type: 'value',
                        interval: 2.5,
                        axisLabel: {formatter: '{value} °C'},
                        min: (v: any) => Math.floor(v.min / 5) * 5,
                        max: (v: any) => Math.ceil(v.max / 5) * 5,
                    });
                    series.push({
                        name: t('views.sensors.temperature'),
                        type: 'line',
                        smooth: true,
                        symbol: 'none',
                        data: temperature.map(parse),
                        yAxisIndex: yAxis.length - 1,
                        tooltip: {valueFormatter: (v: any) => `${v} °C`}
                    });
                }
                if(humidity) {
                    yAxis.push({
                        name: t('views.sensors.humidity'),
                        type: 'value',
                        interval: 2.5,
                        axisLabel: {formatter: '{value} %'},
                        min: (v: any) => Math.floor(v.min / 5) * 5,
                        max: (v: any) => Math.ceil(v.max / 5) * 5,
                    });
                    series.push({
                        name: t('views.sensors.humidity'),
                        type: 'line',
                        smooth: true,
                        symbol: 'none',
                        data: humidity.map(parse),
                        yAxisIndex: yAxis.length - 1,
                        tooltip: {valueFormatter: (v: any) => `${v} %`}
                    });
                }


                    return <Col key={sensor}><EChartsReact option={{
                        title: {text: t(`rooms.${label}`), left: 'left'},
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {type: 'plain', left: 'left'},
                        xAxis: {type: 'time',max:Date.now()},
                        grid: { left: 0, right: 0, top: 70, bottom: 70 },
                        yAxis: yAxis,
                        series: series,
                        animation: false,
                    }}/></Col>;
                }
            )}
        </Row>
    </>;
};

export default Sensors;
