import React, {Component} from "react";

export default class AuthService extends Component{
    constructor(props) {
        super(props);
        this._apiBase = `http://89.223.24.146:8000/api`
    }

    isAuthorized = async () => {
        let res = await fetch(`${this._apiBase}/user`, {
            headers: {'Content-type': 'application/json'},
            credentials: 'include'
        })

        let user = await res.json()

        if (user.id == null) {
            return false
        } else {
            return user
        }
    }

    SignIn = async (email, password) => {
        let response = await fetch(`${this._apiBase}/sign_in`, {
            method: "POST",
            headers: {'Content-type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                email,
                password
            })
        })

        let json = await response.json()

        return json.message
    }

    SignUp = async (email, name, surname, login, pass) => {
        let response = await fetch(`${this._apiBase}/sign_up`, {
            method: "POST",
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                name,
                surname,
                email,
                login,
                password: pass
            })
        })
        let json = await response.json()

        return json.id
    }

    LogOut = async () => {
        await fetch(`${this._apiBase}/logout`, {
            method: "POST",
            headers: {'Content-type': 'application/json'},
            credentials: 'include'
        })
    }

    IsAdmin = async () => {
        let res = await fetch(`${this._apiBase}/admin`, {
            headers: {'Content-type': 'application/json'},
            credentials: 'include'
        })

        let json = await res.json()

        return json
    }
}