import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Sale, SaleData } from '../../models/Sale';
import { SaleService } from '../../services/sale.service';
import { Customer } from 'src/app/modules/contacts/models/Customer';
import { Quote } from '../../models/Quote';
import { Project } from 'src/app/modules/projects/models/Project';

@Component({
  selector: 'app-sale-modal',
  templateUrl: './sale-modal.component.html',
  styleUrls: ['./sale-modal.component.scss']
})
export class SaleModalComponent {
  statusTypes = ['Nuevo', 'Lead', 'Cliente', 'No Interesado'];

  action: string = "";

  saleForm = this._form.group({
    id: [''],
    customer: [''],
    title: [''],
    resume: [''],
    description: [''],
    startDate: [''],
    endDate: [''],
    domain: [''],
    quote: [''],
    briefUrl: [''],
    cost: [''],
    duration: [''],
    inCharge: [''],
    project: [''],
    paymentType: [''],
    bruteCost: [''],
    iva: [''],
    paymentStatus: [''],
    createdAt: [''],
    createdBy: [''],
    lastModifiedAt: [''],
    lastModifiedBy: ['']
  });


  sale: Sale = {} as Sale

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SaleModalComponent>,
    private _form: FormBuilder,
    private _sale: SaleService
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
    this._sale.getSaleById(this.data.id)
      .subscribe((response: Sale) => {
        this.sale = response;
        this.saleForm.setValue({
          createdAt: this.sale.createdAt!,
          createdBy: this.sale.createdBy!,
          lastModifiedAt: this.sale.lastModifiedAt!,
          lastModifiedBy: this.sale.lastModifiedBy!,
          customer: String(this.sale.customer!),
          title: this.sale.title!,
          resume: this.sale.resume!,
          description: this.sale.description!,
          startDate: this.sale.startDate!,
          endDate: this.sale.endDate!,
          domain: this.sale.domain!,
          inCharge: this.sale.inCharge!,
          id: this.data.id,
          quote: String(this.sale.quote!),
          briefUrl: this.sale.briefUrl!,
          cost: String(this.sale.cost!),
          duration: this.sale.duration!,
          project: String(this.sale.project),
          paymentType: this.sale.paymentType,
          bruteCost: String(this.sale.bruteCost),
          iva: String(this.sale.iva),
          paymentStatus: this.sale.paymentStatus
        })
      })
  }

  createOrUpdate() {
    const request: SaleData = {
      id: this.data.id,
      customer: this.sale.customer!,
      title: this.saleForm.value.title!,
      resume: this.saleForm.value.resume!,
      startDate: this.saleForm.value.startDate!,
      endDate: this.saleForm.value.endDate!,
      domain: this.saleForm.value.domain!,
      inCharge: this.saleForm.value.inCharge!,
      briefUrl: this.saleForm.value.briefUrl!,
      cost: Number(this.saleForm.value.cost!),
      duration: this.saleForm.value.duration!,
      paymentStatus: this.saleForm.value.paymentStatus!,
      createdAt: this.saleForm.value.createdAt!,
      createdBy: this.saleForm.value.createdBy!,
      quote: {} as Quote,
      description: this.saleForm.value.description!,
      project: [{} as Project],
      paymentType: '',
      bruteCost: 0,
      iva: 0
    };
     
    if (this.data.id != null) {
      this._sale.updateSale(request)
        .subscribe(() => {
          this.dialogRef.close();
        })
    } else {
      this._sale.createSale(request)
        .subscribe(() => {
          this.dialogRef.close();
        })
    }
  }
}
