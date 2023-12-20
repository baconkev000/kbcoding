import { ProjectType } from "./project-type"

export interface Project {
    id: number,
    title: string,
    overview: string,
    description: string,
    project_type: ProjectType,
}

