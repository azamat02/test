import React, {Component, useEffect, useState} from "react"
import { Link } from "react-router-dom";
import './courses-slider.css'
import Spinner from "../spinner";

export default function CoursesSlider(props){
    const [courses, setCourses] = useState(props.courses)
    const [timerId, setTimerId] = useState(null)
    const [currentSlide, setCurrentSlide] = useState(0)

    useEffect(()=>{
        if (timerId == null) {
            setTimerId(
                setInterval(
                    ()=>{changeData()}, 5000
                )
            )
        }
    })

    let changeData = ()=>{
        let dataLength = courses.length
        dataLength -= 1
        if (currentSlide === dataLength) {
            setCurrentSlide(0)
        } else {
            let num = currentSlide
            num++
            setCurrentSlide(num)
        }
    }

    let nextSlide = ()=>{
        let num = currentSlide;
        if(currentSlide === courses.length-1) {
            num = 0
        }
        else {
            num ++
        }
        setCurrentSlide(num)
    }

    let prevSlide = ()=>{
        let num = currentSlide;
        if(currentSlide === 0) {
            num = courses.length-1
        }
        else {
            num --
        }
        setCurrentSlide(num)
    }

    if(!courses) {
        return <Spinner/>
    }

    let {courseId, courseImage, courseTitle, courseDesc} = courses[currentSlide]

    let dots = courses.map((elem,index)=>{
        if(index === currentSlide){
            return (<span className="active-dot"></span>)
        } else {
            return (<span></span>)
        }
    })

    return (
        <>
            <div className="slider-container shadow-md transition">
                <div className="slider-image">
                    <img className="course-img" src={courseImage} alt=""/>
                </div>
                <div className="slider-content">
                    <div className="indicators">
                        <div className="indicator-dots">
                            {dots}
                        </div>
                        <div className="indicator-controllers">
                            <span onClick={()=>prevSlide()}><i className="fas fa-arrow-left"></i></span>
                            <span onClick={()=>nextSlide()}><i className="fas fa-arrow-right"></i></span>
                        </div>
                    </div>
                    <p className="course-title">
                        {courseTitle}
                    </p>
                    <p className="course-desc">
                        {courseDesc}
                    </p>
                    <Link to={'/course/'+courseId+'/'} className="px-4 py-3 hover:bg-blue-600 transition shadow text-lg font-bold text-white mt-10 block bg-blue-500 w-2/4 text-center rounded">
                        Read more
                    </Link>
                </div>
            </div>
        </>
    )

}