import { useState, useEffect } from 'react'
import { server_calls } from '../api/server'

export const useGetData = (user_token: string) => {
    const [ artworkData, setData ] = useState<[]>([])

    async function handleDataFetch(){
        const result = await server_calls.get(user_token);
        setData(result)
    }

    useEffect( () => {
        handleDataFetch();
    }, [])

    return { artworkData, getData:handleDataFetch }
}