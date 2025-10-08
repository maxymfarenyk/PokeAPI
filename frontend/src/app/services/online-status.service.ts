import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, fromEvent, merge, startWith, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OnlineStatusService {
  readonly isOnline$ = new BehaviorSubject<boolean>(navigator.onLine);

  constructor(zone: NgZone) {
    zone.runOutsideAngular(() => {
      const online$ = fromEvent(window, 'online').pipe(map(() => true));
      const offline$ = fromEvent(window, 'offline').pipe(map(() => false));

      merge(online$, offline$)
        .pipe(startWith(navigator.onLine))
        .subscribe(v => zone.run(() => this.isOnline$.next(v)));
    });
  }
}
