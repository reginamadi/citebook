import axios from 'axios';

const google_scholar= axios.create({
    baseURL: "https://serpapi.com",
    headers: {"Access-Control-Allow-Origin": "*"}
});

export default google_scholar;