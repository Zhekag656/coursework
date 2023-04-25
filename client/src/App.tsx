import React, {FC, useContext, useEffect} from "react";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import LoginForm from "./components/LoginForm";

const App: FC = () => {

    const {store} = useContext(Context)

    useEffect(() => {
        if (localStorage.getItem('token')){
            store.checkAuth()
        }
    }, [])

    if (!store.isAuth){
        return (
            <LoginForm/>
        )
    }

    // @ts-ignore
    return (
        <div>
            <h1>{store.isAuth ? `User authorized ${store.user.email}` : "Please sign in or create an account"}</h1>
            <button onClick={() => store.logout()}>Logout</button>
        </div>
    )
}

export default observer(App);
