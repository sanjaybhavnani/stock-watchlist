import { Stock } from "./stock";

export interface Watchlist {
    id: string;
    name: string;
    stocks: Stock[]
}
