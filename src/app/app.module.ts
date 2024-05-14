import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { RouteReuseStrategy } from '@angular/router';
import { AppComponent } from './app.component';
import { HomePage } from './home/home.page';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule} from "./shared.module";
import {NgOptimizedImage} from "@angular/common";

const routes: Routes = [
  { path: '', component: HomePage },
];

@NgModule({
  declarations: [
    AppComponent,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    HttpClientModule,
    RouterModule.forRoot(routes),
    SharedModule,
    NgOptimizedImage
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
