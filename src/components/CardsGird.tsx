import React, { ChangeEvent, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Alert, AlertTitle, Button, Card, CardContent, CardContentProps, DialogActions, Pagination, styled } from '@mui/material';
import PhotoData from './PhotoData';
import { useQuery } from '@tanstack/react-query';
import { defaultResultsNum } from '../common/constants';
import UseDialog from './shared/UseDialog';
import { countPhotos, fetchPhotos } from '../utils/services';


export default function CardsGrid() {
    const [pageNumber, setPageNumber] = useState(1)
    const [alert, setAlert] = useState(false)

    const { isLoading, data, isError, error } = useQuery(['getPhotos', pageNumber], () => fetchPhotos(pageNumber), { keepPreviousData: true })
    const { data: counter } = useQuery(['getTotalItems'], countPhotos)
    const [totalItems, setTotalItems] = useState(counter || 0)

    useEffect(() => {
        if(counter) setTotalItems(counter)
    }, [counter])

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
        setAlert(true)
    }

    const handleOk = () => {
        setAlert(false)
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
            {alert ? <UseDialog no_padding >
                <Alert severity="error" >
                    <AlertTitle><b>Warning</b></AlertTitle>
                    Are you sure you want to delete the card?
                    <DialogActions>
                        <Button autoFocus onClick={() => setAlert(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleOk}>Yes</Button>
                    </DialogActions>
                </Alert>
            </UseDialog> : null}
        </>
    );
}