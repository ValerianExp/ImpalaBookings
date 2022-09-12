require("dotenv/config");
const axios = require('axios');

class AxiosImpala {
    constructor() {
        this.axios = axios.create({
            baseURL: 'https://sandbox.impala.travel/v1',
            headers: {
                'Content-Type': 'application/json',
                // API_KEY GOES HERE
                'x-api-key': process.env.API_KEY,
            }
        });
    }

    getHotels(obj) {
        let cont = Object.keys(obj).length;
        let url = "/hotels";
        if (cont > 0) {
            url += '?';
            // Add query params
            for (let key in obj) {
                url += `${key}=${obj[key]}&`;
            }
            // Remove last &
            url = url.slice(0, -1);
        }
        return this.axios.get(url);
    }

    getHotel(id) {
        return this.axios.get(`/hotels/${id}`);
    }
}

module.exports = AxiosImpala;

//Im hungry :(