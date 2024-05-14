import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-price-modal',
  templateUrl: './price-modal.component.html',
  styleUrls: ['./price-modal.component.scss'],

})
export class PriceModalComponent implements OnInit {
  flightPrice: number = 0;

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  confirmPrice() {
    this.modalController.dismiss(this.flightPrice);
  }
}
