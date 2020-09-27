import { Component, OnInit } from '@angular/core';
import {
  MessageService,
  Message,
} from '../../../services/user/message.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  messages: Array<Message>;
  message: any;
  items: Observable<any[]>;
  constructor(
    private messageService: MessageService,
    firestore: AngularFirestore
  ) {
    this.messages = [];
    this.items = firestore.collection('users').valueChanges();
  }

  ngOnInit() {
    this.messageService.messagesStream.subscribe(
      this.newMessageEventHandler.bind(this)
    );
  }
  newMessage(text: string, user: string): void {
    this.messageService.send({ text: text, user: user });

    this.messageService.sendapi({message: text, to_user: 2}).subscribe(res=>{console.log(res,"LLL");
    });

    this.message = '';
  }
  private newMessageEventHandler(event: Message): void {
    this.messages.push(event);
  }
}
