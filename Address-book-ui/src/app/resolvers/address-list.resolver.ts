import { Injectable } from '@angular/core';
import { AddressService } from '../address/address.service';

import { Resolve } from '@angular/router';

@Injectable()
export class APIResolver implements Resolve<any> {
  constructor(private addressService: AddressService) {}

  resolve() {
    return this.addressService.fetchAddress();
  }
}
