import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface WebsocketMessage {
  action: 'sub' | 'unsub';
  channel: 'stockPrices' | 'alerts';
}

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private _socket$: Subject<any> = new Subject();
  public socket$ = this._socket$.asObservable();
  private websocket = new WebSocket(`${environment.ws}`);

  constructor() {
    this.websocket.onmessage = (evt) => {
      let messageJson;
      try {
        messageJson = JSON.parse(evt.data)
        this._socket$.next(messageJson);
      }catch(err) {
        console.error('invalid message data', evt.data)
      }
    }  
  }
  sendMessage<T extends WebsocketMessage>(msg: T) {
    this.websocket.send(JSON.stringify(msg));
  }

  close() {
    this.websocket.close();
  }
}
