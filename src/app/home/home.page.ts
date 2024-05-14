import {Component, OnInit} from "@angular/core";
import {ModalController, SearchbarCustomEvent} from "@ionic/angular";
import { DestinationDetailModalComponent } from "../destination-detail-modal/destination-detail-modal.component";
import { ConfirmationModalComponent } from "../confirmation-modal/confirmation-modal.component";
import { DataService, Destination } from "../services/data.service";
import { addIcons } from "ionicons";
import { debounceTime, Subject } from "rxjs";
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { PriceModalComponent } from '../price-modal/price-modal.component';
import { mapApiResponseToDestination } from '../services/api.service';
import { ApiService, ApiResponse} from "../services/api.service";
import {
  addCircleOutline,
  cameraOutline,
  trashOutline,
  airplaneOutline,
} from "ionicons/icons";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],

})
export class HomePage implements OnInit {
  destinations: Destination[] = [];
  searchTerm: string = "";
  searchResults: ApiResponse[] = [];
  radius: number = 5000000;

  // España
  latEspana: number = 40.4165;
  lonEspana: number = -3.70256;

  // Venezuela
  latVenezuela: number = 10.4806;
  lonVenezuela: number = -66.9036;

  // Honduras
  latHonduras: number = 14.0723;
  lonHonduras: number = -87.1921;

  searchPerformed: boolean = false;

  private searchSubject = new Subject<string>();
  private searchObservable = this.searchSubject.pipe(debounceTime(500));

  constructor(
    private modalController: ModalController,
    private dataService: DataService,
    private apiService: ApiService,
  ) {
    this.searchResults = [];
    addIcons({
      "add-circle-outline": addCircleOutline,
      "camera-outline": cameraOutline,
      "trash-outline": trashOutline,
      "airplane-outline": airplaneOutline,
    });
  }

  ngOnInit() {
  this.searchObservable.subscribe(searchTerm => {
    this.searchDestinations(searchTerm, this.radius);
  });
}

  async openPriceModal() {
    const modal = await this.modalController.create({
      component: PriceModalComponent,
    });

    modal.onDidDismiss().then((data) => {
      if (data.data) {
        console.log('Valor del vuelo:', data.data);
      }
    });

    return await modal.present();
  }
  searchDestinations(term: string, radius: number) {
    this.searchTerm = term;
    this.searchSubject.next(term);
    this.searchResults = [];

    this.getAutoSuggestions(term, this.latEspana, this.lonEspana, radius);
    this.getAutoSuggestions(term, this.latVenezuela, this.lonVenezuela, radius);
    this.getAutoSuggestions(term, this.latHonduras, this.lonHonduras, radius);

    this.searchPerformed = true;
  }

  getDestinationDetails(xid: string) {
  if (!xid) {
    console.error('xid is undefined');
    return;
  }
  return this.apiService.getObjectProperties('en', xid);
}

  getAutoSuggestions(term: string, lat: number, lon: number, radius: number) {
    this.apiService.getAutoSuggestions('en', term, radius, lon, lat).subscribe((response: any) => {
      if (response.features && response.features.length > 0) {
        response.features.forEach((feature: any) => {
          if (feature.properties && feature.properties.xid) {
            const xid = feature.properties.xid;
            this.getDestinationDetails(xid).subscribe((details: any) => {
              if (details) {
                const destination = {
                  ...feature.properties,
                  ...details
                };
                this.searchResults.push(destination);
              }
            });
          }
        });
      }
      console.log(response);
    }, error => {
      console.error('Error en la solicitud HTTP:', error);
    });
  }

  addDestination(destination: ApiResponse) {
    if (!destination) {
      console.error('Destination is undefined');
      return;
    }

    const newDestination: Destination = mapApiResponseToDestination(destination);
    this.dataService.saveDestination(newDestination);
    this.destinations = this.dataService.getDestinations();
  }

  async openDestinationDetailModal(destination?: Destination) {
    const modal = await this.modalController.create({
      component: DestinationDetailModalComponent,
      componentProps: { destination },
    });

    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.dataService.saveDestination(data.data);
        this.destinations = this.dataService.getDestinations();
      }
    });

    return await modal.present();
  }

  async confirmDeleteDestination(destination: Destination) {
    const modal = await this.modalController.create({
      component: ConfirmationModalComponent,
      componentProps: {
        message: `¿Estás seguro de eliminar el destino ${destination.name}?`,
      },
    });

    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.dataService.deleteDestination(destination);
        this.destinations = this.dataService.getDestinations();
      }
    });

    return await modal.present();
  }

  async takePicture(destination: Destination) {
    const image = await Camera['getPhoto']({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    });

    destination.photoUrl = image.webPath ?? '';
  }

  async handleInput($event: SearchbarCustomEvent) {
    const searchTerm = $event.target.value ?? '';
    this.searchDestinations(searchTerm, this.radius);
  }
}
