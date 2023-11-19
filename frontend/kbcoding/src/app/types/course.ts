import { CourseType } from "./course-type"
import { Section } from "./section"

export interface Course {
    id: number,
    name: string,
    description: string,
    completed: boolean,
    course_type: CourseType,
    sections?: Section[],
}

