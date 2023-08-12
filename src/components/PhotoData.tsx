import React, { useEffect, useRef, useState } from 'react'
import UseDialog from './shared/UseDialog'
import { PhotoDataProps } from '../utils/interfaces'
import '../styles/photo.scss'

const PhotoData = ({ title, description, url }: PhotoDataProps) => {
    const [dialog, setDialog] = useState(false)
    const [element, setElement] = useState<React.ReactNode>(null)
    const [isEllipsisApplied, setIsEllipsisApplied] = useState(false);
    const descriptionRef = useRef(null);

    useEffect(() => {
        if (descriptionRef.current) {
            const descriptionElement = descriptionRef.current as HTMLParagraphElement;

            //check exceeding in height due to high number of lines
            const isEllipsisVisible = descriptionElement.scrollHeight > descriptionElement.clientHeight;
            setIsEllipsisApplied(isEllipsisVisible);
        }
    }, []);

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

                <section className='descriptionContainer'>
                    <p className='description' ref={descriptionRef}>{description}</p>
                    {isEllipsisApplied ? <button className='readMoreLink'
                        onClick={() => openDialog('description')}>read more</button> : null}
                </section>

                <img src={url} loading='lazy' className='image' alt="missing item" onClick={() => openDialog('image')} />
            </article>

            {dialog ? <UseDialog >
                {element}
                <button className='closeBtn' onClick={() => setDialog(false)}>Close</button>
            </UseDialog> : null}
        </>
    )
}

export default PhotoData