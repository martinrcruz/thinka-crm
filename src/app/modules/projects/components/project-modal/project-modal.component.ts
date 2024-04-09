import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Project } from '../../models/Project';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.scss']
})
export class ProjectModalComponent {
  statusList = ['New', 'In Progress', 'Done'];

  action: string = "";

  projectForm = this._form.group({
    title: [''],
    longDescription: [''],
    shortDescription: [''],
    deliveryStatus: [''],
    inCharge: [''],
    expectedDate: [''],
    projectDescription: [''],
    status: [''],
  });

  project: Project = {
    id: '',
    title: '',
    shortDescription: '',
    longDescription: '',
    deliveryStatus: '',
    inCharge: '',
    expectedDate: '',
    status: ''
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ProjectModalComponent>,
    private _form: FormBuilder,
    private _project: ProjectService
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
    this._project.getProjectById(this.data.id)
      .subscribe((response: Project) => {
        this.project = response;
        this.projectForm.setValue({
          title: this.project.title,
          longDescription: this.project.longDescription,
          shortDescription: this.project.shortDescription,
          deliveryStatus: this.project.deliveryStatus,
          inCharge: this.project.inCharge,
          expectedDate: this.project.expectedDate,
          projectDescription: this.project.longDescription,
          status: this.project.status
        })
      })
  }

  createOrUpdate() {
    const request: Project = {
      id: this.data.id,
      title: this.project.title,
      shortDescription: this.project.shortDescription,
      deliveryStatus: this.project.deliveryStatus,
      inCharge: this.project.inCharge,
      expectedDate: this.project.expectedDate,
      longDescription: this.project.longDescription,
      status: this.project.status
    };

    if (this.data.id != null) {
      this._project.updateProject(request)
        .subscribe(() => {
          this.dialogRef.close();
        })
    } else {
      this._project.createProject(request)
        .subscribe(() => {
          this.dialogRef.close();
        })
    }
  }
}
