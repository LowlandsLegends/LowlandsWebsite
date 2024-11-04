'use client';
import React from 'react';
import { LineChart, XAxis, YAxis, Line, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';

interface ChartDataPoint {
    time: string;
    playerCount: number;
}

interface LineChartComponentProps {
    serverIndex: number;
}

export default function LineChartComponent({ serverIndex }: LineChartComponentProps) {
    const [data, setData] = useState<ChartDataPoint[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`/api/player-count/${serverIndex}`);
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching player count data:', error);
            }
        }

        fetchData();

        // Optionally, refresh data periodically
        const interval = setInterval(fetchData, 60000); // Every minute

        return () => clearInterval(interval); // Clean up on unmount
    }, [serverIndex]);
    console.log(data)
    {
        return (
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 30,
                        bottom: 10,
                    }}
                >

                    <YAxis dataKey='playerCount' width={0.5} stroke='#ffffff' tick={{ fontSize: 10, fill: '#ffffff' }} />
                    <XAxis dataKey='time' height={12} stroke='#ffffff' tick={{ fontSize: 10, fill: '#ffffff' }} />
                    <Line type="natural" dataKey="playerCount" stroke="#ffffff" />
                </LineChart>
            </ResponsiveContainer>
        );
    }
}


