import axios from "axios";

export const useAxios = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        accept: 'application/json',
        Authorization:  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZjFhZjQ4OTUxM2NmY2EwMDAzODcyZmFjOGMwNWM1NiIsInN1YiI6IjY0YjgzNjRhMzAwOWFhMDExYzk5NmQ2NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hOrKQptIbqiswU-4pNgaMeipAkoSXJAbk29YgWPG6OY'
    }
})