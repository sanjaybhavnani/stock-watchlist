import { WebSocket } from 'ws';
import { SocketChannels, SocketMessage } from '../socket.model';

export abstract class WsChannel {
  constructor(private _name: SocketChannels) {}

  abstract subscribe(ws: WebSocket, message: SocketMessage): void;
  abstract unsubscribe(ws: WebSocket): void;

  get name() {
    return this._name;
  }
}
