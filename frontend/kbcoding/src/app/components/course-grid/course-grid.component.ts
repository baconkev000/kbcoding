import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CourseType } from 'src/app/types/course-type';

@Component({
  selector: 'app-course-grid',
  templateUrl: './course-grid.component.html',
  styleUrls: ['./course-grid.component.css']
})
export class CourseGridComponent {
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
