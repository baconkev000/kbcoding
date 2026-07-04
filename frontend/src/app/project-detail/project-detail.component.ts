import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Project } from '../types/project';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { ProjectMedia } from '../types/project_media';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  @ViewChild('gameContainer') gameContainer?: ElementRef<HTMLDivElement>;

  project!: Project;
  projectId: number = 0;
  currentMediaIndex: number = 0;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(){
    this.projectId = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.getProjectById();
  }

  get isWebGame(): boolean {
    return this.project?.display_mode === 'web_game';
  }

  get currentMedia(): ProjectMedia | null {
    if (!this.project?.media?.length) {
      return null;
    }
    return this.project.media[this.currentMediaIndex] ?? this.project.media[0];
  }

  get showPlatformTech(): boolean {
    return this.project?.project_type_name === 'Builds';
  }

  get gameEmbedUrl(): SafeResourceUrl | null {
    if (!this.project?.game_url) {
      return null;
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.project.game_url);
  }

  getProjectById(){
    this.apiService.getProjectById(this.projectId).subscribe((project: Project) =>{
      this.project = project;
      this.currentMediaIndex = 0;
    })
  }

  updateCurrentMedia(index: number){
    this.currentMediaIndex = index;
  }

  previousMedia(){
    if (!this.project?.media?.length) return;
    this.currentMediaIndex =
      (this.currentMediaIndex - 1 + this.project.media.length) % this.project.media.length;
  }

  nextMedia(){
    if (!this.project?.media?.length) return;
    this.currentMediaIndex = (this.currentMediaIndex + 1) % this.project.media.length;
  }

  toggleFullscreen(): void {
    const element = this.gameContainer?.nativeElement;
    if (!element) return;

    if (!document.fullscreenElement) {
      element.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }

  isVideo(url: string): boolean {
    return /\.(mp4|webm|mov|avi|mkv|ogg)$/i.test(url);
  }

  mediaUrl(url: string): string {
    if (!url) return '';
    if (url.startsWith('/')) return url;
    try {
      const parsed = new URL(url);
      return parsed.pathname;
    } catch {
      return url;
    }
  }
}
