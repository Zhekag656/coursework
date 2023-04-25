import React, {FC, useContext, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import "../public/css/loginForm.css"

const LoginForm: FC = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {store} = useContext(Context)

    return (
        <div className="container">
            <div className="form-container">
                <h1>Login</h1>
                <form>
                    <div className="form-group">
                        <input
                               onChange={e => setEmail(e.target.value)}
                               value={email}
                               type='text'
                               placeholder='Email'
                        />
                    </div>
                    <div className="form-group">
                        <input
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                            type='password'
                            placeholder='Password'
                        />
                    </div>
                    <button onClick={() => store.login(email, password)} className="btn login-btn">Sign in</button>
                    <label className="orLabel">OR</label>
                    <button onClick={() => store.registration(email, password)} className="btn register-btn">Sign up</button>
                </form>
            </div>
        </div>
    );
};

export default observer(LoginForm);