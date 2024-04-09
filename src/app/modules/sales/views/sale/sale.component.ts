import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, of } from 'rxjs';
import Swal from 'sweetalert2';
import { SaleModalComponent } from '../../components/sale-modal/sale-modal.component';
import { Sale } from 'src/app/modules/sales/models/Sale';
import { SaleService } from 'src/app/modules/sales/services/sale.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent {
  dataSource: any;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'city', 'contactPlatform', 'workLine', 'inCharge', 'createdAt', 'status', 'edit', 'delete'];

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  sales: Sale[] = [];
  pageNumber: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  maxSize: number = 5;
  search: string = '';
  loading: boolean = false;

  constructor(
    private _dialog: MatDialog,
    private _sale: SaleService
  ) {
  }

  ngOnInit(){
    this.listSales();
  }

  listSales() {
    this.loading = true;
    this._sale
      .listSales()
      .pipe(catchError((error) => of({ dto: [], codError: error, codErrorDesc: error.descError })))
      .subscribe((response: Sale[]) => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
      .add(() => {
        this.loading = false;
      });
  }

  openDialog(id: number | null) {
    const dialogRef = this._dialog.open(SaleModalComponent, {
      width: '1200px',
      height: '700px',
      data: {
        id: id
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.listSales();
    });
  }

  delete(id: number) {
    Swal.fire({
      title: "Estas seguro de que quieres eliminar el registro?",
      icon: "error",
      showDenyButton: true,
      confirmButtonText: "Eliminar",
      denyButtonText: "Cancelar"
    }).then((result) => {
      if (result.isDenied) {
        Swal.fire("La operación ha sido cancelada", "", "info");
      } else if (result.isConfirmed) {
        this._sale.deleteSale(id)
          .pipe(
            catchError((error) => {
              Swal.fire('Error al eliminar registro', error.message, 'error');
              return of(null);
            }),
          )
          .subscribe((response: string | null) => {
            if (response) {
              Swal.fire("Registro eliminado con exito", "", "success");
              this.listSales();
            }
          })
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
