import axios, {AxiosRequestConfig} from 'axios'

export const API_URL = `http://localhost:5000`

const $api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
}as AxiosRequestConfig)