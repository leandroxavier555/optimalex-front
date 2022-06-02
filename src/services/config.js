import axios from 'axios'

export const http = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
})

export const setBearerToken = token => {
    http.defaults.headers.common.Authorization = 'Bearer ' + token
}
