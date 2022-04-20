import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Address } from 'src/app/interfaces/address';
import { Subscription } from 'rxjs';
import { AddressService } from '../address.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css'],
})
export class AddressListComponent implements OnInit, OnDestroy {
  addressList: Address[];
  subscriptionList: Subscription;
  subscriptionChange: Subscription;
  constructor(
    private addressService: AddressService
  ) { }

  ngOnInit(): void {
    this.subscriptionList = this.addressService
      .fetchAddress()
      .subscribe((data) => {
        this.addressList = data.addresses;
      });
    this.subscriptionChange = this.addressService.addressChanged.subscribe(
      (addresses) => {
        this.addressList = addresses;
      }
    );
  }
  ngOnDestroy() {
    if (this.subscriptionChange) {
      this.subscriptionChange.unsubscribe();
    }
    if (this.subscriptionList) {
      this.subscriptionList.unsubscribe();
    }
  }
}
