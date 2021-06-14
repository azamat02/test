import React, {Component, useEffect, useState} from "react"
import CoursesApi from "../../api";
import {CheckIcon} from "@heroicons/react/solid";
import {CheckCircleIcon} from "@heroicons/react/outline";
import Spinner from "../../main-page-components/spinner";
import CourseHeader from "../course-header-item";
import CommentsSection from "../comments-section";
import CourseRating from "../course-rating";
import ModuleItem from "../module-item";

export default function CoursePage(props){
    const [course, setCourse] = useState(null)
    const [modules, setModules] = useState(null)
    const [lessons, setLessons] = useState([])

    let api = new CoursesApi()

    useEffect(()=>{
        if (course == null && modules == null) {
            api.getCourse(props.courseId).then(data=>{
                setCourse(data)
            })

            api.getModulesByCourseId(props.courseId).then(data=>{
                setModules(data)
            })
        }
    }, [course, modules])

    if(!course || !modules || !lessons){
        return <Spinner/>
    }

    let {courseAdv, courseReqs, courseId, courseTitle, courseImage, courseDesc} = course

    let renderedModules = "No data added yet, coming soon!";
    let renderedRequirements = "No data added yet, coming soon!";
    let renderedAdvantages = "No data added yet, coming soon!";

    if (courseReqs != "no data") {
        courseReqs = courseReqs.split(";")
        renderedRequirements = courseReqs.map(elem=>{
            return (
                <div className="p-4 bg-indigo-100 rounded-lg hover:bg-indigo-200 transition shadow-lg">
                    <div className="my-1 mx-3 text-indigo-800 font-bold">
                        <CheckCircleIcon className="inline mr-3 w-5 h-5"/>
                        {elem.trim()}
                    </div>
                </div>
            )
        })
    }
    if (courseAdv != "no data") {
        courseAdv = courseAdv.split(";")
        renderedAdvantages = courseAdv.map((elem)=>{
            return (
                <div className="p-4 bg-green-100 rounded-lg hover:bg-green-200 transition  shadow-lg">
                    <div className="my-1 mx-3 text-green-800 font-bold">
                        <CheckIcon className="inline mr-3 w-5 h-5"/>
                        {elem.trim()}
                    </div>
                </div>
            )
        })
    }
    if(modules.length != 0) {
        renderedModules = modules.map((elem)=>{
            return <ModuleItem id={elem.moduleId}/>
        })
    }

    return (
        <>
            {/*Course header*/}
            <CourseHeader courseImage={courseImage} courseId={courseId} courseDesc={courseDesc} courseTitle={courseTitle}/>

            <div className="course-body mt-9">
                {/*What learn*/}
                <div className="w-full my-12">
                    <p className="text-3xl font-bold">What you will learn?</p>
                    <div className="grid grid-cols-3 w-full gap-4 mt-5 mb-24">
                        {renderedAdvantages}
                    </div>
                </div>

                {/*Course modules*/}
                <div className="w-full mb-24">
                    <p className="text-3xl mb-5 font-bold">Course material</p>
                    <div className="w-full max-w-3xl py-2">
                        {renderedModules}
                    </div>
                </div>


                {/*Course desc */}
                <div className="w-full mb-24">
                    <p className="text-3xl font-bold">Course description</p>
                    <p className="text-md mt-5 italic font-medium">
                        {courseDesc}
                    </p>
                </div>

                {/*Course req  */}
                <div className="w-full mb-24">
                    <p className="text-3xl font-bold">Course requirements</p>
                    {/*Grid*/}
                    <div className="grid grid-cols-3 w-full gap-4 mt-5 mb-24">
                        {/*Elems*/}
                        {renderedRequirements}
                    </div>
                </div>

                {/*Course rating section*/}
                <CourseRating courseId={props.courseId}/>

                {/*Comments section*/}
                <CommentsSection courseId={props.courseId}/>
            </div>
        </>
    )
}