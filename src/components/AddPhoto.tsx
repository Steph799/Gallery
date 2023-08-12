import React, { useContext, useRef, useState } from 'react'
import { Alert, Button, Snackbar, TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { CardContext, CardProps } from './context/CardContext';
import '../styles/form.scss'
import { snackBarDuration } from '../common/constants';

interface AddPhotoProps {
    setDialog: React.Dispatch<React.SetStateAction<boolean>>
}

const AddPhoto = ({ setDialog }: AddPhotoProps) => {
    const { setCard } = useContext(CardContext)

    const titleRef = useRef<HTMLInputElement>(null)
    const descriptionRef = useRef<HTMLTextAreaElement>(null)
    const urlRef = useRef<HTMLInputElement>(null)

    const [choice, setChoice] = useState<string | null>(null);
    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const [open, setOpen] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files && event.target.files[0];

        if (selectedFile) setPhotoFile(selectedFile);
    };

    const handleChoice = () => {
        if (choice === 'file') return <input type='file' onChange={handleFileChange} className='fileInput' accept="image/*" />

        else if (choice === 'url') {
            if (photoFile) setPhotoFile(null)
            return <TextField size='small' inputRef={urlRef} type='text' placeholder='Enter URL' />
        }

        return null
    }

    const handleError = (messageError: string) => {
        setOpen(true);
        setErrorMsg(messageError)
    }

    const addCard = (title: string, description: string, source: string | File) => {
        const newCardObj = { title, description, url: source }
        if (source instanceof File) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const base64DataUrl = event.target!.result;
                newCardObj.url = base64DataUrl as string
                setCard(newCardObj as CardProps) //safe cast because url now is a string
            };
            reader.readAsDataURL(source);
        }
        //url is a string for sure
        else setCard(newCardObj as CardProps)
    }

    const handleSubmit = (e: React.FormEvent) => {
        if (!titleRef.current?.value || !descriptionRef.current?.value) {
            handleError('Title and description must not be empty')
        }
        else if (!choice) {
            handleError('You must choose how to import the photo')
        }
        else if ((choice === 'file' && !photoFile) || (choice === 'url' && !urlRef.current?.value)) {
            handleError('You need to import the photo')
        }

        else {
            addCard(titleRef.current.value, descriptionRef.current.value, photoFile || urlRef.current!.value)
            setDialog(false)
        }
        e.preventDefault()
    }

    return (
        <form onSubmit={handleSubmit} className='form'>
            <TextField size='small' className='input' inputRef={titleRef} type='text' placeholder='Type your title' />
            <textarea className='textArea' ref={descriptionRef} placeholder='Type your description' rows={4} maxLength={200} />
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
                autoHideDuration={snackBarDuration}
                onClose={() => setOpen(false)}
            >
                <Alert severity="error">Error: {errorMsg}</Alert>
            </Snackbar> : null}
        </form>
    )
}

export default AddPhoto