import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators} from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ProjectType } from '../types/project-type';
import { Project } from '../types/project';
import { APIProject } from '../types/api-project';

@Component({
  selector: 'app-add-project-page',
  templateUrl: './add-project-page.component.html',
  styleUrls: ['./add-project-page.component.css']
})
export class AddProjectPageComponent implements OnInit{
  showProjectInfo: boolean = true;
  showMediaInfo: boolean = false;
  file: File | null = null;
  projectTypes:ProjectType[] = [];

  constructor(private apiService: ApiService, private fb: FormBuilder){}

  ngOnInit(){
    this.getprojectTypes();
  }

  getprojectTypes(){
    this.apiService.getprojectTypes().subscribe((projectTypes: ProjectType[]) => {
      this.projectTypes = projectTypes;
      this.projectTypes.sort((a: ProjectType, b: ProjectType) => a.id - b.id)
    })
  }

  initMediaForm(){
    return this.fb.group({
      mediaName: ['', [Validators.required, Validators.minLength(4)]],
      media: [null, Validators.required]
    })
  }

  projectForm = this.fb.group({
    projectName: ['', [Validators.required, Validators.minLength(4)]],
    projectDescription: ['', [Validators.required, Validators.minLength(4)]],
    projectOverview: ['', [Validators.required, Validators.minLength(4)]],
    projectType:[1, Validators.required],
    media: this.fb.array([
      this.initMediaForm()
    ])
  });

  get media(): FormArray {
    return this.projectForm.get('media') as FormArray;
  }

  addMedia(){
    this.media.push(
      this.initMediaForm()
    );
  }

  removeMedia(mediaId:number){
    this.media.removeAt(mediaId);
  }

  toggleInfoToShow(info: string):void {
    if(info === "project"){
      this.showProjectInfo = true;
      this.showMediaInfo = false;
    }else if(info === "media"){
      this.showProjectInfo = false;
      this.showMediaInfo = true;
    }
  }

  onSubmit(){
    try{
      if(this.projectForm.invalid){
        return;
      }else{
        console.log("valid", this.projectForm.value)

        const valid_project: APIProject = {
          title: this.projectForm.value.projectName!,
          overview: this.projectForm.value.projectOverview!,
          description: this.projectForm.value.projectDescription!,
          project_type_id: this.projectForm.value.projectType!,
          
        }
        console.log("valid", valid_project)

        this.apiService.postProject(valid_project);
      }
      
    }catch(error){
      console.log(error);
    }
  }
}
