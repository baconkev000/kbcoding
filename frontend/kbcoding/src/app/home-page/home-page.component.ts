import { Component } from '@angular/core';
import { CourseType } from '../types/course-type';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  boxes: CourseType[] = []
  isFetching: boolean = false;
  constructor(private apiService: ApiService){}

  ngOnInit(){
    this.getCourseTypes();
  }

  getCourseTypes(){
    this.isFetching = true;
    this.apiService.getCourseTypes().subscribe((courseTypes: CourseType[]) => {
      this.boxes = courseTypes;
    })
    this.isFetching = false;
  }
}
