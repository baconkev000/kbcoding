import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators} from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ProjectType } from '../types/project-type';
import { Project } from '../types/project';
import { APIProject } from '../types/api-project';
import { ProjectMedia } from '../types/project_media';

@Component({
  selector: 'app-add-project-page',
  templateUrl: './add-project-page.component.html',
  styleUrls: ['./add-project-page.component.css']
})
export class AddProjectPageComponent implements OnInit{
  showProjectInfo: boolean = true;
  showMediaInfo: boolean = false;
  file: File | null = null;
  files: FileList | null = null;
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

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
        this.projectForm.patchValue({ media: Array.from(input.files) });
    }
}

  
  onSubmit() {
    try {
        if (this.projectForm.invalid) {
            alert("Please fill out all required fields");
            return;
        } 

        let valid_media: ProjectMedia[] = [];

        if (this.projectForm.value.media) {
            this.projectForm.value.media.forEach(m => {
                valid_media.push({
                    name: m.mediaName!,
                    url: m.media! as File  // Ensure it's a file
                });
            });
        }

        const valid_project: APIProject = {
            title: this.projectForm.value.projectName!,
            overview: this.projectForm.value.projectOverview!,
            description: this.projectForm.value.projectDescription!,
            media: valid_media,
            project_type: this.projectForm.value.projectType!,
        };

        console.log("Valid project", valid_project);
        console.log("Valid media", valid_media);

        this.apiService.postProject(valid_project).subscribe({
            next: (res) => console.log("Success:", res),
            error: (err) => console.error("Error:", err),
        });

    } catch (error) {
        console.log(error);
    }
  }

}
