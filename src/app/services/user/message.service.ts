import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/Rx';
import { PusherService } from './pusher.service';
import { WebApiService } from '../webApi.service';

export interface Message {
  text: string;
  user: string;
}
declare const Pusher: any;
@Injectable()
export class MessageService {
  messagesStream = new ReplaySubject<Message>(1);

  pusher: any;
  constructor(
    private pusherService: PusherService,
    private webApi: WebApiService
  ) {
    this.initialize();
  }

  initialize() {
    //RECIVE FROM PUSHER
    this.pusherService.messagesChannel.bind('send', (data) => {
      this.emitNewMessage({ text: data.data.content, user: 'Doaa' });
    });
  }

  sendapi(myparam) {
    return this.webApi.post(`/Chat/Send`, myparam);
  }

  send(message: Message) {
    this.pusherService.messagesChannel.trigger('client-new-message', message);
    this.emitNewMessage(message);
  }

  emitNewMessage(message) {
    this.messagesStream.next(message);
  }
}
