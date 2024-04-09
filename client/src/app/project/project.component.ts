import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project, Status, Tag } from '../shared/models/interfaces';
import { TagService } from '../shared/services/tag.service';
import { StatusService } from '../shared/services/status.service';
import { ProjectService } from '../shared/services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
  projectForm!: FormGroup;
  tags: Tag[] = [];
  listOfStatus: Status[] = [];
  constructor(private fb: FormBuilder, private tagSvc: TagService, private statusSvc: StatusService, private projectSvc: ProjectService) { }

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      status: ['', [Validators.required]],
      dateCreated: [new Date(), [Validators.required]],
      dateExpiration: [new Date(), [Validators.required]],
      tags: [[]]
    });

    this.tagSvc.findAll().subscribe(data => this.tags = data);
    this.statusSvc.getAll().subscribe(data => this.listOfStatus = data);
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      const { title, description, status, dateCreated, dateExpiration, tags } = this.projectForm.value;
    
      let project = {
        title: title,
        description: description,
        dateCreated: dateCreated,
        dateExpiration: dateExpiration,
        tags: tags,
        state: status,
      } as Project

      this.projectSvc.create(project).subscribe(res => console.log(res));

      this.projectForm.reset();
    }
  }
}
