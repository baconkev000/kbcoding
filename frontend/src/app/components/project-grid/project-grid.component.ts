import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Project } from 'src/app/types/project';
import { ProjectType } from 'src/app/types/project-type';

@Component({
  selector: 'app-project-grid',
  templateUrl: './project-grid.component.html',
  styleUrls: ['./project-grid.component.css']
})
export class ProjectGridComponent implements OnInit{
  currentTypeID: number = 1;
  currentType!: ProjectType;
  projectTypes: ProjectType[] = [];
  boxes: Project[] = [];
  filterdBoxes: Project[] = [];

  constructor(private apiService: ApiService, private route: ActivatedRoute){}

  ngOnInit(){
    this.route.queryParams.subscribe( 
      params => { 
        if(params['currentType'] !== undefined){
          this.currentTypeID = parseInt(params['currentType']); 
        }
      } 
    ) 
    this.getProjects();
    this.getprojectTypes();
  }
  // ngrx this
  getprojectTypes(){
    this.apiService.getprojectTypes().subscribe((projectTypes: ProjectType[]) => {
      this.projectTypes = projectTypes;
      this.projectTypes.sort((a: ProjectType, b: ProjectType) => a.id - b.id);
      this.currentType = this.getPType(this.currentTypeID);
    })
  }
  getProjects(){
    this.apiService.getProjects().subscribe((projects: Project[]) => {
      this.boxes = projects;
      this.filterdBoxes = projects.filter((project: Project) => project.project_type === this.currentTypeID)
    })
  }

  getPType(id: number){
    const tempType = this.projectTypes.find((pType: ProjectType) => pType.id == id);
    return tempType !== undefined ? tempType : this.projectTypes[0];
  }

  updateFilteredBoxes(id: number){
    this.currentType = this.getPType(id);
    this.filterdBoxes = this.boxes.filter((project: Project) => project.project_type === id);
  }
}
