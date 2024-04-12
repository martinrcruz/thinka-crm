import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { Customer } from 'src/app/modules/contacts/models/Customer';
import Swal from 'sweetalert2';
import { TaskModalComponent } from '../../../components/task-modal/task-modal.component';
import { TaskService } from '../../../services/task.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TaskData } from '../../../models/Task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  dataSource: any;
  displayedColumns: string[] = [
    'id',
    'title',
    'description',
    'status',
    'project',
    'inCharge',
    'createdAt',
    'view',
    'edit',
    'delete',
  ];
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  loading: boolean = false;

  constructor(
    private _task: TaskService,
    private _dialog: MatDialog,
    private _router: Router
  ) {
    this.listTasks();
  }

  listTasks() {
    this.loading = true;
    this._task
      .listTasks()
      .pipe(
        catchError((error) =>
          of({ dto: [], codError: error, codErrorDesc: error.descError })
        )
      )
      .subscribe((response: TaskData[]) => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
      .add(() => {
        this.loading = false;
      });
  }

  goToTaskDetail(id: number) {
    this._router.navigate(['/projects/task-detail'], {
      queryParams: { id: id },
    });
  }

  openDialog(id: number | null) {
    const dialogRef = this._dialog.open(TaskModalComponent, {
      width: '1200px',
      height: '720px',
      data: {
        id: id,
      },
    });
    dialogRef.afterClosed().subscribe(() => {});
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
        this._task
          .deleteTask(id)
          .pipe(
            catchError((error) => {
              Swal.fire('Error al eliminar registro', error.message, 'error');
              return of(null);
            })
          )
          .subscribe((response: string | null) => {
            if (response) {
              Swal.fire('Registro eliminado con exito', '', 'success');
              // this.listCustomers();
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
