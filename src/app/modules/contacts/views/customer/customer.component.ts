import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerData } from '../../models/Customer';
import { MatDialog } from '@angular/material/dialog';
import { CustomerModalComponent } from '../../components/customer-modal/customer-modal.component';
import { CustomerService } from '../../services/customer.service';
import Swal from 'sweetalert2'
import { catchError, of } from 'rxjs';
import { Customer } from 'src/app/modules/contacts/models/Customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {

  dataSource: any;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'contactNumber', 'workline', 'domain', 'customerStatus', 'inCharge', 'contactPlatform', 'createdAt', 'edit', 'delete'];

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  customers: Customer[] = [];
  pageNumber: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  maxSize: number = 5;
  search: string = '';
  loading: boolean = false;

  constructor(
    private _dialog: MatDialog,
    private _customer: CustomerService
  ) {
  }

  ngOnInit(){
    this.listCustomers();
  }

  listCustomers() {
    this.loading = true;
    this._customer
      .listCustomers()
      .pipe(catchError((error) => of({ dto: [], codError: error, codErrorDesc: error.descError })))
      .subscribe((response: Customer[]) => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
      .add(() => {
        this.loading = false;
      });
  }

  openDialog(id: number | null) {
    const dialogRef = this._dialog.open(CustomerModalComponent, {
      width: '1200px',
      height: '700px',
      data: {
        id: id
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.listCustomers();
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
        this._customer.deleteCustomer(id)
          .pipe(
            catchError((error) => {
              Swal.fire('Error al eliminar registro', error.message, 'error');
              return of(null);
            }),
          )
          .subscribe((response: string | null) => {
            if (response) {
              Swal.fire("Registro eliminado con exito", "", "success");
              this.listCustomers();
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
