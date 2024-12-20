// lib/rcon.ts
import { Rcon } from 'rcon-client';
import { supabaseAdmin } from './supabaseClient';

export class RCONScheduler {
    index: number;
    credentials: { rcon_ip: string | undefined; rcon_pw: string | undefined } = {
        rcon_ip: process.env.RCON_IP,
        rcon_pw: process.env.RCON_PASSWORD,
    };
    rconClient: Rcon | undefined;

    static servers: Array<{ index: number; name: string; port: number }> = [
        { index: 0, name: "The Island", port: 7779 },
        { index: 1, name: "Abberation", port: 7788 },
        { index: 2, name: "Extinction", port: 7791 }
    ];


    /**
     * @constructor
     * @param index 0=Island, 1=Center, 2=Scorched Earth, 3=Aberration
     */
    constructor(index: number) {
        this.index = index;
    }

    // Connects and authenticates the RCON client
    async connectRCON(): Promise<void> {
        if (!this.credentials.rcon_ip || !this.credentials.rcon_pw) {
            throw new Error('RCON IP or Password not set.');
        }

        const server = RCONScheduler.servers.find((srv) => srv.index === this.index);

        if (!server) {
            throw new Error(`No server found with index ${this.index}.`);
        }

        try {
            this.rconClient = await Rcon.connect({
                host: this.credentials.rcon_ip,
                port: server.port,
                password: this.credentials.rcon_pw,
            });

            //console.log(`RCON Authenticated for server: ${server.name}`);
        } catch (error) {
            console.error(`Failed to connect to RCON for server: ${server.name}`, error);
            throw error;
        }
    }

    // Executes an RCON command and returns the response
    async executeRconCommand(command: string): Promise<string> {
        if (!this.rconClient) {
            throw new Error('RCON client not initialized.');
        }

        try {
            const response = await this.rconClient.send(command);
            //console.log(`Command "${command}" executed successfully. Response: ${response}`);
            return response;
        } catch (error) {
            console.error(`Error executing command "${command}":`, error);
            throw error;
        }
    }

    // Retrieves the player count by executing the 'listplayers' command
    async getPlayerCount(): Promise<number> {
        try {
            const playerList: string = await this.executeRconCommand('listplayers');


            if (playerList.includes('No')) return 0;

            if (!playerList) return 0;

            // Split the player list by newlines to count the number of players
            const lines = playerList.split(/\r?\n/).filter(line => line.trim() !== '');
            const playerCount = lines.length;

            //console.log(`Player Count: ${playerCount}`);
            return playerCount;
        } catch (error) {
            console.error('Failed to retrieve player list:', error);
            return 0;
        }
    }

    async storePlayerCount(playerCount: number): Promise<void> {
        const timestamp = new Date().toISOString();

        const { error } = await supabaseAdmin.from('player_counts').insert([
            {
                server_index: this.index,
                timestamp,
                player_count: playerCount,
            },
        ]);

        if (error) {
            console.error('Error inserting player count into Supabase:', error);
            throw error;
        }

        console.log('Player count stored in Supabase:', {
            serverIndex: this.index,
            timestamp,
            playerCount,
        });
    }

    static async getLast24HoursData(serverIndex: number): Promise<Array<{ timestamp: string; playerCount: number }>> {
        const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

        const { data, error } = await supabaseAdmin
            .from('player_counts')
            .select('timestamp, player_count')
            .eq('server_index', serverIndex)
            .gte('timestamp', since)
            .order('timestamp', { ascending: true });

        if (error) {
            console.error('Error fetching player counts from Supabase:', error);
            throw error;
        }

        return data!.map((row) => ({
            timestamp: row.timestamp,
            playerCount: row.player_count,
        }));
    }

    static async sendChatToAllServers(message: { server_index: number; username: string; message: string }){
        this.servers.forEach(async (obj) => {
            const server = new RCONScheduler(obj.index);
            try{
                await server.connectRCON()
                server.executeRconCommand(`serverchat Web [${message.username}] : ${message.message} `)
            } catch (error){
                console.log(error)
                throw error
            }
                
        });
    }
}

export interface playerCountData {
    time: string
    playerCount: number
}