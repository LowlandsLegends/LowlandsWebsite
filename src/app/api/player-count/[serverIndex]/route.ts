// app/api/player-count/[serverIndex]/route.ts
import { NextResponse } from 'next/server';
import { RCONScheduler, playerCountData } from '@lib/rcon';

const latestPlayerdata = async (index: number): Promise<playerCountData> => {
    const timeLabel = new Date().toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23',
        timeZone: 'Europe/Amsterdam',
    });

    try {
        const scheduler = new RCONScheduler(index);
        await scheduler.connectRCON();
        const playerCount = await scheduler.getPlayerCount();
        return {
            time: timeLabel,
            playerCount: playerCount,
        };
    } catch (error) {
        console.log(error)
        return {
            time: timeLabel,
            playerCount: 0
        }
    }

};


export async function GET(
    request: Request,
    { params }: { params: { serverIndex: string } }
) {
    const serverIndex = parseInt(params.serverIndex, 10);

    if (isNaN(serverIndex) || serverIndex < 0 || serverIndex > 3) {
        return NextResponse.json({ error: 'Invalid server index' }, { status: 400 });
    }

    try {
        // Fetch data for the last 24 hours
        const data = await RCONScheduler.getLast24HoursData(serverIndex);

        // Create 6 time intervals over the last 24 hours
        const now = new Date();
        const intervals = 30;
        const intervalMs = (24 * 60 * 60 * 1000) / intervals; // Each interval is 4 hours
        const chartData = [];

        for (let i = 0; i < intervals; i++) {
            // Define the start and end time of the interval
            const startTime = new Date(now.getTime() - 24 * 60 * 60 * 1000 + i * intervalMs);
            const endTime = new Date(startTime.getTime() + intervalMs);

            // Filter data points within this interval
            const dataPointsInInterval = data.filter((dataPoint) => {
                const timestamp = new Date(dataPoint.timestamp).getTime();
                return timestamp >= startTime.getTime() && timestamp < endTime.getTime();
            });

            // Determine the playerCount for this interval
            let playerCount = 0;
            if (dataPointsInInterval.length > 0) {
                // Option 1: Use the latest player count in the interval
                playerCount = dataPointsInInterval[dataPointsInInterval.length - 1].playerCount;
            }

            // Format the time label (e.g., the midpoint of the interval)
            const timeLabel = new Date(startTime.getTime() + intervalMs / 2).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hourCycle: 'h23',
                timeZone: 'Europe/Amsterdam'
            });

            chartData.push({
                time: timeLabel,
                playerCount: playerCount,
            });
        }
        chartData.push(await latestPlayerdata(serverIndex));
        return NextResponse.json(chartData);
    } catch (error) {
        console.error('Error fetching player count data:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}