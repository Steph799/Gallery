import React, { ChangeEvent, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Button, Card, CardContent, CardContentProps, Pagination, styled } from '@mui/material';
import Photo, { PhotoProps } from './Photo';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { defaultResultsNum } from '../common/constants';

interface DataProps {
    photos: PhotoProps[]
    limit: number
    offset: number
    success: boolean
    message: string
}

const fetchPhotos = async (pageNumber: number) => {
    const response = await axios.get<DataProps>(`https://api.slingacademy.com/v1/sample-data/photos?offset=${(pageNumber - 1) * defaultResultsNum}&limit=${defaultResultsNum}`)
    return response.data
}

export default function CardsGrid() {
    const [pageNumber, setPageNumber] = useState(1)
    const { isLoading, data, isError, error } = useQuery(['getPhotos', pageNumber], () => fetchPhotos(pageNumber), { keepPreviousData: true })

    if (isLoading) return <h2>Loading...</h2>

    if (isError) return <h2>{(error as Error).message}</h2>

    const CardContentImp = styled(CardContent)<CardContentProps>(() => ({
        padding: 10,
        '&:last-child': {
            paddingBottom: '10px', // Add 10px of padding to the last child
        }
    }));

    const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
        setPageNumber(page)
    }
    const deletePhoto = (id: number) => {

    }

    return (
        <>
            {data?.photos.length ? <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={2}>
                        {data?.photos.map((photo) => (
                            <Grid key={photo.id} item>
                                <Card
                                    sx={{
                                        height: 295,
                                        width: 320,
                                        backgroundColor: '#F3F4F6',
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}
                                ><CardContentImp  >
                                        <Photo {...photo} />
                                        <Button color='error' variant='outlined' fullWidth size='small' onClick={() => deletePhoto(photo.id)} className='deleteBtn'>
                                            Delete photo
                                        </Button>
                                    </CardContentImp>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid> : <h2>No photos to display</h2>}

            <br />
            <Pagination count={100} variant="outlined" shape="rounded" sx={{ display: 'inline-flex' }} onChange={handlePageChange} />
        </>

    );
}