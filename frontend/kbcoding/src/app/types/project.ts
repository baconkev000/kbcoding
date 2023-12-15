import { ProjectType } from "./project-type"
import { Section } from "./section"

export interface Project {
    id: number,
    title: string,
    overview: string,
    description: string,
    completed: boolean,
    project_type: ProjectType,
    sections?: Section[],
}

