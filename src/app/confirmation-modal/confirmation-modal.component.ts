import { Component, OnInit, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";


@Component({
  selector: "app-confirmation-modal",
  templateUrl: "./confirmation-modal.component.html",
  styleUrls: ["./confirmation-modal.component.scss"],

})
export class ConfirmationModalComponent implements OnInit {
  @Input() message: string = "";

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  confirm() {
    this.modalController.dismiss(true);
  }

  dismissModal() {
    this.modalController.dismiss(false);
  }
}
