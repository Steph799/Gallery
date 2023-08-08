import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Card, CardContent, CardContentProps, Pagination, styled } from '@mui/material';
import Photo, { PhotoProps } from './Photo';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface DataProps {
    photos: PhotoProps[]
    limit: number
    offset: number
    success: boolean
    message: string
}

const fetchPhotos = async () => {
    const response = await axios.get<DataProps>('https://api.slingacademy.com/v1/sample-data/photos')
    return response.data
}

export default function CardsGrid() {
    const { isLoading, data, isError, error } = useQuery(['getPhotos'], fetchPhotos)

    if (isLoading) return <h2>Loading...</h2>

    if (isError) return <h2>{(error as Error).message}</h2>

    const CardContentImp = styled(CardContent)<CardContentProps>(() => ({
        padding: 10,
        '&:last-child': {
            paddingBottom: '10px', // Add 10px of padding to the last child
        }
    }));

    return (
        <>
            <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={2}>
                        {data?.photos.map((photo) => (
                            <Grid key={photo.id} item>
                                <Card
                                    sx={{
                                        height: 285,
                                        width: 320,
                                        backgroundColor: '#F3F4F6'
                                    }}
                                ><CardContentImp >
                                        <Photo {...photo} />
                                    </CardContentImp>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
<br/>
            <Pagination count={10} variant="outlined" shape="rounded" sx={{display:'inline-flex'}}/>
        </>

    );
}