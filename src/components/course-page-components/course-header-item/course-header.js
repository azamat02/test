import React from 'react'
import {Link} from "react-router-dom";

export default function CourseHeader(props){
    let {courseImage, courseTitle, courseDesc, courseId} = props
    return (
        <div className="flex justify-between mt-6 w-full rounded course-header py-5 border-t-4 border-b-4 rounded shadow-lg  border-gray-900">
            <div className="h-72 course-image w-1/2 mr-9">
                <img className="max-h-72 m-auto" src={courseImage} alt=""/>
            </div>
            <div className="h-72 relative course-info w-1/2 p-4">
                <p className="text-4xl font-bold text-gray-900">{courseTitle}</p>
                <p className="text-sm mt-9 w-4/5 mb-10">
                    {courseDesc}
                </p>
                <Link to={`/payments/${courseId}`}>
                    <button className="absolute bottom-0 w-4/5 bg-blue-500 text-blue-50 py-4 px-6 hover:bg-blue-600 transition-all duration-400 text-2xl font-bold">
                        Get course
                    </button>
                </Link>
            </div>
        </div>
    )
}