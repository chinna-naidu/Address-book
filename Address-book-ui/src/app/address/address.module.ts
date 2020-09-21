import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { AddressRoutingModule } from './address-routes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddressListComponent } from './address-list/address-list.component';
import { AddressItemComponent } from './address-list/address-item/address-item.component';

@NgModule({
  declarations: [
    EditAddressComponent,
    AddressListComponent,
    AddressItemComponent,
  ],
  imports: [
    CommonModule,
    AddressRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
})
export class AddressModule {}
