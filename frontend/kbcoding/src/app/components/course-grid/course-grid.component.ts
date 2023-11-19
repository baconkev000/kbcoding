import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Course } from 'src/app/types/course';
import { CourseType } from 'src/app/types/course-type';

@Component({
  selector: 'app-course-grid',
  templateUrl: './course-grid.component.html',
  styleUrls: ['./course-grid.component.css']
})
export class CourseGridComponent implements OnInit{
  @Input() currentType?: number = 1;
  courseTypes: CourseType[] = [];
  boxes: Course[] = [];
  filterdBoxes: Course[] = [];

  constructor(private apiService: ApiService){}

  ngOnInit(){
    this.getCourses();
    this.getCourseTypes();

  }
  // ngrx this
  getCourseTypes(){
    this.apiService.getCourseTypes().subscribe((courseTypes: CourseType[]) => {
      this.courseTypes = courseTypes;
    })
  }
  getCourses(){
    this.apiService.getCourses().subscribe((courses: Course[]) => {
      this.boxes = courses;
      this.filterdBoxes = courses.filter((course: Course) => course.course_type.id === this.currentType)
    })
  }

  updateFilteredBoxes(id: number){
    this.currentType = id;
    this.filterdBoxes = this.boxes.filter((course: Course) => course.course_type.id === id)
  }
}
