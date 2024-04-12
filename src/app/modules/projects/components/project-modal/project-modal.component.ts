import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Project, ProjectData } from '../../models/Project';
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
    id: [''],
    title: [''],
    description: [''],
    inCharge: [''],
    startDate: [''],
    endDate: [''],
    status: [''],
    image: [''],
    createdAt: [''],
    createdBy: [''],
    lastModifiedAt: [''],
    lastModifiedBy: [''],
    resume: [''],
    objectives: [''],
    domain: [''],
    priority: [''],
    tags: [''],
    tasks: [''],
    files: ['']
  });

  project: Project = {
    id: 0,
    title: '',
    description: '',
    inCharge: '',
    startDate: '',
    endDate: '',
    status: '',
    image: '',
    createdAt: '',
    createdBy: '',
    lastModifiedAt: '',
    lastModifiedBy: '',
    resume: '',
    objectives: '',
    domain: '',
    priority: '',
    tags: '',
    tasks: [],
    files: []
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
        console.log(response)
        this.projectForm.setValue({
          id: this.data.id,
          title: this.project.title,
          inCharge: this.project.inCharge,
          startDate: this.project.startDate,
          endDate: this.project.endDate,
          description: this.project.description,
          status: this.project.status,
          image: this.project.image,
          createdAt: this.project.createdAt,
          createdBy: this.project.createdBy,
          lastModifiedAt: this.project.lastModifiedAt,
          lastModifiedBy: this.project.lastModifiedBy,
          resume: this.project.resume,
          objectives: this.project.objectives,
          domain: this.project.domain,
          priority: this.project.priority,
          tags: this.project.tags,
          tasks: "",
          files: ""
        })
      })
  }

  createOrUpdate() {
    const request: ProjectData = {
      id: this.data.id,
      title: this.projectForm.value.title!,
      inCharge: this.projectForm.value.inCharge!,
      description: this.projectForm.value.description!,
      status: this.projectForm.value.status!,
      image: this.projectForm.value.image!,
      resume: this.projectForm.value.resume!,
      objectives: this.projectForm.value.objectives!,
      domain: this.projectForm.value.domain!,
      priority: this.projectForm.value.priority!,
      tags: this.projectForm.value.tags!,
      tasks: [],
      files: []
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
