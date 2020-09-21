import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Address } from 'src/app/interfaces/address';
import { AddressService } from '../address.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css'],
})
export class EditAddressComponent implements OnInit, OnDestroy {
  myForm: FormGroup;
  email: string;
  contactnumber: string;
  alternatenumber: string;
  isLoading = false;
  editMode = false;
  id: number;
  subscription: Subscription;
  editSubscription: Subscription;
  routeSubscription: Subscription;
  constructor(
    private addressService: AddressService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.email, Validators.required]),
      contactnumber: new FormControl(null, [
        Validators.required,
        Validators.pattern('^([12345789]{2})([0-9]{8})$'),
      ]),
      alternatenumber: new FormControl(null, [
        Validators.required,
        Validators.pattern('^([12345789]{2})([0-9]{8})$'),
      ]),
      address: new FormControl(null, [Validators.required]),
    });

    this.routeSubscription = this.route.params.subscribe((data) => {
      if (data['id']) {
        this.editMode = true;
        this.id = data.id;
        this.editSubscription = this.addressService
          .getAddress(this.id)
          .subscribe((data: any) => {
            const address: Address = data.address;
            this.myForm.setValue({
              name: address.name,
              email: address.email,
              contactnumber: address.contactnumber,
              alternatenumber: address.alternatenumber,
              address: address.address,
            });
          });
      }
    });
  }
  isValidControl(control: string) {
    return !this.myForm.get(control).valid && this.myForm.get(control).touched;
  }

  onSubmit() {
    const address: Address = this.myForm.value;
    this.reset();
    this.isLoading = true;
    if (this.editMode) {
      this.subscription = this.addressService
        .updateAddress(this.id, address)
        .subscribe(
          (data) => {
            this.isLoading = false;
            console.log(data);
            this.router.navigate(['/list']);
          },
          (errorResponse) => {
            this.isLoading = false;
            this.setErrors(errorResponse);
          }
        );
    } else {
      this.subscription = this.addressService.addAddress(address).subscribe(
        (data) => {
          console.log(data);
          this.isLoading = false;
          this.router.navigate(['/list']);
        },
        (errorResponse) => {
          this.isLoading = false;
          this.setErrors(errorResponse);
        }
      );
    }
  }
  reset() {
    this.email = null;
    this.alternatenumber = null;
    this.contactnumber = null;
  }
  setErrors(errorResponse) {
    if (errorResponse.error.field === 'email') {
      this.email = errorResponse.error.message;
    } else if (errorResponse.error.field === 'contactnumber') {
      this.contactnumber = errorResponse.error.message;
    } else if (errorResponse.error.field === 'alternatenumber') {
      this.alternatenumber = errorResponse.error.message;
    }
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.editSubscription) {
      this.editSubscription.unsubscribe();
    }
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
}
