import React, { useState } from 'react'
import UseDialog from './shared/UseDialog'
import '../styles/photo.scss'
import { maxDescriptionLength } from '../common/constants'
import { Button } from '@mui/material'

export interface PhotoProps {
    title: string,
    user: number,
    id: number,
    description: string,
    url: string
}


const Photo = ({ title, user, id, description, url }: PhotoProps) => {
    const [dialog, setDialog] = useState(false)
    const [element, setElement] = useState<React.ReactNode>(null)

    const openDialog = (element: 'image' | 'description') => {
        setDialog(true)

        // in this case I implemented only for image or description but it can be much more generic
        if (element === 'image') {
            setElement(<img src={url} className='largeImg' alt='' />)
        }
        else {
            setElement(<p className='detailedDescription'>{description}</p>)
        }
    }


    return (
        <>
            <article className='cardItem'>
                <h2 className='title'>{title}</h2>
                <p className='description'>{description.length > maxDescriptionLength ?
                    <>{description.substring(0, maxDescriptionLength)}
                        <button className='readMoreLink' onClick={() => openDialog('description')}>read more...</button>
                    </> : description}</p>
                <img src={url} loading='lazy' className='image' alt="missing item" onClick={() => openDialog('image')} />
            </article>
            {dialog ? <UseDialog >
                {element}
                <button className='closeBtn' onClick={() => setDialog(false)}>Close</button>
            </UseDialog> : null}
        </>
    )
}

export default Photo