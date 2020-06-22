import { Component, OnInit } from '@angular/core';
import { BanKAccountService } from 'src/app/services/chief/bank-account.service';
import { BrankService } from 'src/app/services/chief/bank.service';
import { UserService } from 'src/app/services/user/user.service';
import { LanguageService } from 'src/app/services/language.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css'],
})
export class WalletComponent implements OnInit {
  banks: any = [];
  loading = false;
  form: FormGroup;
  transactiontotal: any;
  TransactionHistory: any;
  constructor(
    private banKAccountService: BanKAccountService,
    private brankService: BrankService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    public languageService: LanguageService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.initForm();
    this.banKAccountService
      .GetByChiefID(this.userService.currentUser.chief_id)
      .subscribe(res => {
        if (res.Data) {
          this.form.patchValue(res.Data);
        }
      });
    this.brankService.GetList().subscribe(res => {
      this.banks = res.Data;
      this.loading = false;
    });
    this.banKAccountService
      .GetTransactionTotal(this.userService.currentUser.chief_id)
      .subscribe(res => {
        this.transactiontotal = res.Data;
      });
    this.banKAccountService
      .GetTransactionHistory(this.userService.currentUser.chief_id)
      .subscribe(res => {
        this.TransactionHistory = res.Data;
      });
  }
  initForm() {
    this.form = this.formBuilder.group({
      account_name: [null, Validators.required],
      iban_no: [null, Validators.required],
      account_no: [null, Validators.required],
      bank_id: [null, Validators.required],
      branch: [null, Validators.required],
      chief_id: this.userService.currentUser.chief_id,
    });
  }

  save() {
    if (this.form.valid) {
      this.banKAccountService.post(this.form.value).subscribe(res => {
        if (res.Success) {
          this.toastr.success(res.Message);
        } else {
          this.toastr.error(res.Message);
        }
      });
    } else {
      for (const control in this.form.controls) {
        this.form.get(control).markAsDirty();
      }
    }
  }
}
