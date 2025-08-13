
export enum LoadingStatus {
    Idle = 'idle',
    Loading = 'loading',
    Complete = 'complete'
}

export interface StoreState<T, K> {
    status: LoadingStatus;
    errorMessage: string;
    data: T,
    params: K
}
