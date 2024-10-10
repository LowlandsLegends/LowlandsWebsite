import Rcon from 'rcon';



export class RCONScheduler {
    //TODO: Create scheduler

    index: number;
    credentials: { rcon_ip: string | undefined, rcon_pw: string | undefined } = { rcon_ip: process.env.RCON_IP, rcon_pw: process.env.RCON_PASSWORD }
    rconClient: Rcon | undefined;

    servers: Array<{ index: number, name: string, port: number }> = [
        { index: 0, name: "The island", port: 7779 },
        { index: 1, name: "The Center", port: 7791 },
        { index: 2, name: "Scorched Earth", port: 7782 },
        { index: 3, name: "Abberation", port: 7788 }
    ]

    constructor(index: number) {
        this.index = index
        this.connectRCON();
    }

    //connects and authenticated RCON client on gameserver
    connectRCON() {
        if (this.credentials.rcon_ip || this.credentials.rcon_pw == undefined) {
            console.error('RCON IP or Password not SET')
            return;
        }

        const server = this.servers.find((server) => server.index === this.index);

        if (!server) {
            console.error(`No server found with index ${this.index}`);
            return;
        }

        const port: number = server.port;
        this.rconClient = new Rcon(this.credentials.rcon_ip as string, port, this.credentials.rcon_pw)

        this.rconClient.on('auth', () => {
            console.log(`RCON Authenticated; ${server.name}`)
        })
    }

    executeRconCommand(command:string){
        if (this.rconClient == undefined){
            console.error('rcon client not initiliazed properly')
            return;
        }
        this.rconClient.send(command)
        this.rconClient.on('response', (response) => {
            console.log(response)
        })
    }

    //exits the rcon connection
    exitRCON(){
        this.exitRCON()
    }
}