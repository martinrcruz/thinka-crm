import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Customer } from 'src/app/modules/contacts/models/Customer';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-modal',
  templateUrl: './customer-modal.component.html',
  styleUrls: ['./customer-modal.component.scss']
})
export class CustomerModalComponent {

  statusList = ['New', 'In Progress', 'Done'];

  action: string = "";

  clientForm = this._form.group({
    firstName: [''],
    lastName: [''],
    rut: [''],
    email: [''],
    city: [''],
    contactPlatform: [''],
    budget: [0],
    projectDescription: [''],
    expectedDate: [''],
    deliveryStatus: [''],
    workLine: [''],
    inCharge: [''],
    status: [''],
  });

  customer: Customer = {
    id: 0,
    firstName: '',
    lastName: '',
    rut: '',
    email: '',
    city: '',
    contactPlatform: '',
    budget: 0,
    projectDescription: '',
    expectedDate: '',
    deliveryStatus: '',
    workLine: '',
    inCharge: '',
    status: ''
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CustomerModalComponent>,
    private _form: FormBuilder,
    private _customer: CustomerService
  ) { }

  ngOnInit(): void {
    if (this.data.id != null) {
      this.action = "Actualizar";
      this.loadData();
    } else {
      this.action = "Agregar";
    }
  }

  loadData() {
    this._customer.getCustomerById(this.data.id)
      .subscribe((response: Customer) => {
        this.customer = response;
        this.clientForm.setValue({
          firstName: this.customer.firstName,
          lastName: this.customer.lastName,
          rut: this.customer.rut,
          email: this.customer.email,
          city: this.customer.city,
          contactPlatform: this.customer.contactPlatform,
          budget: this.customer.budget,
          projectDescription: this.customer.projectDescription,
          expectedDate: this.customer.expectedDate,
          deliveryStatus: this.customer.deliveryStatus,
          workLine: this.customer.workLine,
          inCharge: this.customer.inCharge,
          status: this.customer.status
        })
      })
  }

  createOrUpdate() {
    const request: Customer = {
      id: this.data.id,
      firstName: this.clientForm.value.firstName!,
      lastName: this.clientForm.value.lastName!,
      rut: this.clientForm.value.rut!,
      email: this.clientForm.value.email!,
      city: this.clientForm.value.city!,
      contactPlatform: this.clientForm.value.contactPlatform!,
      budget: this.clientForm.value.budget!,
      projectDescription: this.clientForm.value.projectDescription!,
      expectedDate: this.clientForm.value.expectedDate!,
      deliveryStatus: this.clientForm.value.deliveryStatus!,
      workLine: this.clientForm.value.workLine!,
      inCharge: this.clientForm.value.inCharge!,
      status: this.clientForm.value.status!
    };

    if (this.data.id != null) {
      this._customer.updateCustomer(request)
        .subscribe(() => {
          this.dialogRef.close();
        })
    } else {
      this._customer.createCustomer(request)
        .subscribe(() => {
          this.dialogRef.close();
        })
    }
  }






}
