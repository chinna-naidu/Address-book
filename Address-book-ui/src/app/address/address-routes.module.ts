import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { AddressListComponent } from './address-list/address-list.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: 'edit/:id',
    canActivate: [AuthGuard],
    component: EditAddressComponent,
  },
  { path: 'edit', canActivate: [AuthGuard], component: EditAddressComponent },
  { path: 'list', canActivate: [AuthGuard], component: AddressListComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddressRoutingModule {}
