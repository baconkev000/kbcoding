import { Component, OnInit } from '@angular/core';
import { Project } from '../types/project';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import {ProjectMedia} from '../types/project_media';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  project!: Project;
  projectId: number = 0;
  currentMedia!: ProjectMedia | null;

  constructor(private apiService: ApiService, private route: ActivatedRoute){}

  ngOnInit(){
    this.projectId = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.getProjectById();
  }

  getProjectById(){
    this.apiService.getProjectById(this.projectId).subscribe((project: Project) =>{
      this.project = project;
      this.currentMedia = project.media.length > 0 ? project.media[0] : null;
    })
  }

  updateCurrentMedia(id: number){
    this.currentMedia = this.project.media[id];
  }
}
