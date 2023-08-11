import React, { createContext, useState } from 'react'

export interface CardProps {
    title: string
    description: string
    url: string
}
interface TypeContextProviderProps {
    children: React.ReactNode
}
interface CardContextType {
    card: CardProps
    setCard: React.Dispatch<React.SetStateAction<CardProps>>
}
export const CardContext = createContext<CardContextType>({} as CardContextType)

const CardContextProvider = ({ children }: TypeContextProviderProps) => {
    const [card, setCard] = useState<CardProps>({} as CardProps)

    return (
        <CardContext.Provider value={{ card, setCard }}>
            {children}
        </CardContext.Provider>
    )
}

export default CardContextProvider