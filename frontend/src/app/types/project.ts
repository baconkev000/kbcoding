import { ProjectMedia } from "./project_media"

export interface Project {
    id: number,
    title: string,
    role?: string,
    platform?: string,
    tech?: string[],
    project_url?: string,
    github_url?: string,
    overview: string,
    description: string,
    project_type: number,
    project_type_name?: string,
    display_mode?: 'media' | 'web_game',
    game_url?: string,
    tags?: string[],
    media: ProjectMedia[],
}

