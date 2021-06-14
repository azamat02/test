import React, {useEffect, useState} from 'react'
import {StarIcon as StarSolid} from "@heroicons/react/solid";
import {StarIcon as StarOutline} from "@heroicons/react/outline";
import {ProgressBar} from 'react-bootstrap'
import './course-rating.css'
import axios from "axios";
import Spinner from "../../main-page-components/spinner";

export default function CourseRating({courseId}){
    const [rateData, setRateData] = useState(null)

    useEffect(()=>{
        // Get course rating data
        if (rateData === null) {
            (
                async()=>{
                    await axios.get(`http://localhost:8000/api/courses/rating/${courseId}`).then(res=>{
                        setRateData(res.data)
                    }).catch(()=>{
                        setRateData(false)
                    })
                }
            )()
        }
    },[rateData])

    if (rateData === null) {
        return <Spinner/>
    }
    if (rateData === false) {
        return (
            <div className="mb-24">
                <h1 className="text-3xl font-bold mb-10">Students feedback</h1>
                <h1 className="">There is no rating yet.</h1>
            </div>
        )
    }

    let stars = [1,2,3,4,5].map(elem=>{
        if (elem <= rateData.total_rating) {
            return <StarSolid className="inline w-8 h-8"/>
        } else {
            return <StarOutline className="inline w-8 h-8"/>
        }
    })

    return (
        <div className="mb-24">
            <h1 className="text-3xl font-bold">Students feedback</h1>
            <div className="grid grid-cols-4 gap-4 mt-10 w-4/5">
                <div className="h-52 leading-8 text-yellow-600">
                    <p className="rating font-bold text-8xl">
                        {rateData.total_rating}
                    </p>
                    <p className="stars">
                        {stars}
                    </p>
                    <p className="text-2xl font-medium mt-2">
                        Course Rating
                    </p>
                </div>
                <div className="h-52 col-span-2 pt-3">
                    <ProgressBar className="mb-6" now={+rateData.rating_5} />
                    <ProgressBar className="mb-6" now={+rateData.rating_4} />
                    <ProgressBar className="mb-6" now={+rateData.rating_3} />
                    <ProgressBar className="mb-6" now={+rateData.rating_2} />
                    <ProgressBar className="mb-6" now={+rateData.rating_1} />
                    <ProgressBar className="mb-6" now={+rateData.rating_0} />
                </div>
                <div className="h-52 text-yellow-600 leading-10">
                    <p className="stars">
                        <StarSolid className="inline w-7 h-7"/>
                        <StarSolid className="inline w-7 h-7"/>
                        <StarSolid className="inline w-7 h-7"/>
                        <StarSolid className="inline w-7 h-7"/>
                        <StarSolid className="inline w-7 h-7"/>
                        <p className='text-blue-500 text-2xl inline ml-2 align-middle'>{+rateData.rating_5}%</p>
                    </p>
                    <p className="stars">
                        <StarSolid className="inline w-7 h-7"/>
                        <StarSolid className="inline w-7 h-7"/>
                        <StarSolid className="inline w-7 h-7"/>
                        <StarSolid className="inline w-7 h-7"/>
                        <StarOutline className="inline w-7 h-7"/>
                        <p className='text-blue-500 text-2xl inline ml-2 align-middle'>{+rateData.rating_4}%</p>
                    </p>
                    <p className="stars">
                        <StarSolid className="inline w-7 h-7"/>
                        <StarSolid className="inline w-7 h-7"/>
                        <StarSolid className="inline w-7 h-7"/>
                        <StarOutline className="inline w-7 h-7"/>
                        <StarOutline className="inline w-7 h-7"/>
                        <p className='text-blue-500 text-2xl inline ml-2 align-middle'>{+rateData.rating_3}%</p>
                    </p>
                    <p className="stars">
                        <StarSolid className="inline w-7 h-7"/>
                        <StarSolid className="inline w-7 h-7"/>
                        <StarOutline className="inline w-7 h-7"/>
                        <StarOutline className="inline w-7 h-7"/>
                        <StarOutline className="inline w-7 h-7"/>
                        <p className='text-blue-500 text-2xl inline ml-2 align-middle'>{+rateData.rating_2}%</p>
                    </p>
                    <p className="stars">
                        <StarSolid className="inline w-7 h-7"/>
                        <StarOutline className="inline w-7 h-7"/>
                        <StarOutline className="inline w-7 h-7"/>
                        <StarOutline className="inline w-7 h-7"/>
                        <StarOutline className="inline w-7 h-7"/>
                        <p className='text-blue-500 text-2xl inline ml-2 align-middle'>{+rateData.rating_1}%</p>
                    </p>
                    <p className="stars">
                        <StarOutline className="inline w-7 h-7"/>
                        <StarOutline className="inline w-7 h-7"/>
                        <StarOutline className="inline w-7 h-7"/>
                        <StarOutline className="inline w-7 h-7"/>
                        <StarOutline className="inline w-7 h-7"/>
                        <p className='text-blue-500 text-2xl inline ml-2 align-middle'>{+rateData.rating_0}%</p>
                    </p>
                </div>
            </div>
        </div>
    )
}
