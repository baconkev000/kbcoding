import { ProjectMedia } from "./project_media"

export interface APIProject {
    title: string,
    overview: string,
    description: string,
    project_type: number,
    media: File[]
}