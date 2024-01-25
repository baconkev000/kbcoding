import { ProjectMedia } from "./project_media"

export interface Project {
    id: number,
    title: string,
    overview: string,
    description: string,
    project_type: number,
    media: ProjectMedia[],
}

