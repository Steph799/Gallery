import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Card, CardContent, CardContentProps, styled } from '@mui/material';
import Photo, { PhotoProps } from './Photo';

export default function CardsGrid() {

    const CardContentImp = styled(CardContent)<CardContentProps>(() => ({
        padding:10,
        '&:last-child': {
            paddingBottom: '10px', // Add 10px of padding to the last child
          }
    }));

    const photos: PhotoProps[] = [{
        "title": "Apply future response she reduce decide",
        "user": 30,
        "id": 6,
        "description": "Training beautiful age four skin cultural hundred environmental ability blood go physical relate produce tough open police.",
        "url": "https://api.slingacademy.com/public/sample-photos/6.jpeg"
    },
    {
        "title": "Fire year candidate too like",
        "user": 20,
        "id": 7,
        "description": "Few address take for special development white career.",
        "url": "https://api.slingacademy.com/public/sample-photos/7.jpeg"
    },
    {
        "title": "Reflect design camera land girl wind behind side",
        "user": 13,
        "id": 8,
        "description": "Drug if approach out according set home job company wall source trouble act huge easy style physical so month.",
        "url": "https://api.slingacademy.com/public/sample-photos/8.jpeg"
    },
    {
        "title": "Per nature research",
        "user": 2,
        "id": 9,
        "description": "Nature focus wonder behind magazine pattern degree far without tree consider.",
        "url": "https://api.slingacademy.com/public/sample-photos/9.jpeg"
    },
    {
        "title": "Yard",
        "user": 30,
        "id": 10,
        "description": "Parent talk collection fill between management purpose fish fight real teacher successful me arrive little.",
        "url": "https://api.slingacademy.com/public/sample-photos/10.jpeg"
    },
    {
        "title": "Commercial kitchen",
        "user": 29,
        "id": 11,
        "description": "Their base help outside often grow address himself product issue watch pick kid all break ever threat try learn edge degree name order everyone seem interest democratic card reach safe war gun expert.",
        "url": "https://api.slingacademy.com/public/sample-photos/11.jpeg"
    },]

    return (
        <Grid sx={{ flexGrow: 1 }} container spacing={2}>
            <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={2}>
                    {photos.map((photo) => (
                        <Grid key={photo.id} item>
                            <Card
                                sx={{
                                    height: 240,
                                    width: 320,
                                    backgroundColor: (theme) =>
                                        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
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
    );
}

{/* <Grid item xs={12}>
<Paper sx={{ p: 2 }}>
    <Grid container>
        <Grid item>
            <FormControl component="fieldset">
                <FormLabel component="legend">spacing</FormLabel>
                <RadioGroup
                    name="spacing"
                    aria-label="spacing"
                    value={spacing.toString()}
                    onChange={handleChange}
                    row
                >
                    {[0, 0.5, 1, 2, 3, 4, 8, 12].map((value) => (
                        <FormControlLabel
                            key={value}
                            value={value.toString()}
                            control={<Radio />}
                            label={value.toString()}
                        />
                    ))}
                </RadioGroup>
            </FormControl>
        </Grid>
    </Grid>
</Paper>
{/* <HighlightedCode code={jsx} language="jsx" /> */}
// </Grid> */}