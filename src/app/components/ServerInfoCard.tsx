'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Swords, Shield} from "lucide-react"
import LineChartComponent from "./LineChart"
import Graph from '@images/Graph.svg'

interface ServerInfoProps {
	serverName: string
	serverIp: string
	gamemode: "pvp" | "pve"
	playerCount: Promise<number> | number
	isOnline: boolean
	upTime: number
	serverIndex: number
}

const StatusIndicator = ({ isOnline }: { isOnline: boolean }) => (
	<div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`} />
)

export default function ServerInfoCard({
	serverName = "Awesome Server",
	serverIp = "123.456.789.0",
	gamemode = "pvp",
	playerCount = 42,
	isOnline = true,
	upTime = 99,
	serverIndex
}: ServerInfoProps) {
	return (
		<Card className="w-full max-w-md overflow-hidden p-1">
			<CardHeader className="pb-0">
				<div className="flex items-center justify-between">
					<CardTitle className="text-2xl font-bold">{serverName}</CardTitle>
					<StatusIndicator isOnline={isOnline} />
				</div>
			</CardHeader>
			<CardContent className="pt-4">
				<div className="aspect-video w-full mb-4 overflow-hidden rounded-md">
					<LineChartComponent serverIndex={serverIndex} />
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div className="flex items-center">
						<div className="mr-2 text-muted-foreground text-white">IP:</div>
						<div className="font-medium">{serverIp}</div>
					</div>
					<div className="flex items-center">
						<div className="mr-2 text-muted-foreground text-white">Gamemode:</div>
						<div className="font-medium flex items-center">
							{gamemode === "pvp" ? (
								<Swords className="w-4 h-4 mr-1 " />
							) : (
								<Shield className="w-4 h-4 mr-1 " />
							)}
							{gamemode.toUpperCase()}
						</div>
					</div>
					<div className="flex items-center">
						<Users className="w-5 h-5 mr-2 text-muted-foreground text-white" />
						<div className="font-medium">{playerCount} players online</div>
					</div>
					<div className="flex items-center">
						<div className="mr-2 text-muted-foreground text-white">Uptime: </div>
						<div className="flex col-span-1 items-center">
							<Graph className="w-5 h-5 mr-2 text-muted-foreground" /> {upTime}%
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}