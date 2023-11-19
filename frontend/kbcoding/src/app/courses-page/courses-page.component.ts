import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Course } from '../types/course';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.css']
})
export class CoursesPageComponent {
  boxes: Course[] = []
  isFetching: boolean = false;

  constructor(private apiService: ApiService){}

  ngOnInit(){
    this.getCourseTypes();
  }

  getCourseTypes(){
    this.isFetching = true;
    this.apiService.getCourses().subscribe((courses: Course[]) => {
      this.boxes = courses;
    })
    this.isFetching = false;
  }
}
