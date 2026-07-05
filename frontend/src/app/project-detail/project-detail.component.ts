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
  @ViewChild('mainVideo') mainVideo?: ElementRef<HTMLVideoElement>;

  project!: Project;
  projectId: number = 0;
  currentMediaIndex: number = 0;
  activeVideoSrc: string | null = null;
  loadedVideoIndex: number | null = null;
  isVideoLoading = false;

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

  get isCurrentVideoLoaded(): boolean {
    return this.loadedVideoIndex === this.currentMediaIndex && !!this.activeVideoSrc;
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

  get portfolioQueryParams(): { currentType: number } | null {
    if (!this.project?.project_type) {
      return null;
    }
    return { currentType: this.project.project_type };
  }

  getProjectById(){
    this.apiService.getProjectById(this.projectId).subscribe((project: Project) =>{
      this.project = project;
      this.currentMediaIndex = 0;
      this.resetVideo();
    })
  }

  updateCurrentMedia(index: number){
    if (this.currentMediaIndex === index) {
      return;
    }
    this.resetVideo();
    this.currentMediaIndex = index;
  }

  previousMedia(){
    if (!this.project?.media?.length) return;
    this.resetVideo();
    this.currentMediaIndex =
      (this.currentMediaIndex - 1 + this.project.media.length) % this.project.media.length;
  }

  nextMedia(){
    if (!this.project?.media?.length) return;
    this.resetVideo();
    this.currentMediaIndex = (this.currentMediaIndex + 1) % this.project.media.length;
  }

  loadCurrentVideo(): void {
    const media = this.currentMedia;
    if (!media || !this.isVideoMedia(media)) {
      return;
    }

    this.isVideoLoading = true;
    this.activeVideoSrc = this.mediaUrl(media.url);
    this.loadedVideoIndex = this.currentMediaIndex;
  }

  onVideoCanPlay(): void {
    this.isVideoLoading = false;
    const video = this.mainVideo?.nativeElement;
    video?.play().catch(() => {
      this.isVideoLoading = false;
    });
  }

  onVideoError(): void {
    this.isVideoLoading = false;
  }

  resetVideo(): void {
    const video = this.mainVideo?.nativeElement;
    if (video) {
      video.pause();
      video.removeAttribute('src');
      video.load();
    }
    this.activeVideoSrc = null;
    this.loadedVideoIndex = null;
    this.isVideoLoading = false;
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

  isVideoMedia(media: ProjectMedia): boolean {
    return media.is_video ?? this.isVideo(this.mediaUrl(media.url));
  }

  posterUrl(media: ProjectMedia): string {
    return media.poster ? this.mediaUrl(media.poster) : '';
  }

  thumbUrl(media: ProjectMedia): string {
    if (media.thumbnail) {
      return this.mediaUrl(media.thumbnail);
    }
    if (this.posterUrl(media)) {
      return this.posterUrl(media);
    }
    if (!this.isVideoMedia(media)) {
      return this.mediaUrl(media.url);
    }
    return '';
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
