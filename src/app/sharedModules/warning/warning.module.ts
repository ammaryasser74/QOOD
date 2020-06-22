import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarningComponent } from './warning.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [WarningComponent],
  declarations: [WarningComponent],
  entryComponents: [WarningComponent]
})
export class WarningModule { }
