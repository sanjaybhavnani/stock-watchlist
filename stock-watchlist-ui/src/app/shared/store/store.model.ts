import { APICallTracker } from "./api-call";

export enum LoadingStatus {
    Idle = 'idle',
    Loading = 'loading',
    Complete = 'complete',
}

export interface StoreState<T, K> {
    data: T,
    params: K,
    
}