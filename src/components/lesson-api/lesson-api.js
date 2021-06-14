import React, {Component} from 'react'
import ky from "ky";
import axios from "axios";

export default class LessonApi extends Component{
    constructor(props) {
        super(props);
        this._apiBase = `http://89.223.24.146:8000/api`
    }

    logUserEnter = async(data)=>{
        await ky.post(`${this._apiBase}/create/course/analytics`, {
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        })
    }

    getNextLesson = async(data)=>{
        let res = await axios.post(`${this._apiBase}/lessons/next`, data)
        return res
    }

    isLessonCompleted = async(data)=>{
        let res = await ky.post(`${this._apiBase}/lessons/iscomplete`, {
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        }).json()
    }
}