import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export interface WebsocketMessage {
  action: 'sub' | 'unsub';
  channel: 'stockPrices' | 'alerts';
}

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private _socket$!: WebSocketSubject<any>;
  
  get socket$(): Observable<any> {
    if(!this._socket$) {
      this.connect();
    }
    return this._socket$.asObservable();
  }
  
  connect() {
    if(!this._socket$ || this._socket$.closed) {
      this._socket$ = webSocket(`${environment.ws}`);
    }
  }

  sendMessage<T extends WebsocketMessage>(msg: T) {
    this._socket$.next(msg);
  }

  close() {
    this._socket$?.complete();
  }



  constructor() { }
}
