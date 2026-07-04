export interface ProjectMedia {
    id?: number,
    name: string,
    url: string,
}

export interface ProjectMediaUpload {
    name: string,
    url: File,
}
