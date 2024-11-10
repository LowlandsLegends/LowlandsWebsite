'use client';
import React from 'react';
import { LineChart, XAxis, YAxis, Line, ResponsiveContainer, Tooltip } from 'recharts';
import { ChartDataPoint } from './ServerInfoCard';
import Loading from './ui/Loading';


interface LineChartComponentProps {
    serverIndex: number;
    data: ChartDataPoint[];
    isLoading: boolean
}

export default function LineChartComponent({ data, isLoading }: LineChartComponentProps) {
    if (isLoading) {
        return (
            <Loading />
        );
    }
    {
        return (
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 10,
                        right: 10,
                        left: 30,
                        bottom: 10,
                    }}
                >
                    <YAxis dataKey='playerCount' width={0.5} stroke='#ffffff' tick={{ fontSize: 10, fill: '#ffffff' }} />
                    <XAxis dataKey='time' height={12} width={100} stroke='#ffffff' tick={{ fontSize: 10, fill: '#ffffff' }} />
                    <Line
                        type="monotone"
                        dataKey="playerCount"
                        stroke="#ffffff"
                        dot={false}
                        isAnimationActive={true}
                        animateNewValues={true}
                        animationEasing="linear"
                        strokeWidth={2}
                    />
                    <Tooltip
                        formatter={(value) => [`${value}`, `Player Count`]}
                        contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: '#fff' }}
                    />
                </LineChart>
            </ResponsiveContainer>
        );
    }
}


