export interface Stock {
    symbol: string;
    name: string;
}

export interface StockWithPrice extends Stock {
    price: number;
}