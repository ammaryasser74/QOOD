import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { BanKAccountService } from 'src/app/services/chief/bank-account.service';
import { UserService } from 'src/app/services/user/user.service';
import { LanguageService } from 'src/app/services/language.service';
import { KitchenService, OrderFilter } from 'src/app/services/chief/kitchen.service';
import { MenuService } from 'src/app/services/chief/menu.service';
import { BsModalService } from 'ngx-bootstrap';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import listDayPlugin from '@fullcalendar/list';
import { OrderModalDetailsComponent } from './order-modal-details/order-modal-details.component';
import { initialState } from 'ngx-bootstrap/timepicker/reducer/timepicker.reducer';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

  export class DashboardComponent implements OnInit {
    constructor( private banKAccountService: BanKAccountService,
                 private userService: UserService,
                 private menuService: MenuService,
                 private kitchenService: KitchenService,
                 private modalService: BsModalService,
                 public languageService: LanguageService ) { }
    walletData: any = [];
    events: any;
    orders: any = [];
    Days: any = [];
    myOrderParam: any;
    menus: any;
    day_id = 0;
    filter: OrderFilter = {ChiefID: this.userService.currentUser.chief_id, StartDate: new Date(), EndDate: new Date()};
      options: any;
  calendarPlugins = [timeGridPlugin, dayGridPlugin, listDayPlugin];
    public barChartOptions: ChartOptions = {
        scales: {
          xAxes: [{
            gridLines: {
              color: 'rgba(171,171,171,1)',
              lineWidth: 1
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              max: 100,
              min: 0,
              stepSize: 10
            },
            gridLines: {
              color: 'rgba(171,171,171,1)',
              lineWidth: 1
            }
          }]
        },
        responsive: true
    };

    lineChartColors: Color[] = [
      {
        borderColor: 'black',
        backgroundColor: 'green',
      },
    ];

    public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    public barChartType: ChartType = 'bar';
    public barChartLegend = true;
    public barChartPlugins = [];

    public barChartData: ChartDataSets[] = [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
      // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
    ];
  openNewEvent() {
    const modalRef = this.modalService.show(OrderModalDetailsComponent);
  }
  handleDateClick(event) {
    const modalRef = this.modalService.show(OrderModalDetailsComponent, {initialState:
      {OrderID: event.event._def.publicId, Data: event.event._def.extendedProps}});
  }
    ngOnInit() {
      this.options = {
        left: 'prev,next today myCustomButton',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listDay'
  };
      // wallet
      this.banKAccountService.GetTransactionTotal(this.userService.currentUser.chief_id).subscribe(res => {if (res.Data) {this.walletData = res.Data; }});
      // order
      this.getOrder();
      this.getallOrder();
      // menu
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const d = new Date();
      const dayName = days[d.getDay()];
      this.kitchenService.Days().subscribe(res => {
        this.Days = res.Data;
        this.day_id = this.Days.find(i => i.en_name == dayName).id;
        this.getMenus(this.day_id);
      });
    }
  getMenus(DayID) {
      this.myOrderParam = {chief_id: this.userService.currentUser.chief_id, day_id: this.day_id};
      this.menuService.GetList(this.myOrderParam).subscribe(
        res => {
         this.menus = res.Data;
        });
     }
  getOrder() {
      this.kitchenService.kitchenOrder(this.filter).subscribe(
        res => {
         this.orders = res.Data;
        });
     }
  getallOrder() {
      this.kitchenService.AllOrder(this.userService.currentUser.chief_id).subscribe(
        res => {
         this.events = res.Data;
         if (res.Data != null) {
          this.events.map(i => i.title = i.code + '-' + i.customer.firstname);
         }
        });
     }

  }

