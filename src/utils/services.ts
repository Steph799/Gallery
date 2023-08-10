import axios from "axios";
import { baseUrl, defaultResultsNum } from "../common/constants";
import { DataProps } from "./interfaces";

export const fetchPhotos = async (pageNumber: number) => {
    const response = await axios.get<DataProps>(`${baseUrl}offset=${(pageNumber - 1) * defaultResultsNum}&limit=${defaultResultsNum}`)
    return response.data
}

export const countPhotos = async () => {
    const response = await axios.get<DataProps>(`${baseUrl}limit=-1`)
    return response.data.photos.length
}