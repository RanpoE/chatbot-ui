export const postRequest = async (url, data, cb) => {
    const controller = new AbortController();
    const signal = controller.signal;
    const headers = {
        "Content-Type": "application/json",
    }
    console.log(data)

    try {
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const request = new Request(url, {
            headers,
            method: 'POST', body: JSON.stringify(data),
            signal
        })
        const response = await fetch(request)

        clearTimeout(timeoutId);

        if (response.status === 201) {
            return { message: 'Record created' }
        }
        return response

    } catch (error) {
        return { error }
    }
    // cb()
}