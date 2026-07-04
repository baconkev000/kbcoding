import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ProjectType } from '../types/project-type';
import { APIProject } from '../types/api-project';
import { ProjectMediaUpload } from '../types/project_media';

@Component({
  selector: 'app-add-project-page',
  templateUrl: './add-project-page.component.html',
  styleUrls: ['./add-project-page.component.css']
})
export class AddProjectPageComponent implements OnInit{
  showProjectInfo: boolean = true;
  showMediaInfo: boolean = false;
  showGameInfo: boolean = false;
  projectTypes:ProjectType[] = [];
  selectedMediaIndexes = new Set<number>();
  displayMode: 'media' | 'web_game' = 'media';
  gameZipFile: File | null = null;

  projectTags: string[] = [];
  projectTagInput = '';
  availableTags: string[] = [];

  constructor(private apiService: ApiService, private fb: FormBuilder){}

  ngOnInit(){
    this.getprojectTypes();
    this.loadAvailableTags();
  }

  getprojectTypes(){
    this.apiService.getprojectTypes().subscribe((projectTypes: ProjectType[]) => {
      this.projectTypes = projectTypes;
      this.projectTypes.sort((a: ProjectType, b: ProjectType) => a.id - b.id)
    })
  }

  loadAvailableTags(): void {
    this.apiService.getTags().subscribe((tags) => {
      this.availableTags = tags.map((tag) => tag.name).sort((a, b) => a.localeCompare(b));
    });
  }

  initMediaForm(){
    return this.fb.group({
      mediaName: [''],
      media: [null as File | null]
    })
  }

  projectForm = this.fb.group({
    projectName: [''],
    projectRole: [''],
    projectPlatform: [''],
    projectUrl: [''],
    githubUrl: [''],
    projectDescription: [''],
    projectOverview: [''],
    projectType:[null as number | null],
    media: this.fb.array([])
  });

  techTags: string[] = [];
  techInput = '';

  private getSelectedProjectType(): ProjectType | undefined {
    const typeId = this.projectForm.get('projectType')?.value;
    return this.projectTypes.find((type) => type.id === typeId);
  }

  get isBuildsProject(): boolean {
    return this.getSelectedProjectType()?.name === 'Builds';
  }

  get isCreativeProject(): boolean {
    return this.getSelectedProjectType()?.name === 'Creative';
  }

  get isLifeProject(): boolean {
    return this.getSelectedProjectType()?.name === 'Life / Other';
  }

  get showProjectUrlField(): boolean {
    return this.isBuildsProject;
  }

  get showGithubUrlField(): boolean {
    return this.isBuildsProject;
  }

  get showPlatformTechFields(): boolean {
    return this.isBuildsProject;
  }

  get isWebGameMode(): boolean {
    return this.isBuildsProject && this.displayMode === 'web_game';
  }

  get isMediaMode(): boolean {
    return !this.isBuildsProject || this.displayMode === 'media';
  }

  onProjectTypeChange(): void {
    if (!this.isBuildsProject) {
      this.projectForm.patchValue({ projectRole: '', projectUrl: '', githubUrl: '', projectPlatform: '' });
      this.techTags = [];
      this.techInput = '';
      this.displayMode = 'media';
      this.gameZipFile = null;
    }
  }

  onDisplayModeChange(mode: 'media' | 'web_game'): void {
    this.displayMode = mode;
    if (mode === 'web_game') {
      this.media.clear();
      this.selectedMediaIndexes.clear();
      this.showProjectInfo = false;
      this.showMediaInfo = false;
      this.showGameInfo = true;
    } else {
      this.gameZipFile = null;
      this.showGameInfo = false;
    }
  }

  onGameZipSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    if (file && !file.name.toLowerCase().endsWith('.zip')) {
      console.error('Please select a .zip file.');
      input.value = '';
      this.gameZipFile = null;
      return;
    }
    this.gameZipFile = file;
  }

  addProjectTag(): void {
    const tag = this.projectTagInput.trim();
    if (!tag || this.projectTags.includes(tag)) {
      this.projectTagInput = '';
      return;
    }
    this.projectTags = [...this.projectTags, tag];
    if (!this.availableTags.includes(tag)) {
      this.availableTags = [...this.availableTags, tag].sort((a, b) => a.localeCompare(b));
    }
    this.projectTagInput = '';
  }

  removeProjectTag(tag: string): void {
    this.projectTags = this.projectTags.filter((item) => item !== tag);
  }

  onProjectTagInputKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.addProjectTag();
    }
  }

  addTechTag(): void {
    const tag = this.techInput.trim();
    if (!tag || this.techTags.includes(tag)) {
      this.techInput = '';
      return;
    }
    this.techTags = [...this.techTags, tag];
    this.techInput = '';
  }

  removeTechTag(tag: string): void {
    this.techTags = this.techTags.filter((item) => item !== tag);
  }

  onTechInputKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.addTechTag();
    }
  }

  get media(): FormArray {
    return this.projectForm.get('media') as FormArray;
  }

  onBulkFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    Array.from(input.files).forEach((file) => {
      this.media.push(this.fb.group({
        mediaName: [file.name.replace(/\.[^/.]+$/, '')],
        media: [file]
      }));
    });

    input.value = '';
  }

  toggleMediaSelection(index: number, checked: boolean) {
    if (checked) {
      this.selectedMediaIndexes.add(index);
    } else {
      this.selectedMediaIndexes.delete(index);
    }
  }

  deleteSelectedMedia() {
    Array.from(this.selectedMediaIndexes)
      .sort((a, b) => b - a)
      .forEach((index) => this.media.removeAt(index));
    this.selectedMediaIndexes.clear();
  }

  toggleInfoToShow(info: string):void {
    if(info === "project"){
      this.showProjectInfo = true;
      this.showMediaInfo = false;
      this.showGameInfo = false;
    }else if(info === "media"){
      this.showProjectInfo = false;
      this.showMediaInfo = true;
      this.showGameInfo = false;
    }else if(info === "game"){
      this.showProjectInfo = false;
      this.showMediaInfo = false;
      this.showGameInfo = true;
    }
  }

  onSubmit() {
    try {
        let valid_media: ProjectMediaUpload[] = [];

        this.media.controls.forEach((control) => {
            const mediaName = control.get('mediaName')?.value as string;
            const mediaFile = control.get('media')?.value as File | null;
            if (mediaFile) {
                valid_media.push({
                    name: mediaName || mediaFile.name,
                    url: mediaFile,
                });
            }
        });

        const valid_project: APIProject = {
            title: this.projectForm.value.projectName || '',
            overview: this.projectForm.value.projectOverview || '',
            description: this.projectForm.value.projectDescription || '',
            media: this.isWebGameMode ? [] : valid_media,
            project_type: this.projectForm.value.projectType!,
            display_mode: this.isBuildsProject ? this.displayMode : 'media',
        };

        if (this.projectTags.length) {
            valid_project.tags = [...this.projectTags];
        }

        if (this.isWebGameMode) {
            if (!this.gameZipFile) {
                console.error('A zip file is required for playable web game projects.');
                return;
            }
            valid_project.game_zip = this.gameZipFile;
        }

        if (this.isBuildsProject && this.projectForm.value.projectRole) {
            valid_project.role = this.projectForm.value.projectRole!;
        }
        if (this.showProjectUrlField && this.projectForm.value.projectUrl) {
            valid_project.project_url = this.projectForm.value.projectUrl!;
        }
        if (this.showGithubUrlField && this.projectForm.value.githubUrl) {
            valid_project.github_url = this.projectForm.value.githubUrl!;
        }
        if (this.showPlatformTechFields && this.projectForm.value.projectPlatform) {
            valid_project.platform = this.projectForm.value.projectPlatform!;
        }
        if (this.showPlatformTechFields && this.techTags.length) {
            valid_project.tech = [...this.techTags];
        }

        this.apiService.postProject(valid_project).subscribe({
            next: (res) => console.log("Success:", res),
            error: (err) => console.error("Error:", err),
        });

    } catch (error) {
        console.log(error);
    }
  }

}
