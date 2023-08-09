import { Stack, Button } from '@mui/material'
import React, { useState } from 'react'
import UseDialog from './shared/UseDialog'
import AddPhoto from './AddPhoto'

const Options = () => {
    const [dialog, setDialog] = useState(false)

    return (
        <>
         <Stack direction='row' justifyContent='center' marginBottom={3}>
            <Button color='success' variant='contained' className='addBtn' onClick={()=>setDialog(true)} size='small'>+ Add photo</Button>
        </Stack>

        {dialog ? <UseDialog >
            <AddPhoto/>
                <button className='closeBtn' onClick={() => setDialog(false)}>Close</button>
            </UseDialog> : null}
        </>
       )
}

export default Options