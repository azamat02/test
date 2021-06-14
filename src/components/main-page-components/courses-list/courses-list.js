import React, {Component, useState} from 'react'
import CourseItem from '../course-item/course-item'
import './courses-list.css'
import Spinner from "../spinner";

export default function CoursesList(props){
    const [courses, setCourses] = useState(props.courses)

    let renderItems = (arr)=>{
        return arr.map((elem)=>{
            let {courseLessons, courseImage, courseTitle, courseDesc, courseId} = elem
            return <CourseItem courseLessons={courseLessons} courseImage={courseImage} courseTitle={courseTitle} courseDesc={courseDesc} courseId={courseId}/>
        })
    }

    let data = null

    if(!courses) {
        data = <Spinner/>
    } else {
        data = renderItems(courses)
    }

    return (
        <>
            <p className="title">Courses</p>
            <div className="courses-list">
                {data}
            </div>
        </>
    )
}