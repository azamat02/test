import React, {useEffect, useState} from 'react'
import {StarIcon as StarSolid} from "@heroicons/react/solid";
import {StarIcon as StarOutline} from "@heroicons/react/outline";
import CoursesApi from "../../api";
import Spinner from "../../main-page-components/spinner";

export default function CommentsSection({courseId}){
    const [comments, setComments] = useState(null)
    const [users, setUsers] = useState(null)
    let api = new CoursesApi()

    useEffect(()=>{
        if (comments == null && users == null) {
            api.getCommentsByCourseId(courseId).then(data=>{
                setComments(data)
            })

            api.getAllUsers().then(data=>{
                setUsers(data)
            })
        }
    }, [comments, users])

    if (!comments || !users) {
        return <Spinner/>
    }

    let renderedComments = comments.length !== 0 ? comments.map((elem,index)=>{
        let renderedStars = [1,2,3,4,5].map(item=>{
            if (item <= elem.commentRate){
                return <StarSolid className="inline w-5 h-5"/>
            } else {
                return <StarOutline className="inline w-5 h-5"/>
            }
        })

        let user
        users.forEach(item=>{
            if (item.userId === elem.commentUserId) {
                user = item
            }
        })

        return (
            <div className="comment-block rounded-2xl bg-gray-100 transition shadow w-4/5 p-6 mb-5">
                <p id="name" className="font-medium text-lg text-blue-600">{user.userName + " " + user.userSurname}</p>
                <p className="stars mb-2 text-yellow-500">
                    {renderedStars}
                </p>
                <p id="comment" className="italic mb-2">{elem.commentText}</p>
                <p id="date" className="text-gray-600">{elem.commentCreatedDate}</p>
            </div>
        )
    }) : "No comments added yet."

    return (
        <div className="mb-36">
            <h1 className="text-3xl font-bold mb-10">Comments</h1>
            {renderedComments}
        </div>
    )
}
