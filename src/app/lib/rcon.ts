// lib/rcon.ts
import { Rcon } from 'rcon-client';

export class RCONScheduler {
    index: number;
    credentials: { rcon_ip: string | undefined; rcon_pw: string | undefined } = {
        rcon_ip: process.env.RCON_IP,
        rcon_pw: process.env.RCON_PASSWORD,
    };
    rconClient: Rcon | undefined;

    servers: Array<{ index: number; name: string; port: number }> = [
        { index: 0, name: "The Island", port: 7779 },
        { index: 1, name: "The Center", port: 7791 },
        { index: 2, name: "Scorched Earth", port: 7782 },
        { index: 3, name: "Aberration", port: 7788 },
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

        const server = this.servers.find((srv) => srv.index === this.index);

        if (!server) {
            throw new Error(`No server found with index ${this.index}.`);
        }

        try {
            this.rconClient = await Rcon.connect({
                host: this.credentials.rcon_ip,
                port: server.port,
                password: this.credentials.rcon_pw,
            });

            console.log(`RCON Authenticated for server: ${server.name}`);
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
            console.log(`Command "${command}" executed successfully. Response: ${response}`);
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
            console.log('Player List:', playerList);

            if (!playerList) return 0;

            // Split the player list by newlines to count the number of players
            const lines = playerList.split(/\r?\n/).filter(line => line.trim() !== '');
            const playerCount = lines.length;

            console.log(`Player Count: ${playerCount}`);
            return playerCount;
        } catch (error) {
            console.error('Failed to retrieve player list:', error);
            return 0;
        }
    }
}