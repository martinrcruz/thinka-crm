import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Quote, QuoteData, QuoteStatus } from '../../models/Quote';
import { QuoteService } from '../../services/quote.service';

@Component({
  selector: 'app-quote-modal',
  templateUrl: './quote-modal.component.html',
  styleUrls: ['./quote-modal.component.scss']
})
export class QuoteModalComponent {
  statusTypes : QuoteStatus[] = [
    {
      id: 1,
      code: 'PENDING',
      name: 'Pendiente'
    },
    {
      id: 2,
      code: 'IN_PROGRESS',
      name: 'En progreso'
    },
    {
      id: 3,
      code: 'READY_TO_SEND',
      name: 'Listo para Enviar'
    },
    {
      id: 4,
      code: 'SENT',
      name: 'Enviado'
    },
    {
      id: 5,
      code: 'ANSWERED',
      name: 'Respondido'
    },
    {
      id: 6,
      code: 'ACCEPTED',
      name: 'Aceptado'
    },
    {
      id: 7,
      code: 'DENIED',
      name: 'Rechazado'
    }
  ]

  action: string = "";

  quoteForm = this._form.group({
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
    estimatedCost: [''],
    estimatedTime: [''],
    inCharge: [''],
    quoteStatus: ['']
  });


  quote: Quote = {} as Quote

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<QuoteModalComponent>,
    private _form: FormBuilder,
    private _quote: QuoteService
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
    this._quote.getQuoteById(this.data.id)
      .subscribe((response: Quote) => {
        this.quote = response;
        this.quoteForm.setValue({
          createdAt: this.quote.createdAt!,
          createdBy: this.quote.createdBy!,
          lastModifiedAt: this.quote.lastModifiedAt!,
          lastModifiedBy: this.quote.lastModifiedBy!,
          clientId: String(this.quote.clientId!),
          clientName: String(this.quote.clientId!), //TODO
          title: this.quote.title!,
          resume: this.quote.resume!,
          description: this.quote.description!,
          startDate: this.quote.startDate!,
          endDate: this.quote.endDate!,
          domain: this.quote.domain!,
          estimatedCost: String(this.quote.estimatedCost!),
          estimatedTime: this.quote.estimatedTime!,
          inCharge: this.quote.inCharge!,
          quoteStatus: this.quote.quoteStatus
        })
      })
  }

  createOrUpdate() {
    const request: QuoteData = {
      id: this.data.id,
      clientId: Number(this.quoteForm.value.clientId!),
      clientName: this.quoteForm.value.clientId!,
      title: this.quoteForm.value.title!,
      resume: this.quoteForm.value.resume!,
      description: this.quoteForm.value.description!,
      startDate: this.quoteForm.value.startDate!,
      endDate: this.quoteForm.value.endDate!,
      domain: this.quoteForm.value.domain!,
      estimatedCost: Number(this.quoteForm.value.estimatedCost!),
      estimatedTime: this.quoteForm.value.estimatedTime!,
      inCharge: this.quoteForm.value.inCharge!,
      quoteStatus: this.quoteForm.value.quoteStatus!
    };
     
    if (this.data.id != null) {
      this._quote.updateQuote(request)
        .subscribe(() => {
          this.dialogRef.close();
        })
    } else {
      this._quote.createQuote(request)
        .subscribe(() => {
          this.dialogRef.close();
        })
    }
  }
}
