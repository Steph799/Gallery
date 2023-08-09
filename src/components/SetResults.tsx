import { Button, TextField } from '@mui/material'
import React, { useRef } from 'react'
import { defaultResultsNum } from '../common/constants'

const SetResults = () => {
    const offset = useRef(0)
 //   const resCounter = useRef(defaultResultsNum)

    const handleSubmit = (e: React.FormEvent) => {
   //     console.log('check fields', offset, resCounter);
    }



    return (
        <form onSubmit={handleSubmit} className='setResultsForm'>
            <TextField type='number' size='small' className='input' inputRef={offset} InputProps={{ inputProps: { min: 0 } }} placeholder='Type the offset' />
            {/* <TextField type='number' size='small' className='input' inputRef={resCounter} InputProps={{ inputProps: { min: 1 } }} placeholder='Type number of results' /> */}

            <Button type='submit' variant='contained' color='info' fullWidth >Submit</Button>
        </form>
    )
}

export default SetResults