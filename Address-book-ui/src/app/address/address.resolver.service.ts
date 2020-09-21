import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve} from '@angular/router';
import { Address } from '../interfaces/address';
import { Injectable } from '@angular/core';
import { AddressService } from './address.service';
import { HttpService } from '../http.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn:'root'
})
export class AddressResolver implements Resolve<any> {
    constructor(private http: HttpClient) {}
    resolve() {
        return this.http.get('http://localhost:3000/address').pipe(
            map(data => {
                console.log(data);
                return data;

            })
        )
    }

}