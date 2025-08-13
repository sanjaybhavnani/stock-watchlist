import http from 'http';
import { WebSocketServer } from 'ws';
import { SocketChannels, SocketMessage } from './socket.model';
import { WsChannel } from './channels/ws-channel';
import { WsChannelFactory } from './ws-channel-factory';

export function socketServer(server: http.Server) {
  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws) => {
    const _channels: Map<string, WsChannel> = new Map();
    console.log('In ws.on("connection")');

    ws.on('message', (message) => {
      console.log('In ws.on("message")');
      // Convert message to JSON
      let messageJson: SocketMessage;
      try {
        messageJson = JSON.parse(message.toString());
      } catch (err) {
        console.error('Invalid message received');
        return;
      }

      // Try and get channel
      let channel = _channels.get(messageJson.channel) || null;
      if (!channel) {
        channel = WsChannelFactory.getChannel(messageJson.channel);
        channel && _channels.set(messageJson.channel, channel);
      }

      // process message if channel is found.
      if (channel !== null) {
        messageJson.action === 'sub'
          ? channel.subscribe(ws, messageJson)
          : channel.unsubscribe(ws);
      }
    });

    // Unsubscribe from all channel if client disconnects.
    ws.on('close', (code, reason) => {
      console.log(`[WsChannel] close code=${code} reason=${reason}`);
      console.error(new Error().stack);
      _channels.forEach((channel) => channel.unsubscribe(ws));
    });

    ws.on('error', (err) => {
      console.error('[WsChannel] error:', err);
    });
    // Send welcome message
    ws.send(JSON.stringify({ message: 'Welcome Stocks API Socket Server!' }));
  });
}
