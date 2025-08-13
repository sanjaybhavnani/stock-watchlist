import { SocketChannels, SocketMessage } from './socket.model';
import { StocksChannel } from './channels/stocks-channel';
import { WsChannel } from './channels/ws-channel';

export class WsChannelFactory {
  static getChannel(channel: SocketChannels): WsChannel | null {
    switch (channel) {
      case SocketChannels.StockPrices:
        return StocksChannel.getInstance();
      default:
        return null;
    }
  }
}
