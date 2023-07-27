import axios from "axios";

export const useAxios = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        accept: 'application/json',
        Authorization: process.env.REACT_APP_API
    }
})