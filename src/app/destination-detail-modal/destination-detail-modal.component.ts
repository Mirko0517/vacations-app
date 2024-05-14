import { Component, OnInit, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { Destination } from "../services/data.service";

@Component({
  selector: "app-destination-detail-modal",
  templateUrl: "./destination-detail-modal.component.html",
  styleUrls: ["./destination-detail-modal.component.scss"],
})
export class DestinationDetailModalComponent implements OnInit {
  @Input() destination: Destination | null = null;
  destinationData: Destination = {
    name: "",
    country: "",
    price: 0,
    photoUrl: "",
    xid: "",
  };

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    this.destinationData = this.destination
      ? { ...this.destination }
      : { name: "", country: "", price: 0, photoUrl: "", xid: ""};
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  saveDestination() {
    this.modalController.dismiss(this.destinationData);
  }
}
