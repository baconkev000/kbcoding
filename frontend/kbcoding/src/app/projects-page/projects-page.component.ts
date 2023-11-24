import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Project } from '../types/project';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.css']
})
export class ProjectsPageComponent {
  boxes: Project[] = []
  isFetching: boolean = false;

  constructor(private apiService: ApiService){}

  ngOnInit(){
    this.getprojectTypes();
  }

  getprojectTypes(){
    this.isFetching = true;
    this.apiService.getProjects().subscribe((projects: Project[]) => {
      this.boxes = projects;
    })
    this.isFetching = false;
  }
}
