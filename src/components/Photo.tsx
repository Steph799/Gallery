import React, { useState } from 'react'
import UseDialog from './UseDialog'
import '../styles/photo.scss'
import { maxDescriptionLength } from '../common/constants'

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

const openDialog = (element: 'image'| 'description')=>{
    setDialog(true)

    // in this case I implemented only for image or description but it can be much more generic
    if(element==='image') {
        setElement(<img src={url} className='largeImg' alt='' />)
    }
    else{
        setElement(<p>{description}</p>)
    }
}
    return (
        <>
            <article>
                <h3 className='title'>{title}</h3>
                {/* <span>{user}</span>
                <span>{id}</span> */}
                <p>{description.length>maxDescriptionLength?
                 <>{description.substring(0, maxDescriptionLength)} 
                <button className='readMoreLink' onClick={() => openDialog('description')}>read more...</button>
                </>  : description}</p>
                <img src={url}  className='image' alt='' onClick={() => openDialog('image')} />
            </article>
            {dialog ? <UseDialog >
               {element}
                <button className='closeBtn' onClick={() => setDialog(false)}>Close</button>
            </UseDialog> : null}
        </>
    )
}

export default Photo