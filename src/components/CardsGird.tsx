import { ChangeEvent, useContext, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Button, Card, CardContent, CardContentProps, Pagination, styled } from '@mui/material';
import PhotoData from './PhotoData';
import { useQuery } from '@tanstack/react-query';
import { defaultResultsNum } from '../common/constants';
import { countPhotos, fetchPhotos } from '../utils/services';
import { PhotoDataProps } from '../utils/interfaces';
import { CardContext } from './context/CardContext';

const CardsGrid = () => {
    const { card: newObj } = useContext(CardContext)

    const [pageNumber, setPageNumber] = useState(1)
    const [totalItems, setTotalItems] = useState(0)
    const [photos, setPhotos] = useState<PhotoDataProps[]>([])

    const { isLoading, data, isError, error } = useQuery(['getPhotos', pageNumber], () => fetchPhotos(pageNumber), { keepPreviousData: true })
    const { data: counter } = useQuery(['getTotalItems'], countPhotos, { keepPreviousData: true })


    useEffect(() => {
        if (data?.photos) setPhotos(data.photos)
    }, [data?.photos])

    useEffect(() => {
        if (counter && !totalItems) setTotalItems(counter)
    }, [counter])

    useEffect(() => {
        if (newObj.title && newObj.description && newObj.url) {
            const newCard = newObj as PhotoDataProps

            newCard.id = totalItems + 1
            newCard.user = -1

            setPhotos(prev => [newCard, ...prev as PhotoDataProps[]])
            setTotalItems(prev => prev + 1)            
        }
    }, [newObj])


    if (isLoading) return <h2>Loading...</h2>

    if (isError) return <h2>{(error as Error).message}</h2>

    const CardContentImp = styled(CardContent)<CardContentProps>(() => ({
        padding: '5px 5px 0 5px',
        '&:last-child': {
            paddingBottom: '10px'
        }
    }));

    const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
        setPageNumber(page)
    }
    const deletePhoto = (id: number) => {
        const updatedArr = photos.filter(photo => photo.id !== id)
        setPhotos(updatedArr)
        setTotalItems(prev => prev - 1)
    }

    return (
        <>
            {photos?.length ? <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={2}>
                        {photos.map((photo) => (
                            <Grid key={photo.id} item>
                                <Card
                                    sx={{
                                        height: 290.75,
                                        width: 300,
                                        backgroundColor: '#F3F4F6',
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}
                                ><CardContentImp  >
                                        <PhotoData {...photo} />
                                        <Button color='error' variant='outlined' fullWidth size='small' onClick={() => deletePhoto(photo.id)}>
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
            {totalItems ? <Pagination count={Math.ceil(totalItems / defaultResultsNum)} variant="outlined" shape="rounded" sx={{ display: 'inline-flex' }} onChange={handlePageChange} /> : null}
        </>
    );
}

export default CardsGrid