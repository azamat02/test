import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import './auth.css'
import Spinner from "../spinner";
import Modal from "../../tools/modal";
import AuthService from "../../auth-service";


export default function SignUp(){
    let readyToSubmit = false
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [login, setLogin] = useState('')
    const [pass, setPass] = useState('')
    const [pass2, setPass2] = useState('')
    const [isLoader, setLoader] = useState(false)
    const [isModal, setIsModal] = useState(false)
    const [modalContainer, setModal] = useState(false)

    const [emailError, setErrorEmail] = useState(false)
    const [loginError, setErrorLogin] = useState(false)
    const [passError, setErrorPass] = useState(false)
    const [pass2Error, setErrorPass2] = useState(false)
    const [nameError, setErrorName] = useState(false)
    const [surnameError, setErrorSurname] = useState(false)

    let authService = new AuthService()

    let changeData = (e, type) => {
        let text = e.target.value

        if(type == "email"){
            setEmail(text)
            let regex = /^.{3,}$/ // min-3
            if(!regex.test(text)){
                setErrorEmail("Email must be entered")
            } else {
                setErrorEmail(false)
            }
        }
        if(type == "login"){
            setLogin(text)
            let regex = /^.{3,35}$/ // min-3 max-30
            if(!regex.test(text)){
                setErrorLogin("Login length must be at least 3 and max 35 characters.")
            } else {
                setErrorLogin(false)
            }
        }
        if(type == "name"){
            setName(text)
            let regex = /^.{3,35}$/ // min-3 max-30
            if(!regex.test(text)){
                setErrorName("Name length must be at least 3 and max 35 characters.")
            } else {
                setErrorName(false)
            }
        }
        if(type == "surname"){
            setSurname(text)
            let regex = /^.{3,35}$/ // min-3 max-30
            if(!regex.test(text)){
                setErrorSurname("Surname length must be at least 3 and max 35 characters.")
            } else {
                setErrorSurname(false)
            }
        }
        if(type == "pass"){
            setPass(text)
        }
        if(type == "pass2"){
            setPass2(text)
        }
    }

    // Check pass same and for length
    useEffect(()=>{
        if (pass != pass2){
            setErrorPass("Entered passwords different!")
            setErrorPass2("Entered passwords different!")
        }
        else {
            let regex = /^.{8,}$/ // min-8
            if(!regex.test(pass)){
                setErrorPass("Pass length must be at least 8 characters.")
            }
            if(!regex.test(pass2)){
                setErrorPass2("Pass length must be at least 8 characters.")
            }
            else {
                setErrorPass(false)
                setErrorPass2(false)
            }
        }

        if ((!emailError && !loginError && !passError && !pass2Error && !nameError && !surnameError)
            &&  (email != "" && login != "" && name != "" && surname != "" && pass != "" && pass2 != "") &&
            (pass == pass2)) {
            readyToSubmit = true
            console.log("Form is ready to submit")
        } else {
            readyToSubmit = false
        }
    })

    let submit = async (e)=>{
        e.preventDefault()

        if (readyToSubmit) {
            setLoader(true)

            let id = await authService.SignUp(email, name, surname, login, pass)

            if (id == null) {
                setLoader(false)
                setIsModal(true)
                setModal(<Modal open={true} info="Entered email is already exist! Try another one." buttonLink="#info" type="info" title="Info"/>)
            } else {
                setLoader(false)
                setIsModal(true)
                setModal(<Modal open={true} info="You successfully registered! Sign in to continue." buttonText="Sign in" buttonLink="/signin" type="success" title="Success"/>)
            }

        } else {
            setIsModal(true)
            setModal(<Modal open={true} info="Please enter all values correctly!" buttonLink="#error" type="error" title="Error"/>)
        }
    }

    // Errors text
    let error1 = emailError ? <Error message={emailError}/> : null
    let error5 = nameError ? <Error message={nameError}/> : null
    let error6 = surnameError ? <Error message={surnameError}/> : null
    let error2 = loginError ? <Error message={loginError}/> : null
    let error3 = passError ? <Error message={passError}/> : null
    let error4 = pass2Error ? <Error message={pass2Error}/> : null

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
            {modal}
            <div className="auth-body">
                <div className="auth-container">
                    <p>Sign up</p>
                    <form className="auth-form" onSubmit={(e)=>submit(e)}>
                        <label for="email" className="block">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mail" width="28" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="#3A7CA5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <rect x="3" y="5" width="18" height="14" rx="2" />
                                <polyline points="3 7 12 13 21 7" />
                            </svg>
                            <input type="email" onChange={(e)=>changeData(e, "email")} placeholder="Email" />
                        </label>
                        {error1}
                        <label for="login" className="block">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user" width="28" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="#3A7CA5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <circle cx="12" cy="7" r="4" />
                                <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                            </svg>
                            <input type="text" onChange={(e)=>changeData(e, "login")} placeholder="Login" />
                        </label>
                        {error2}
                        <label for="name" className="block">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user" width="28" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="#3A7CA5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <circle cx="12" cy="7" r="4" />
                                <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                            </svg>
                            <input type="text" onChange={(e)=>changeData(e, "name")} placeholder="Name" />
                        </label>
                        {error5}
                        <label for="surname" className="block">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user" width="28" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="#3A7CA5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <circle cx="12" cy="7" r="4" />
                                <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                            </svg>
                            <input type="text" onChange={(e)=>changeData(e, "surname")} placeholder="Surname" />
                        </label>
                        {error6}
                        <label for="pass" className="block">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-lock" width="28" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="#3A7CA5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <rect x="5" y="11" width="14" height="10" rx="2" />
                                <circle cx="12" cy="16" r="1" />
                                <path d="M8 11v-4a4 4 0 0 1 8 0v4" />
                            </svg>
                            <input type="password" onChange={(e)=>changeData(e, "pass")} placeholder="Password" />
                        </label>
                        {error3}
                        <label for="pass2" className="block">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-lock" width="28" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="#3A7CA5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <rect x="5" y="11" width="14" height="10" rx="2" />
                                <circle cx="12" cy="16" r="1" />
                                <path d="M8 11v-4a4 4 0 0 1 8 0v4" />
                            </svg>
                            <input type="password" onChange={(e)=>changeData(e, "pass2")} placeholder="Repeat password" />
                        </label>
                        {error4}
                        <a href="/" className="right">Forget password?</a>
                        <button>Sign up</button>
                        <Link to="/signin" className="center">Already have account? Sign in</Link>
                    </form>
                </div>
            </div>
        </>
    )
}
let Error = (props) => {
    return (<span className="block -mt-4 -mb-3 text-red-500 font-medium ml-5">{props.message}</span>)
}