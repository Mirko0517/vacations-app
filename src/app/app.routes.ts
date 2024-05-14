import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'destination-detail',
    loadComponent: () =>
      import('./destination-detail-modal/destination-detail-modal.component').then(
        (m) => m.DestinationDetailModalComponent
      ),
  },
  {
    path: 'confirmation',
    loadComponent: () =>
      import('./confirmation-modal/confirmation-modal.component').then(
        (m) => m.ConfirmationModalComponent
      ),
  },
  {
    path: 'price-modal',
    loadComponent: () =>
      import('./price-modal/price-modal.component').then(
        (m) => m.PriceModalComponent
      ),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule],

})
export class AppRoutingModule {}
