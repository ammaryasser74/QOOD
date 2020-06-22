import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { RequestEventComponent } from './request-event/request-event.component';

@Component({
  selector: 'app-book-event',
  templateUrl: './book-event.component.html',
  styleUrls: ['./book-event.component.css']
})
export class BookEventComponent implements OnInit {

  constructor(private modalService: BsModalService, ) { }

  ngOnInit() {

  }
requestEvent() {
  this.modalService.show(RequestEventComponent);
}
}
