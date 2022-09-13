export default class EasyHTTP {
    // Make An HTTP GET Resquest
    async get(url) {
        const res = await fetch(url);
        const data = await res.json();
        return data;
    }

    // Make An HTTP POST Resquest
    async post(url, data) {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const json = await res.json();

        return json;
    }

    async put(url, data) {

        const res = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const json = await res.json();

        return json;
    }

    async delete(url, data) {

        const res = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const json = await res.json();

        return json;
    }
}

