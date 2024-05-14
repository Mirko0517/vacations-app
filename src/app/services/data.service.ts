import { Injectable } from "@angular/core";

export interface Destination {
  name: string;
  country: string;
  price: number;
  photoUrl: string;
  xid?: string;
}

export interface PlaceDetail {
  kinds: string;
  sources: {
    geometry: string;
    attributes: string[];
  };
  bbox: {
    lat_max: number;
    lat_min: number;
    lon_max: number;
    lon_min: number;
  };
  point: {
    lon: number;
    lat: number;
  };
  osm: string;
  otm: string;
  xid: string;
  name: string;
  wikipedia: string;
  image: string;
  wikidata: string;
  rate: string;
  info: {
    descr: string;
    image: string;
    img_width: number;
    src: string;
    src_id: number;
    img_height: number;
  };
}

@Injectable({
  providedIn: "root",
})
export class DataService {
  private destinations: Destination[] = [];

  constructor() {}

  getDestinations(): Destination[] {
    return this.destinations;
  }

  saveDestination(destination: Destination) {
    const index = this.destinations.findIndex(
      (d) => d.name === destination.name,
    );
    if (index === -1) {
      this.destinations.push(destination);
    } else {
      this.destinations[index] = destination;
    }
  }

  deleteDestination(destination: Destination) {
    this.destinations = this.destinations.filter(
      (d) => d.name !== destination.name,
    );
  }
}
