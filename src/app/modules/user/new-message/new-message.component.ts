import { Component } from '@angular/core';
import { MessageService,Message } from '../../../services/user/message.service';


@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.scss']
})
export class NewMessageComponent {
  user: string;
  message: string;

  constructor(private messageService: MessageService) { }

  newMessage(text: string, user: string): void {
    
    this.messageService.sendapi({message: text, to_user: 2}).subscribe(res=>{console.log(res,"LLL");
    });

    this.message = '';
  }

}
