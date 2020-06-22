import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  swRegistration;

  constructor(
    private http: HttpClient,
    private swPush: SwPush,
    private swUpdate: SwUpdate
  ) {}

  ngOnInit() {
    this.listenToEvents();
    this.checkForUpdate();
    this.swUpdate.available.subscribe(event => {
      console.log('New update available');
      this.updateToLatest();
    });
    if (Notification.permission === 'denied') {
      console.log('Permission denied');
    }
  }

  listenToEvents() {
    this.swPush.messages.subscribe(message => {
      console.log({ message });
    });
  }

  checkForUpdate() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate
        .checkForUpdate()
        .then(() => {
          console.log('Checking for updates...');
        })
        .catch(err => {
          console.error('Error when checking for update', err);
        });
    }
  }
  updateToLatest(): void {
    console.log('Updating to latest version.');
    this.swUpdate.activateUpdate().then(() => document.location.reload());
  }
}
