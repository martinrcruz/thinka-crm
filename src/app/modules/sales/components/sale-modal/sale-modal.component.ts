import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Sale, SaleData } from '../../models/Sale';
import { SaleService } from '../../services/sale.service';

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
    createdAt: [''],
    createdBy: [''],
    lastModifiedAt: [''],
    lastModifiedBy: [''],
    clientId: [''],
    clientName: [''],
    title: [''],
    resume: [''],
    description: [''],
    startDate: [''],
    endDate: [''],
    domain: [''],
    quoteId: [''],
    briefUrl: [''],
    cost: [''],
    duration: [''],
    inCharge: [''],
    projectId: [''],
    projectStatus: [''],
    paymentType: [''],
    bruteCost: [''],
    iva: [''],
    total: [''],
    paymentStatus: ['']
  });


  sale: Sale = {
    id: 0,
    createdAt: '',
    createdBy: '',
    lastModifiedAt: '',
    lastModifiedBy: '',
    clientId: 0,
    clientName: '',
    title: '',
    resume: '',
    description: '',
    startDate: '',
    endDate: '',
    domain: '',
    quoteId: null,
    briefUrl: '',
    cost: 0,
    duration: '',
    inCharge: '',
    projectId: 0,
    projectStatus: '',
    paymentType: '',
    bruteCost: 0,
    iva: 0,
    total: 0,
    paymentStatus: ''
  }

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
          clientId: String(this.sale.clientId!),
          clientName: String(this.sale.clientId!),
          title: this.sale.title!,
          resume: this.sale.resume!,
          description: this.sale.description!,
          startDate: this.sale.startDate!,
          endDate: this.sale.endDate!,
          domain: this.sale.domain!,
          inCharge: this.sale.inCharge!,
          id: this.data.id,
          quoteId: String(this.sale.quoteId!),
          briefUrl: this.sale.briefUrl!,
          cost: String(this.sale.cost!),
          duration: this.sale.duration!,
          projectId: String(this.sale.projectId),
          projectStatus: String(this.sale.projectId),
          paymentType: this.sale.paymentType,
          bruteCost: String(this.sale.bruteCost),
          iva: String(this.sale.iva),
          total: String(this.sale.total),
          paymentStatus: this.sale.paymentStatus
        })
      })
  }

  createOrUpdate() {
    const request: SaleData = {
      id: this.data.id,
      clientName: String(this.sale.clientId!),
      title: this.saleForm.value.title!,
      resume: this.saleForm.value.resume!,
      startDate: this.saleForm.value.startDate!,
      endDate: this.saleForm.value.endDate!,
      domain: this.saleForm.value.domain!,
      inCharge: this.saleForm.value.inCharge!,
      briefUrl: this.saleForm.value.briefUrl!,
      cost: Number(this.saleForm.value.cost!),
      duration:this.saleForm.value.duration!,
      total:Number(this.saleForm.value.total!),
      paymentStatus: this.saleForm.value.paymentStatus!,
      createdAt: this.saleForm.value.createdAt!,
      createdBy: this.saleForm.value.createdBy!,
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
