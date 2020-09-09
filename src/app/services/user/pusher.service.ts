import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

declare const Pusher: any;

@Injectable()
export class PusherService {
  pusher: any;
  messagesChannel: any;

  constructor() {
    this.initializePusher();
  }

  initializePusher(): void {
    this.pusher = new Pusher(environment.pusher.key, {
      authEndpoint: 'https://pusher.com/pusher/auth',
      cluster: 'eu',
      encrypted: true,
    });

    this.messagesChannel = this.pusher.subscribe('chat');
  }
}
