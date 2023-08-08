import axios from "axios";
import { useQuery, QueryKey, QueryFunction, UseQueryResult, useMutation, QueryFunctionContext, MutationFunction, MutationKey, UseQueryOptions, QueryOptions, UseMutateFunction, UseMutationOptions } from '@tanstack/react-query'



// const fetchPhotos = async() => {
//     const response= await axios.get<PhotoProps[]>('https://api.slingacademy.com/v1/sample-data/photos')
//     return response.data
// }