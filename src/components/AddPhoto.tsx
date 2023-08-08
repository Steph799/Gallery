import React, { FormEventHandler, MutableRefObject, useRef, useState } from 'react'
import { Button, Stack, TextField } from '@mui/material';
import '../styles/form.scss'

const AddPhoto = () => {

    const titleRef = useRef<HTMLInputElement>(null)
    const descriptionRef = useRef<HTMLTextAreaElement>(null)
    const urlRef = useRef<HTMLInputElement>(null)

const disabled=()=>{
    if(!titleRef.current?.value || !descriptionRef.current?.value || !urlRef.current?.value) return true
    return false
}
    // const setState = (input: string, handleState: React.Dispatch<React.SetStateAction<string>>) => {
    //     handleState(input)
    // }

    const handleSubmit = () => {
console.log('check title', titleRef.current?.value);
console.log('check description', descriptionRef.current?.value);
console.log('check url', urlRef.current?.value);


    }

    return (
        <form onSubmit={handleSubmit} className='form'>
            {/* <Stack direction={'column'} gap={2} > */}
            <TextField size='small' className='input' inputRef={titleRef} type='text' placeholder='Type your title' />
            <textarea className='textArea'  ref={descriptionRef} placeholder='Type your description' rows={4} />
            <TextField size='small' className='input' inputRef={urlRef} type='text' placeholder='Enter url' />

            <Button type='submit' variant='contained' color='info' fullWidth disabled={disabled()}>Submit</Button>
            {/* </Stack> */}
           
        </form>
    )
}

export default AddPhoto
//onChange={e => setState(e.target.value, setTitle)}  onChange={e => setState(e.target.value, setDescription)}  onChange={e => setState(e.target.value, setUrl)}