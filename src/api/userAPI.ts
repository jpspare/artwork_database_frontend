type addUserProp = {
    'email': string,
    'user_token': string
}

export const userAPI = {
    add_user: async (data: addUserProp) => {
        const response = await fetch(`https://artwork-database.onrender.com/api/adduser`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify(data)
            }
        );
        if (!response.ok) {
            throw new Error('Failed to create new data on the server')
        }
        return await response.json()
    }
}
