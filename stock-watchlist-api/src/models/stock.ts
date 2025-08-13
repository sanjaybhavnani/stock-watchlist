export interface Stock {
    symbol: string;
    name: string;
    lastClose: number;
}

export interface StockWithPrice extends Stock {
    price: number;
}