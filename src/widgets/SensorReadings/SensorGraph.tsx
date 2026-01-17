import {sensors} from "../../config.ts";
import EChartsReact from "echarts-for-react";
import {useState} from "react";
import {useTheme} from "../../hooks/useTheme.ts";
import type {MqttSensorHistory} from "../../portier-types";
import {useTranslation} from "react-i18next";

const round = (d: number, places: number = 2) => Math.round(d * Math.pow(10, places)) / Math.pow(10, places);

const SensorGraph = ({sensor, metrics}: { sensor: string, metrics: MqttSensorHistory }) => {
    const [now] = useState(() => Date.now());
    const [theme] = useTheme();
    const {t} = useTranslation();

    const temperature = metrics['sensor_temperature'];
    const humidity = metrics['sensor_humidity'];

    const matchedSensor = Object.keys(sensors).find(n => n.includes(sensor));
    const label = sensors[matchedSensor ?? ''].label ?? sensor;


    const yAxis = [];
    const series = [];


    if (temperature) {
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
            data: temperature.map(d => [d[0] * 1000, d[1]]),
            yAxisIndex: yAxis.length - 1,
            tooltip: {valueFormatter: (v: any) => `${round(v)} °C`}
        });
    }

    if (humidity) {
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
            data: humidity.map(d => [d[0] * 1000, d[1]]),
            yAxisIndex: yAxis.length - 1,
            tooltip: {valueFormatter: (v: any) => `${round(v)}%`}
        });

        return <EChartsReact theme={theme} option={{
            title: {text: t(`rooms.${label}`), left: 'left'},
            backgroundColor: 'transparent',
            tooltip: {
                trigger: 'axis'
            },
            color: ['#fac858', '#5470c6', '#91cc75', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
            legend: {type: 'plain', left: 'left'},
            xAxis: {type: 'time', max: now},
            grid: {left: 0, right: 0, top: 70, bottom: 70},
            yAxis: yAxis,
            series: series,
            animation: false,
        }}/>;
    }
}

export default SensorGraph;