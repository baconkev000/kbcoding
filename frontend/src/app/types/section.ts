import { Video } from "./video";

export interface Section {
    id: number,
    name: string,
    videos?: Video[],
}
