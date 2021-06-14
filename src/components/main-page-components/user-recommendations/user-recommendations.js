import React, {useEffect, useState} from 'react'
import axios from "axios";
import Spinner from "../spinner";
import {ChevronRightIcon} from "@heroicons/react/outline";
import {Link} from "react-router-dom";
import CoursesApi from "../../api";

export default function UserRecommendations({userId}) {
    const [recCourses, setRecCourses] = useState(null)
    let api = new CoursesApi()

    useEffect(()=>{
        if (recCourses === null) {
            (
                async ()=>{
                    let res = await api.getUserRecs(userId)
                    setRecCourses(res.data)
                }
            )()
        }
    },[recCourses])

    if (!recCourses) {
        return <Spinner/>
    }

    let renderedCourses = recCourses.map(elem=>{
        return (
            <Link to={`/course/${elem.id}`}>
                <div className="rounded-md shadow-lg p-4 hover:scale-105 transform transition border-2 border-gray-600">
                    <p className="text-xl font-bold text-gray-800 flex items-center justify-between">
                        <span>{elem.title}</span>
                        <ChevronRightIcon className="w-10 h-10"/>
                    </p>
                </div>
            </Link>
        )
    })

    return (
        <div>
            <h1 className="text-xl font-bold">Recommendations for you</h1>
            <div className="grid grid-cols-4 gap-4 mt-5">
                {renderedCourses}
            </div>
        </div>
    )
}