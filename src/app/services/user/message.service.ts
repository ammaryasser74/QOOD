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
    debugger
    this.emitNewMessage( {text: "DODO", user: "asd"});
    
     //RECIVE FROM PUSHER
  let pusher = new Pusher('2bdb1c457286cdef1545', {
    cluster: 'eu',
    encrypted: true
  });
  var channel = pusher.subscribe('chat');
  
    
  channel.bind('send', function (data) {
    console.log(data, "LLL");
    this.messagesStream.push( {text: "DODO2", user: "asd"});
    // this.emitNewMessage({text:data.data.content,user:"Doaa"});

  });
    // this.pusherService.messagesChannel.bind('client-new-message', (message) => {
    //   this.emitNewMessage(message);
    // });
  }
  sendapi(myparam){
    return this.webApi.post(`/Chat/Send`, myparam);
  }
  send(message: Message) {
    console.log(message);
    
    this.pusherService.messagesChannel.trigger('client-new-message', message);
    this.emitNewMessage(message);
  }

  emitNewMessage(message) { 
    this.messagesStream.next(message);
  }

}
