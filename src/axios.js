import axios from "axios";

const instance = axios.create({
    baseURL: `http://127.0.0.1:5001/challenge-8bd2b/us-central1/api` //The API (cloud fiunction)
});

export default instance;