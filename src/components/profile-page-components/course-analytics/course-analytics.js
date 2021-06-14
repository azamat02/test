import React, {useEffect, useState} from 'react'
import axios from "axios";
import Spinner from "../../main-page-components/spinner";
import {XCircleIcon} from "@heroicons/react/outline";
import {Line} from "react-chartjs-2";
import AnalyticsChart from "../analytics-chart";
import CoursesApi from "../../api";

export default function CourseAnalytics({courseId, userId, show, openTab, closeTab}){
    const [courseAnalyticsData, setCourseAnalyticsData] = useState(null)
    let api = new CoursesApi()

    useEffect(()=>{
        if (courseAnalyticsData === null) {
            (
                async()=>{
                    let analytics = await api.getUserCourseAnalytics({c_id: ''+courseId, u_id: ''+userId})
                    setCourseAnalyticsData(analytics.data)
                }
            )()
        }
    },[courseAnalyticsData])

    if (!courseAnalyticsData) {
        return <Spinner/>
    }

    let lastStudyDate = "No data"
    let completedLessons = 0
    if (courseAnalyticsData.length !== 0){
        lastStudyDate = courseAnalyticsData[courseAnalyticsData.length-1].Date;
        courseAnalyticsData.forEach(elem=>{
            if (elem.log === "Completed lesson") {
                completedLessons ++;
            }
        })
    }

    return (
        <div className={`${show ? `` : `hidden`} border-t-2 border-b-2 my-5 border-gray-900 py-5`}>
            <h1 className="text-2xl font-bold text-gray-800 mb-5">Course analytics data</h1>
            <p className="text-sm font-bold text-gray-600">Last study date: {lastStudyDate}</p>
            <p className="text-sm font-bold text-white bg-purple-700 rounded-md px-4 py-2 w-1/3 mt-2">{completedLessons} lessons completed.</p>
            <br/>
            <AnalyticsChart analyticData={courseAnalyticsData}/>
            <button onClick={closeTab} className="px-4 py-2 rounded-md flex mt-2 hover:bg-gray-800 transition items-center bg-gray-900 text-white font-bold focus:outline-none focus:ring-2">
                <XCircleIcon className="w-5 h-5 mr-1"/>
                <span>Close</span>
            </button>
        </div>
    )
}