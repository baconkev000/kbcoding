import { ProjectMediaUpload } from "./project_media"

export interface APIProject {
    title: string,
    role?: string,
    platform?: string,
    tech?: string[],
    project_url?: string,
    github_url?: string,
    overview: string,
    description: string,
    project_type?: number | null,
    display_mode?: 'media' | 'web_game',
    game_zip?: File,
    tags?: string[],
    media: ProjectMediaUpload[]
}