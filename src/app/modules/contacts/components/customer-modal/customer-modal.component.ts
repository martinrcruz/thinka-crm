import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Customer, CustomerData, CustomerStatus } from 'src/app/modules/contacts/models/Customer';
import { CustomerService } from '../../services/customer.service';
import { Project } from 'src/app/modules/projects/models/Project';

@Component({
  selector: 'app-customer-modal',
  templateUrl: './customer-modal.component.html',
  styleUrls: ['./customer-modal.component.scss']
})
export class CustomerModalComponent {

  statusTypes : CustomerStatus[] = [
    {
      id: 1,
      code: 'NEW',
      name: 'Nuevo'
    },
    {
      id: 2,
      code: 'LEAD',
      name: 'Lead'
    },
    {
      id: 3,
      code: 'CUSTOMER',
      name: 'Cliente'
    },
    {
      id: 4,
      code: 'NOT_INTERESTED',
      name: 'No interesado'
    }
  ]


  action: string = "";

  clientForm = this._form.group({
    firstName: [''],
    lastName: [''],
    rut: [''],
    email: [''],
    contactNumber: [''],
    address: [''],
    city: [''],
    domain: [''],
    inCharge: [''],
    contactPlatform: [''],
    description: [''],
    workline: [''],
    projects: [''],
    createdAt: [''],
    createdBy: [''],
    lastModifiedAt: [''],
    lastModifiedBy: [''],
    clientStatus: ['']
  });


  customer: Customer = {} as Customer

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
          firstName: this.customer.firstName!,
          lastName: this.customer.lastName!,
          rut: this.customer.rut!,
          email: this.customer.email!,
          contactNumber: this.customer.contactNumber!,
          contactPlatform: this.customer.contactPlatform!,
          workline: this.customer.workline!,
          domain: this.customer.domain!,
          address: this.customer.address!,
          city: this.customer.city!,
          description: this.customer.description!,
          inCharge: this.customer.inCharge!,
          clientStatus: this.customer.clientStatus!,
          projects: this.clientForm.value.projects!,
          createdAt: this.customer.createdAt!,
          createdBy: this.customer.createdBy!,
          lastModifiedAt: this.customer.lastModifiedAt!,
          lastModifiedBy: this.customer.lastModifiedBy!
        })
      })
  }

  createOrUpdate() {
    const request: CustomerData = {
      id: this.data.id,
      firstName: this.clientForm.value.firstName!,
      lastName: this.clientForm.value.lastName!,
      rut: this.clientForm.value.rut!,
      email: this.clientForm.value.email!,
      contactNumber: this.clientForm.value.contactNumber!,
      workline: this.clientForm.value.workline!,
      domain: this.clientForm.value.domain!,
      address: this.clientForm.value.address!,
      city: this.clientForm.value.city!,
      contactPlatform: this.clientForm.value.contactPlatform!,
      description: this.clientForm.value.description!,
      inCharge: this.clientForm.value.inCharge!,
      clientStatus: this.clientForm.value.clientStatus!,
      projects: [{} as Project]
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
