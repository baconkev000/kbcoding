import { Component, OnInit } from '@angular/core';
import { Project } from '../types/project';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  project!: Project;
  projectId: number = 0;

  constructor(private apiService: ApiService, private route: ActivatedRoute){}

  ngOnInit(){
    this.projectId = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.getProjectById();
  }

  getProjectById(){
    this.apiService.getProjectById(this.projectId).subscribe((project: Project) =>{
      this.project = project;
    })
  }


}
