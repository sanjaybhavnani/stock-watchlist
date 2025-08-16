import { signal, WritableSignal } from '@angular/core';
import { filter, Subject } from 'rxjs';
export type TrackerEvent =
  | { type: 'started' }
  | { type: 'success' }
  | { type: 'failed'; errorMessage: string | null };

export class APICallTracker {
  private _isRunning = signal(false);
  private _lastError: WritableSignal<string | null> = signal(null);
  private _trackerEvent = new Subject<TrackerEvent>();

  public isRunning = this._isRunning.asReadonly();
  public lastError = this._lastError.asReadonly();
  public trackerEvent$ = this._trackerEvent.asObservable();
  public callComplete$ = this._trackerEvent.pipe(
    filter(evt => evt.type === 'success' || evt.type === 'failed')
  )

  start() {
    this._trackerEvent.next({ type: 'started' });
    this._isRunning.set(true);
  }

  success(): void {
    this._trackerEvent.next({ type: 'success' });
    this._isRunning.set(false);
  }

  error(errorMessage: string | null): void {
    this._trackerEvent.next({ type: 'failed', errorMessage });
    this._lastError.set(errorMessage);
    this._isRunning.set(false);
  }
}
