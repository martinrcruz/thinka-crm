import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Project, ProjectDetail } from '../../../models/Project';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, of } from 'rxjs';
import { Customer } from 'src/app/modules/contacts/models/Customer';
import { TaskService } from '../../../services/task.service';
import { TaskModalComponent } from '../../../components/task-modal/task-modal.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
})
export class ProjectDetailComponent implements OnInit {
  dataSource: any;

  displayedColumns: string[] = [
    'id',
    'title',
    'status',
    'inCharge',
    'createdAt',
    'view',
    'edit',
    'delete',
  ];

  project: Project = {} as Project

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  loading: boolean = false;
  projectId: number | string = 0;

  constructor(
    private _task: TaskService,
    private _project: ProjectService,
    private _dialog: MatDialog,
    private _router: Router,
    private _activeRouter: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this._activeRouter.queryParams.subscribe(params => {
      this.projectId = params['id'];
    });

    if(this.projectId != 0) {
      this.getProjectById(Number(this.projectId));
      this.listTasks();
    } else {
      alert('error')
    }
  }

  getProjectById(id: number) {
    this._project.getProjectById(id)
      .subscribe({
        next: (res) => {
          this.project = res;
        },
        error: (err) => {
          console.log(err)
        }
      })
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
      .subscribe((response: Customer[]) => {
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
    dialogRef.afterClosed().subscribe(() => { });
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
              this.listTasks();
            }
          });
      }
    });
  }

}







