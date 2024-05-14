import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { PlaceDetail } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://api.opentripmap.com/0.1';
  private apiKey = '5ae2e3f221c38a28845f05b66d77b2060aee8dd87d6e81fd3de76b47';

  constructor(private http: HttpClient) { }

  getGeoName(lang: string, geoname: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${lang}/places/geoname?apikey=${this.apiKey}&name=${geoname}`);
  }

  getObjectsByBoundingBox(lang: string, bbox: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${lang}/places/bbox?apikey=${this.apiKey}&bbox=${bbox}`);
  }

  getObjectsByRadius(lang: string, radius: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${lang}/places/radius?apikey=${this.apiKey}&radius=${radius}`);
  }

  getAutoSuggestions(
    lang: string,
    term: string,
    radius: number,
    lon: number,
    lat: number,
    src_geom?: string,
    src_attr?: string,
    kinds?: string,
    rate?: string,
    format?: string,
    props?: string,
    limit?: number
  ): Observable<any> {
    let params = new HttpParams()
      .set('apikey', this.apiKey)
      .set('name', term) // Cambiar 'text' por 'name'
      .set('radius', radius.toString())
      .set('lat', lat.toString()) // Cambiar el orden de 'lon' y 'lat'
      .set('lon', lon.toString());

    if (src_geom) params = params.set('src_geom', src_geom);
    if (src_attr) params = params.set('src_attr', src_attr);
    if (kinds) params = params.set('kinds', kinds);
    if (rate) params = params.set('rate', rate);
    if (format) params = params.set('format', format);
    if (props) params = params.set('props', props);
    if (limit) params = params.set('limit', limit.toString());

    return this.http.get(`${this.baseUrl}/${lang}/places/autosuggest`, { params });
  }

  getObjectProperties(lang: string, xid: string): Observable<PlaceDetail> {
  return this.http.get<PlaceDetail>(`${this.baseUrl}/${lang}/places/xid/${xid}?apikey=${this.apiKey}`);
 }
}

export interface ApiResponse {
  name: string;
  xid?: string;
  address: {
    country: string;
  };
  image?: string;
  preview?: {
    source: string;
  };
}

export interface Destination {
  name: string;
  country: string;
  xid?: string;
  price: number;
  photoUrl: string;
}

export function mapApiResponseToDestination(apiResponse: ApiResponse): Destination {
  if (!apiResponse || !apiResponse.address) {
    return {
      name: '',
      country: '',
      xid: '',
      price: 0,
      photoUrl: '' }; }
  return {
    name: apiResponse.name || '',
    country: apiResponse.address.country || '',
    xid: apiResponse.xid || '',
    price: 0, photoUrl:
      apiResponse.preview?.source || ''
  };
}
