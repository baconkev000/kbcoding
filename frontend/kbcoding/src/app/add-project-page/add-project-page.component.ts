import { Component } from '@angular/core';
import { FormBuilder, FormArray, Validators,} from '@angular/forms';

@Component({
  selector: 'app-add-project-page',
  templateUrl: './add-project-page.component.html',
  styleUrls: ['./add-project-page.component.css']
})
export class AddProjectPageComponent {
  constructor(private fb: FormBuilder){}

  showProjectInfo: boolean = true;
  showSectionInfo: boolean = false;

  initVideoForm(){
    return this.fb.group({
      videoName: ['', Validators.required]
    })
  }

  initSectionForm(){
    return this.fb.group({
      sectionName: ['', Validators.required],
      videos: this.fb.array([
      ])
    })
  }

  projectForm = this.fb.group({
    projectName: ['', Validators.required],
    projectDescription: ['', Validators.required],
    projectOverview: ['', Validators.required],
    sections: this.fb.array([
      this.initSectionForm()
    ])
  });

  get sections(): FormArray {
    return this.projectForm.get('sections') as FormArray;
  }

  addSection(){
    this.sections.push(
      this.initSectionForm()
    );
  }

  getVideos(form:any) {
    return form.controls.videos.controls;
  }

  addVideo(i:number){
    let control = this.sections.controls[i].get('videos') as FormArray;
    control.push(this.initVideoForm());
  }

  toggleInfoToShow(info: string):void {
    if(info === "project"){
      this.showProjectInfo = true;
      this.showSectionInfo = false;
    }else if(info === "section"){
      this.showProjectInfo = false;
      this.showSectionInfo = true;
    }
  }


  onSubmit(){
    console.log("submit", this.projectForm.value);
  }
}
