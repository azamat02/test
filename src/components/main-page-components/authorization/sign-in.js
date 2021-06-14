import React, {useContext, useEffect, useState} from 'react'
import { Link,Redirect } from 'react-router-dom'
import './auth.css'
import Spinner from "../spinner";
import Modal from "../../tools/modal";
import AuthService from "../../auth-service";
import {AppContext} from "../../../stateManager";

export default function SignIn(){
    const { appState, appDispatch } = useContext(AppContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoader, setLoader] = useState(false)
    const [isModal, setIsModal] = useState(false)
    const [modalContainer, setModal] = useState(false)
    const [redirect, setRedirect] = useState(false)

    let authService = new AuthService()

    let submit = async (e) => {
        e.preventDefault()
        setLoader(true)

        if (email == "" || password == ""){
            setIsModal(true)
            setModal(<Modal open={true} info="Enter all entities!" title="Error" buttonLink="#error" type="error"/>)
        } else {
            // Call sign in function
            let status = await authService.SignIn(email, password);

            if (status == "Incorrect password") {
                setLoader(false)
                setIsModal(true)
                setModal(<Modal open={true} info="Incorrect password" buttonLink="#error" type="error" title="Error"/>)
            }
            if (status == "User not found") {
                setLoader(false)
                setIsModal(true)
                setModal(<Modal open={true} info="User with current email not found" buttonLink="#error" type="error" title="Error"/>)
            }
            if (status == "Could not sign in") {
                setLoader(false)
                setIsModal(true)
                setModal(<Modal open={true} info="Server error, try later" buttonLink="#error" type="info" title="Info"/>)
            }
            if (status == "Success"){
                let userData = await authService.isAuthorized()
                appDispatch({type: "authTrue", payload: {user: userData}})
                setLoader(false)
                setIsModal(true)
                setModal(<Modal open={true} info="You signed in!" buttonText="Go to main page" buttonLink="/" type="success" title="Success"/>)
                setTimeout(()=>{
                    setRedirect(true)
                }, 3000)
            }
        }
        setLoader(false)
    }

    if (redirect) {
        return <Redirect to="/"/>
    }

    if (isLoader) {
        return (
            <div className="auth-body">
                <div className="auth-container">
                    <Spinner/>
                </div>
            </div>
        )
    }

    let modal
    if (isModal) {
        modal = modalContainer
        setTimeout(()=>{setIsModal(false)}, 5000)
    } else {
        modal = null
    }

    return (
        <>
            <div className="auth-body">
                <div className="auth-container">
                    {modal}
                    <p>Sign in</p>
                    <form className="auth-form" onSubmit={(e)=>submit(e)}>
                        <label for="email" className="block">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mail" width="28" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="#3A7CA5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <rect x="3" y="5" width="18" height="14" rx="2" />
                                <polyline points="3 7 12 13 21 7" />
                            </svg>
                            <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email"/>
                        </label>
                        <label for="pass" className="block">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-lock" width="28" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="#3A7CA5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <rect x="5" y="11" width="14" height="10" rx="2" />
                                <circle cx="12" cy="16" r="1" />
                                <path d="M8 11v-4a4 4 0 0 1 8 0v4" />
                            </svg>
                            <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password"/>
                        </label>
                        <a href="/" className="right">Forget password?</a>
                        <button>Sign in</button>
                        <Link to="/signup" className="center">New user? Sign up</Link>
                    </form>
                </div>
            </div>
        </>
    )

}