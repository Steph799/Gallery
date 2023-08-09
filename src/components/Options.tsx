import { Stack, Button } from '@mui/material'
import React, { useState } from 'react'
import UseDialog from './shared/UseDialog'
import AddPhoto from './AddPhoto'
import SetResults from './SetResults'

const Options = () => {
    const [dialog, setDialog] = useState(false)
    const [element, setElement] = useState<React.ReactNode>(null)


    const openDialog = (operation: 'add photo' | 'set number of results') => {
        setDialog(true)

        if (operation === 'add photo') {
               setElement(<AddPhoto/>)
        }
        // else {
        //      setElement(<SetResults/>)
        // }
    }

    return (
        <>
         <Stack direction='row' justifyContent='center' marginBottom={3}>
            <Button color='success' variant='contained' className='addBtn' onClick={()=>openDialog('add photo')} size='small'>+ Add photo</Button>
            {/* <Button color='info' variant='contained' className='setResultsBtn' onClick={()=>openDialog('set number of results')}>set number of results</Button> */}
        </Stack>

        {dialog ? <UseDialog >
               {element}
                <button className='closeBtn' onClick={() => setDialog(false)}>Close</button>
            </UseDialog> : null}
        </>
       )
}

export default Options