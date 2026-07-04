import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Project } from 'src/app/types/project';
import { ProjectType } from 'src/app/types/project-type';

@Component({
  selector: 'app-project-grid',
  templateUrl: './project-grid.component.html',
  styleUrls: ['./project-grid.component.css']
})
export class ProjectGridComponent implements OnInit {
  selectedTypeId: number | null = null;
  projectTypes: ProjectType[] = [];
  boxes: Project[] = [];
  filterdBoxes: Project[] = [];
  readonly allTabColor = '#EED17A';

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const rawType = params['currentType'];
      if (rawType !== undefined && rawType !== null && rawType !== '') {
        const parsed = parseInt(rawType, 10);
        this.selectedTypeId = Number.isNaN(parsed) ? null : parsed;
      } else {
        this.selectedTypeId = null;
      }
      this.applyFilter();
    });

    this.getProjects();
    this.getprojectTypes();
  }

  get activeColor(): string {
    if (this.selectedTypeId === null) {
      return this.allTabColor;
    }
    const type = this.projectTypes.find((projectType) => projectType.id === this.selectedTypeId);
    return type?.color ?? this.allTabColor;
  }

  getprojectTypes() {
    this.apiService.getprojectTypes().subscribe((projectTypes: ProjectType[]) => {
      this.projectTypes = projectTypes.sort((a: ProjectType, b: ProjectType) => a.id - b.id);
      this.applyFilter();
    });
  }

  getProjects() {
    this.apiService.getProjects().subscribe((projects: Project[]) => {
      this.boxes = projects;
      this.applyFilter();
    });
  }

  applyFilter() {
    if (this.selectedTypeId === null) {
      this.filterdBoxes = [...this.boxes];
      return;
    }

    this.filterdBoxes = this.boxes.filter(
      (project: Project) => project.project_type === this.selectedTypeId,
    );
  }

  updateFilteredBoxes(typeId: number | null) {
    if (typeId === null) {
      this.router.navigate(['/projects']);
      return;
    }

    this.router.navigate(['/projects'], { queryParams: { currentType: typeId } });
  }

  isAllSelected(): boolean {
    return this.selectedTypeId === null;
  }

  isTypeSelected(typeId: number): boolean {
    return this.selectedTypeId === typeId;
  }
}
