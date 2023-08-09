import React, { useRef, useState } from 'react'
import { Alert, Button, Snackbar, TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import '../styles/form.scss'

const AddPhoto = () => {

    const titleRef = useRef<HTMLInputElement>(null)
    const descriptionRef = useRef<HTMLTextAreaElement>(null)
    const urlRef = useRef<HTMLInputElement>(null)
  
    const [choice, setChoice] = useState<string | null>(null);
    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const [open, setOpen] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files && event.target.files[0];

        if (selectedFile) setPhotoFile(selectedFile);
    };

  
    const handleChoice = () => {
        if (choice === 'file') return <input type='file' onChange={handleFileChange} accept="image/*" />
        else if (choice === 'url') return <TextField size='small' inputRef={urlRef} type='text' placeholder='Enter URL' />
        return null
    }

    const handleError=(e: React.FormEvent, messageError:string)=>{
        e.preventDefault()
        setOpen(true);
        setErrorMsg(messageError)
    }

    const handleSubmit = (e: React.FormEvent) => {
        if (!titleRef.current?.value || !descriptionRef.current?.value) {
            handleError(e, 'Title and description must not be empty')    
        } else if (!choice) {
            handleError(e, 'You must choose how to import the photo')
        }
        else if ((choice === 'file' && !photoFile) || (choice === 'url' && !urlRef.current?.value)){
            handleError(e, 'You need to import the photo')
        }


    }

    return (
        <form onSubmit={handleSubmit} className='form'>
            <TextField size='small' className='input' inputRef={titleRef} type='text' placeholder='Type your title' />
            <textarea className='textArea' ref={descriptionRef} placeholder='Type your description' rows={4} />
            <FormControl>
                <FormLabel>Choose to import data from file or URL</FormLabel>
                <RadioGroup row>
                    <FormControlLabel value="file" control={<Radio />} label="File" onChange={() => setChoice('file')} />
                    <FormControlLabel value="url" control={<Radio />} label="URL" onChange={() => setChoice('url')} />
                </RadioGroup>
            </FormControl>
            {handleChoice()}

            <Button type='submit' variant='contained' color='info' fullWidth >Submit</Button>
            {open ? <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={()=> setOpen(false)}
            >
                <Alert severity="error">Error: {errorMsg}</Alert>
            </Snackbar> : null}
        </form>
    )
}

export default AddPhoto