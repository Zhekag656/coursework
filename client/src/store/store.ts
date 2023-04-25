import {IUser} from "../models/IUser";
import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import {AuthResponse} from "../models/response/AuthResponse";
import {API_URL} from "../http";

export default class Store{
    user = {} as IUser
    isAuth = false

    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool: boolean){
        this.isAuth = bool
    }

    setUser(user: IUser){
        this.user = user
    }

    async login(email: string, password: string){
        try {
            const response = await AuthService.login(email, password)
            console.log(response)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (err) {
            // @ts-ignore
            console.log(err.response?.data?.message)
        }
    }

    async registration(email: string, password: string){
        try {
            const response = await AuthService.registration(email, password)
            console.log(response)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (err) {
            // @ts-ignore
            console.log(err.response?.data?.message)
        }
    }

    async logout(){
        try {
            const response = await AuthService.logout()
            localStorage.removeItem('token')
            this.setAuth(false)
            this.setUser({} as IUser)
        } catch (err) {
            // @ts-ignore
            console.log(err.response?.data?.message)
        }
    }

    async checkAuth(){
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/api/refresh`, {withCredentials: true})
            console.log(response)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (err) {
            // @ts-ignore
            console.log(err.response?.data?.message)
        }

    }

    async checkActivation(){
        try {

        } catch (err) {
            // @ts-ignore
            console.log(err.response?.data?.message)
        }
    }
}