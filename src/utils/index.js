export const postRequest = async (url, data, cb) => {
    const headers = {
        "Content-Type": "application/json",
    }
    console.log(data)
    try {
        const request = new Request(url, {
            headers,
            method: 'POST', body: JSON.stringify(data)
        })
        const response = await fetch(request)

        if (response.status === 201) {
            return { message: 'Record created' }
        }
        return response

    } catch (error) {
        return { error }
    }
    // cb()
}