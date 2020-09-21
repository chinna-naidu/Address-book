import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Address } from './interfaces/address';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  signup(name: string, email: string, password: string) {
    return this.http.post('http://localhost:3000/signup', {
      name: name,
      email: email,
      password: password,
    });
  }
  login(email: string, password: string) {
    return this.http.put('http://localhost:3000/login', {
      email: email,
      password: password,
    });
  }

  addAddress(address: Address) {
    return this.http.post('http://localhost:3000/address', address);
  }

  fetchAddress(): Observable<any> {
    return this.http.get('http://localhost:3000/address');
  }

  getAddress(id: number) {
    return this.http.get('http://localhost:3000/address/' + id.toString());
  }

  updateAddress(id: number, address: Address) {
    return this.http.patch(
      'http://localhost:3000/address/' + id.toString(),
      address
    );
  }

  deleteAddress(id: number) {
    return this.http.delete('http://localhost:3000/address/' + id.toString());
  }
}
