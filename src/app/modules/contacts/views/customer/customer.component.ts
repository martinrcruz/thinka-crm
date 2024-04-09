import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerData } from '../../models/CustomerData';
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
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'city', 'contactPlatform', 'workLine', 'inCharge', 'createdAt', 'status', 'edit', 'delete'];

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

  customerData: CustomerData[] = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      rut: "12345678-9",
      email: "john.doe@example.com",
      city: "New York",
      contactPlatform: "Phone",
      budget: 10000,
      projectDescription: "Website development",
      expectedDate: "2024-04-15",
      deliveryStatus: "Pending",
      workLine: "Development",
      inCharge: "Alice Smith",
      createdAt: "2024-03-19",
      createdBy: "System",
      lastModifiedAt: null,
      lastModifiedBy: null,
      deletedAt: null,
      deletedBy: null,
      status: "New",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      rut: "98765432-1",
      email: "jane.smith@company.com",
      city: "Chicago",
      contactPlatform: "Email",
      budget: 8000,
      projectDescription: "Marketing campaign",
      expectedDate: "2024-04-30",
      deliveryStatus: "In Progress",
      workLine: "Marketing",
      inCharge: "David Kim",
      createdAt: "2024-03-18",
      createdBy: "System",
      lastModifiedAt: null,
      lastModifiedBy: null,
      deletedAt: null,
      deletedBy: null,
      status: "Active",
    },
    {
      id: 3,
      firstName: "Michael",
      lastName: "Brown",
      rut: "34567890-0",
      email: "michael.brown@business.org",
      city: "Los Angeles",
      contactPlatform: "Website",
      budget: 15000,
      projectDescription: "E-commerce platform development",
      expectedDate: "2024-05-10",
      deliveryStatus: "New",
      workLine: "Development",
      inCharge: "Alice Smith",
      createdAt: "2024-03-15",
      createdBy: "System",
      lastModifiedAt: null,
      lastModifiedBy: null,
      deletedAt: null,
      deletedBy: null,
      status: "New",
    },
    {
      id: 4,
      firstName: "Olivia",
      lastName: "Garcia",
      rut: "56789012-3",
      email: "olivia.garcia@gmail.com",
      city: "Houston",
      contactPlatform: "Phone",
      budget: 3000,
      projectDescription: "Logo design",
      expectedDate: "2024-04-05",
      deliveryStatus: "Completed",
      workLine: "Design",
      inCharge: "David Kim",
      createdAt: "2024-03-14",
      createdBy: "System",
      lastModifiedAt: null,
      lastModifiedBy: null,
      deletedAt: null,
      deletedBy: null,
      status: "Closed",
    },
    {
      id: 20,
      firstName: "Sarah",
      lastName: "Lee",
      rut: "98765432-1",
      email: "sarah.lee@company.com",
      city: "Los Angeles",
      contactPlatform: "Email",
      budget: 5000,
      projectDescription: "Mobile app design",
      expectedDate: "2024-05-01",
      deliveryStatus: "In Progress",
      workLine: "Design",
      inCharge: "David Kim",
      createdAt: "2024-03-18",
      createdBy: "System",
      lastModifiedAt: null,
      lastModifiedBy: null,
      deletedAt: null,
      deletedBy: null,
      status: "Active",
    },
  ];

}
