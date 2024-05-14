import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule} from "@angular/forms";
import { DestinationDetailModalComponent } from './destination-detail-modal/destination-detail-modal.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { PriceModalComponent } from './price-modal/price-modal.component';

@NgModule({
  declarations: [
    DestinationDetailModalComponent,
    ConfirmationModalComponent,
    PriceModalComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [
    DestinationDetailModalComponent,
    ConfirmationModalComponent,
    PriceModalComponent
  ]
})
export class SharedModule { }
