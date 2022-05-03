export interface IPeerJs {
  connections: any;
  destroyed: boolean;
  disconnected: boolean;
  id: string;
  open: boolean;
  options: {
    config: { iceServers: any[]; sdpSemantics: string };
    debug: number;
    host: string;
    key: string;
    path: string;
    port: number;
    secure: boolean;
    token: string;
  };
  socket: WebSocket;
  on(
    event:
      | 'signal'
      | 'stream'
      | 'connect'
      | 'open'
      | 'call'
      | 'data'
      | 'track'
      | 'close'
      | 'error',
    fn: {
      (param1?: any, param2?: any): void;
    }
  ): void;
  call(id: string, stream: MediaStream, options?: any): any;
}
