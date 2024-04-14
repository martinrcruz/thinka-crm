import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, of } from 'rxjs';
import Swal from 'sweetalert2';

import { Project, ProjectData } from '../../../models/Project';
import { ProjectModalComponent } from '../../../components/project-modal/project-modal.component';
import { ProjectService } from '../../../services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent {

  dataSource: any;
  displayedColumns: string[] = ['id', 'title', 'shortDesc', 'deliveryStatus', 'inCharge', 'expectedDate', 'edit', 'delete'];

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  projects: Project[] = [];
  pageNumber: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  maxSize: number = 5;
  search: string = '';
  loading: boolean = false;

  constructor(
    private _dialog: MatDialog,
    private _project: ProjectService,
    private _router: Router
  ) {
  }

  ngOnInit() {
    this.listProjects();
  }

  listProjects() {
    this.loading = true;
    this._project
      .listProjects()
      .pipe(catchError((error) => of({ dto: [], codError: error, codErrorDesc: error.descError })))
      .subscribe((response: Project[]) => {
        console.log(response);
        this.projects = response;
      })
      .add(() => {
        this.loading = false;
      });
  }

  goToProjectDetail(id: number | string) {
    this._router.navigate(['/projects/project-detail'], {
      queryParams: { id: id },
    });
  }

  openDialog(id: number | string | null) {
    const dialogRef = this._dialog.open(ProjectModalComponent, {
      width: '1200px',
      height: '700px',
      data: {
        id: id
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.listProjects();
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
        this._project.deleteProject(id)
          .pipe(
            catchError((error) => {
              Swal.fire('Error al eliminar registro', error.message, 'error');
              return of(null);
            }),
          )
          .subscribe((response: string | null) => {
            if (response) {
              Swal.fire("Registro eliminado con exito", "", "success");
              this.listProjects();
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
