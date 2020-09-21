import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { Address } from '../interfaces/address';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  addressChanged = new Subject<Address[]>();
  constructor(private http: HttpService) {}

  public addAddress(address: Address) {
    return this.http.addAddress(address);
  }

  public fetchAddress(): Observable<any> {
    return this.http.fetchAddress();
  }

  public getAddress(id: number) {
    return this.http.getAddress(id);
  }

  public updateAddress(id: number, address: Address) {
    return this.http.updateAddress(id, address);
  }

  public deleteAddress(id: number) {
    return this.http.deleteAddress(id);
  }
}
