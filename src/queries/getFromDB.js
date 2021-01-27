export function get_data() {
    return fetch('http://localhost:3000/db/db.json',
        {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((responseData) => {
            // console.log("users:",responseData);
            return responseData;
        })
        .catch(error => console.warn(error));
}
