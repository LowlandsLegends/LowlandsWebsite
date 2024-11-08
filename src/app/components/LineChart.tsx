'use client';
import React from 'react';
import { LineChart, XAxis, YAxis, Line, ResponsiveContainer, Tooltip } from 'recharts';
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
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`/api/player-count/${serverIndex}`);
                const result = await response.json();
                setData(result);
                setIsLoading(false)
            } catch (error) {
                console.error('Error fetching player count data:', error);
            }
        }

        fetchData();
    }, [serverIndex]);
    
    if (isLoading) {
        return (
            <div className="flex justify-center items-center w-[100%] h-[100%]">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
            </div>
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


