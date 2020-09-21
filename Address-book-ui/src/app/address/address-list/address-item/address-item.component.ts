import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Address } from 'src/app/interfaces/address';
import { AddressService } from '../../address.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-address-item',
  templateUrl: './address-item.component.html',
  styleUrls: ['./address-item.component.css'],
})
export class AddressItemComponent implements OnInit, OnDestroy {
  show = false;
  @Input() address: Address;
  deleteSubscription: Subscription;
  addressSubscription: Subscription;
  constructor(private addressService: AddressService) {}

  ngOnInit(): void {}

  onDelete() {
    this.deleteSubscription = this.addressService
      .deleteAddress(this.address.id)
      .subscribe((data) => {
        this.addressSubscription = this.addressService
          .fetchAddress()
          .subscribe((data) => {
            this.addressService.addressChanged.next(data.addresses);
          });
      });
  }
  ngOnDestroy() {
    if (this.deleteSubscription) {
      this.deleteSubscription.unsubscribe();
    }
    if (this.addressSubscription) {
      this.addressSubscription.unsubscribe();
    }
  }
}
