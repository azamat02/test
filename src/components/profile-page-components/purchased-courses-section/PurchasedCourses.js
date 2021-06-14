import React, {useEffect, useState} from 'react'
import {AcademicCapIcon, LightningBoltIcon, PresentationChartBarIcon} from "@heroicons/react/outline";
import {ProgressBar} from "react-bootstrap";
import CoursesApi from "../../api";
import Spinner from "../../main-page-components/spinner";
import {Link} from "react-router-dom";
import axios from "axios";
import ky from "ky";
import PurchasedCourseItem from "../purchased-course-item/purchased-course-item";

export default function PurchasedCourses({userId}){
    const [purchasedCourses, setPurchasedCourses] = useState(null)
    const [allCourses, setAllCourses] = useState(null)
    let api = new CoursesApi()

    // Getting all purchased courses of user, and all courses too
    useEffect(()=>{
        if (purchasedCourses === null && allCourses === null && userId !== null ){
            api.getPurchasedCoursesByUsedId(userId).then(data=>{
                setPurchasedCourses(data)
            })
            api.getAllCourses().then(data=>{
                setAllCourses(data)
            })
        }
    }, [purchasedCourses, allCourses])

    // If courses not loaded return spinner
    if (!purchasedCourses || !allCourses) {
        return <Spinner/>
    }

    // Rendring purchased courses
    let renderPurchasedCourses = purchasedCourses.length != 0 ? purchasedCourses.map((elem, index)=>{
        let currentCourse

        // Finding course by id, and getting info
        allCourses.forEach(item=>{
            if (item.courseId == elem.purchaseCourseId) {
                currentCourse = item
            }
        })

        return <PurchasedCourseItem currentCourse={currentCourse} purchasedCourse={elem} userId={userId}/>
    }) : (
        <div className="px-6 py-4">
            You dont have any purchased courses. <a href="/" className="text-blue-500 underline">Chech courses</a>
        </div>
    )

    return (
        <>
            {/*Courses*/}
            <div className="col-span-1" id="courses">
                <div className="container rounded mt-2 shadow pt-2">
                    <div className="px-6 py-2">
                        <h1 className="text-2xl font-medium ">Purchased courses</h1>
                        <h1 className="text-lg text-gray-500 ">Your courses</h1>
                    </div>
                    <hr className="mt-2 mb-2"/>
                    <div>
                        {renderPurchasedCourses}
                    </div>
                </div>
            </div>
        </>
    )
}