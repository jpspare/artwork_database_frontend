
export const server_calls = {
    get: async (user_token: string) => { 
        const response = await fetch(`https://artwork-database.onrender.com/api/artwork`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'x-access-token': `Bearer ${user_token}`
            }

        });

        if (!response.ok){
            throw new Error('Failed to fetch data from the server')
        }


        return await response.json()
    },

    create: async (data: any = {}, user_token: string) => {
        const response = await fetch(`https://artwork-database.onrender.com/api/artwork`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'x-access-token': `Bearer ${user_token}`
            },
            body: JSON.stringify(data)

        })

        if (!response.ok) {
            throw new Error('Failed to create new data on the server')
        }

        return await response.json()
    },

    update: async (id: string, data:any = {}, user_token: string) => {
        const response = await fetch(`https://artwork-database.onrender.com/api/artwork/${id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'x-access-token': `Bearer ${user_token}`
            },
            body: JSON.stringify(data)

        })

        if (!response.ok) {
            throw new Error('Failed to update data on the server')
        }

        return await response.json()
    },

    delete: async (id: string, user_token: string) => {
        const response = await fetch(`https://artwork-database.onrender.com/api/artwork/${id}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'x-access-token': `Bearer ${user_token}`
            },

        })

        if (!response.ok) {
            throw new Error('Failed to delete data from the server')
        }

        return;
    },
    
}