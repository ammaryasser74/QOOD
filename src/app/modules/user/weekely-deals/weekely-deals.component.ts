import { Component, OnInit } from '@angular/core';
import { KitchenService } from 'src/app/services/chief/kitchen.service';
import { WeekelyDealsService, WeekelyFilter} from 'src/app/services/user/weekely-deals.service';
import { LanguageService } from 'src/app/services/language.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-weekely-deals',
  templateUrl: './weekely-deals.component.html',
  styleUrls: ['./weekely-deals.component.css']
})
export class WeekelyDealsComponent implements OnInit {
  kitchens: any = [];
  listOrGrid: any;
  Data: any = [];
  tab = 1;
  loading: boolean;
  parmKitchen: WeekelyFilter = {KitchenID: 0, filterType: 0};
  constructor(private kitchenService: KitchenService,
              private weekelyDealsService: WeekelyDealsService,
              public languageService: LanguageService,
    ) { }

  ngOnInit() {
    this.listOrGrid = 'product-view grid-view';
    this.parmKitchen = {KitchenID: 0, filterType: 0};
    this.loading = true;
    this.kitchenService.GetList().subscribe(res => {
    this.kitchens = res.Data;
    this.loading = false;
    });
    this.getData();
  }
  getData() {

    this.weekelyDealsService.GetWeekydealsForKitchen(this.parmKitchen).subscribe(res => {
     res.Data.map(i => i.img = environment.api_imges + i.img);
     this.Data = res.Data;
    });
  }
  gridOrList(type) {
    if (type == 1) {this.listOrGrid = 'product-view list-view'; this.tab = 2; } else {this.listOrGrid = 'product-view grid-view'; this.tab = 1; }
  }
  arrangeDataASC() {
    if (this.parmKitchen.filterType == 1) {
      this.Data.sort((a, b) => (a.price > b.price) ? 1 : -1);
    } else {
      this.Data.sort((a, b) => (a.price < b.price) ? 1 : -1);
    }
  }
}
