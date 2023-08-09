export interface PhotoDataProps {
    title: string,
    user: number,
    id: number,
    description: string,
    url: string
}


export interface DataProps {
    photos: PhotoDataProps[]
    limit: number
    offset: number
    success: boolean
    message: string
}