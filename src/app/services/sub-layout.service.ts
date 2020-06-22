import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

export enum GridActions {
  Action = 'loading',
  Loaded = 0,
  Loading = 1,
  Empety = 2
}
interface BroadcastEvent {
  key: any;
  data?: any;
}

@Injectable()
export class SubLayoutService {

  private event: Subject<BroadcastEvent>;
  private keys: String[] = [];
  constructor(
    private router: Router
  ) {
    this.event = new Subject<BroadcastEvent>();
  }
  broadcast(key: any, data?: any) {
    this.event.next({ key, data });
  }
  on<T>(key: any, keys?: String[]): Observable<T> {

    this.keys = keys;
    return this.event.asObservable().filter(event => event.key === key).map(event => event.data as T);
  }
  get getKeys(): String[] {
    return this.keys || [];
  }
  addKeys(keys: String[]) {
    keys.forEach(key => {
      if (!this.keys.includes(key)) {
        this.keys.push(key);
      }
    });
  }
  removeKey(keys: String[]) {
    keys.forEach(key => {
      const keyIndex = this.keys.indexOf(key);
      if (keyIndex !== -1) { this.keys.splice(keyIndex, 1); }
    });
  }

}
