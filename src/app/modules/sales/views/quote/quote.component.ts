import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, of } from 'rxjs';
import { Quote, QuoteData } from 'src/app/modules/sales/models/Quote';
import { QuoteService } from 'src/app/modules/sales/services/quote.service';
import Swal from 'sweetalert2';
import { QuoteModalComponent } from '../../components/quote-modal/quote-modal.component';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss'],
})
export class QuoteComponent {
  dataSource: any;
  displayedColumns: string[] = [
    'id',
    'title',
    'resume',
    'startDate',
    'endDate',
    'quoteStatus',
    'domain',
    'estimatedCost',
    'estimatedTime',
    'createdBy',
    'createdAt',
    'edit',
    'delete',
  ];

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  quotes: Quote[] = [];
  pageNumber: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  maxSize: number = 5;
  search: string = '';
  loading: boolean = false;

  constructor(
    private _dialog: MatDialog,
    private _quote: QuoteService
  ) { }

  ngOnInit() {
    this.listQuotes();
  }

  listQuotes() {
    this.loading = true;
    this._quote
      .listQuotes()
      .pipe(
        catchError((error) =>
          of({ dto: [], codError: error, codErrorDesc: error.descError })
        )
      )
      .subscribe((response: Quote[]) => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
      .add(() => {
        this.loading = false;
      });
  }

  openDialog(id: number | null) {
    const dialogRef = this._dialog.open(QuoteModalComponent, {
      width: '1200px',
      height: '700px',
      data: {
        id: id,
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.listQuotes();
    });
  }

  delete(id: number) {
    Swal.fire({
      title: 'Estas seguro de que quieres eliminar el registro?',
      icon: 'error',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isDenied) {
        Swal.fire('La operación ha sido cancelada', '', 'info');
      } else if (result.isConfirmed) {
        this._quote
          .deleteQuote(id)
          .pipe(
            catchError((error) => {
              Swal.fire('Error al eliminar registro', error.message, 'error');
              return of(null);
            })
          )
          .subscribe((response: string | null) => {
            if (response) {
              Swal.fire('Registro eliminado con exito', '', 'success');
              this.listQuotes();
            }
          });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
