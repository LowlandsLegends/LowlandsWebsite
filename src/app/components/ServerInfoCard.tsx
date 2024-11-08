'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Swords, Shield } from "lucide-react"
import LineChartComponent from "./LineChart"
import Graph from '@images/Graph.svg'
import { useEffect, useState } from "react"

interface ServerInfoProps {
	serverName: string
	serverIp: string
	gamemode: "pvp" | "pve"
	playerCount: Promise<number> | number
	isOnline: Promise<boolean> | boolean
	upTime: number
	serverIndex: number
}

export interface ChartDataPoint {
	time: string;
	playerCount: number;
}

const StatusIndicator = ({ isOnline }: { isOnline: Promise<boolean> | boolean }) => (
	<div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`} />
)

export default function ServerInfoCard({
	serverName = "Awesome Server",
	serverIp = "123.456.789.0",
	gamemode = "pvp",
	isOnline,
	upTime = 99,
	serverIndex,
}: ServerInfoProps) {
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

		/** const interval = setInterval(fetchData, 60000);

		return () => clearInterval(interval); **/
	}, [serverIndex]);
	return (
		<Card className="w-full max-w-md overflow-hidden p-1">
			<CardHeader className="pb-0">
				<div className="flex items-center justify-between">
					<CardTitle className="text-xl font-bold">{serverName}</CardTitle>
					<StatusIndicator isOnline={isOnline} />
				</div>
			</CardHeader>
			<CardContent className="pt-4 h-fit">
				<div className="aspect-video w-full mb-3 overflow-hidden rounded-md h-[150px]">
					<LineChartComponent serverIndex={serverIndex} data={data} isLoading={isLoading} />
				</div>
				<div className="grid grid-cols-2 gap-4 mr-0 pb-0 mb-0 justify-center items-center">
					<div className="flex items-center text-white">
						<div className="mr-1 text-white">IP:</div>
						<div className="font-small">{serverIp}</div>
					</div>
					<div className="flex items-center text-white">
						<div className="mr-1 text-white pl-3">Gamemode:</div>
						<div className="font-small flex items-center">
							{gamemode === "pvp" ? (
								<Swords className="w-4 h-4 mr-1 " />
							) : (
								<Shield className="w-4 h-4 mr-1 " />
							)}
							{gamemode.toUpperCase()}
						</div>
					</div>
					<div className="flex items-center text-white">
						<Users className="w-5 h-5 mr-1 text-white" />
						{Array.isArray(data) && data.length > 0 ? data[data.length - 1].playerCount : 0} players online
					</div>
					<div className="flex items-center text-white">
						<div className="mr-1 text-white pl-3">Uptime: </div>
						<div className="flex col-span-1 items-center">
							<Graph className="w-5 h-5 mr-2 " /> {upTime}%
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}