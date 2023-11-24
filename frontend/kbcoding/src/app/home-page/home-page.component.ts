import { Component } from '@angular/core';
import { ProjectType } from '../types/project-type';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  boxes: ProjectType[] = []
  constructor(private apiService: ApiService){}

  ngOnInit(){
    this.getprojectTypes();
  }

  getprojectTypes(){
    this.apiService.getprojectTypes().subscribe((projectTypes: ProjectType[]) => {
      this.boxes = projectTypes;
      this.boxes.sort((a: ProjectType, b: ProjectType) => a.id - b.id)
    })
  }
}
