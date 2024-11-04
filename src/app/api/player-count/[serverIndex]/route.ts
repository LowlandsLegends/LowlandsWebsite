// app/api/player-count/[serverIndex]/route.ts
import { NextResponse } from 'next/server';
import { RCONScheduler } from '@lib/rcon';

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

        // Format each timestamp to local time and filter within the last 24 hours
        const now = Date.now();
        const chartData = data
            .filter((dataPoint) => now - new Date(dataPoint.timestamp).getTime() <= 24 * 60 * 60 * 1000)
            .map((dataPoint) => ({
                time: new Date(dataPoint.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                }),
                playerCount: dataPoint.playerCount,
            }));
            console.log(chartData)
        return NextResponse.json(chartData);
    } catch (error) {
        console.error('Error fetching player count data:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}