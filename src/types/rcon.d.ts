declare module 'rcon' {
  interface RconOptions {
    tcp?: boolean;
    challenge?: boolean;
    id?: number;
  }

  type Callback = (error: Error | null, response: string) => void;

  export default class Rcon {
    constructor(
      host: string,
      port: number,
      password: string,
      options?: RconOptions
    );

    connect(): void;
    disconnect(): void;
    send(
      data: string,
      cmd?: string,
      callback?: Callback
    ): void;

    on(
      event: 'auth' | 'response' | 'error' | 'end',
      listener: (...args: unknown[]) => void
    ): this;
  }
}