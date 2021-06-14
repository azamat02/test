import React, {useState} from 'react'
import {AcademicCapIcon, LightningBoltIcon, PresentationChartBarIcon} from "@heroicons/react/outline";
import {ProgressBar} from "react-bootstrap";
import {Link} from "react-router-dom";
import CourseAnalytics from "../course-analytics";

export default function PurchasedCourseItem({currentCourse, purchasedCourse, userId}){
    const [isAnalyticsOpen, setOpenAnalytics] = useState(false)

    let openAnalytics = ()=>{
        setOpenAnalytics(true)
    }
    let closeAnalytics = ()=>{
        setOpenAnalytics(false)
    }
    
    return (
        <>
            <div className="px-6 mb-2 py-4 cursor-pointer">
                <p className="mb-3 text-2xl font-bold align-middle">
                    <AcademicCapIcon className="w-10 h-10 inline mb-1"/>
                    {currentCourse.courseTitle}
                    <p className="text-right inline ml-44 text-gray-600 font-medium text-sm">Purchased date: {purchasedCourse.purchaseDate}</p>
                </p>
                <p className="text-gray-700 font-bold">Progress {purchasedCourse.courseProgress}%</p>
                <ProgressBar className="mb-6" now={purchasedCourse.courseProgress} />

                {/*Course analytics for current user*/}
                <CourseAnalytics courseId={currentCourse.courseId} userId={userId} show={isAnalyticsOpen} openTab={openAnalytics} closeTab={closeAnalytics}/>

                <Link to={`/course/${currentCourse.courseId}`}>
                    <button className="bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 py-3 px-10 transition font-bold text-white rounded-lg hover:bg-green-600">
                        <LightningBoltIcon className="mb-1 w-5 h-5 inline mr-2"/>
                        Continue study
                    </button>
                </Link>
                <button onClick={()=>openAnalytics()} className="ml-10 bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 py-3 px-10 transition font-bold text-green-700 rounded-lg hover:bg-green-200">
                    <PresentationChartBarIcon className="mb-1 w-5 h-5 inline mr-2"/>
                    View analytics
                </button>
            </div>
            <hr/>
        </>
    )
}