import React, {Component, useContext} from 'react'
import CoursesApi from "../../api";
import Spinner from "../../main-page-components/spinner";
import {Link, Redirect} from "react-router-dom";
import {Menu, Transition} from '@headlessui/react'
import {
    AdjustmentsIcon,
    CheckCircleIcon,
    ChevronDoubleRightIcon, InformationCircleIcon,
    LogoutIcon,
    UserCircleIcon,
    UserIcon
} from "@heroicons/react/outline";
import ReactPlayer from "react-player";

import { Fragment, useEffect, useRef, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import ModuleItem from "../../course-page-components/module-item";
import Modal from "../../tools/modal";
import {AppContext} from "../../../stateManager";
import RateModal from "../../tools/modal-rate";
import axios from "axios";
import ky from "ky";
import LessonApi from "../../lesson-api";

export default function LessonPage(props){
    // To get is user authorized
    const { appState } = useContext(AppContext)
    const {isAuthorized, userData} = appState
    // Get lesson id
    const [id, setId] = useState(props.id)
    // Lesson data
    const [lesson, setLesson] = useState(null)
    // Modules
    const [modules, setModules] = useState(null)
    // Check if user purchased course
    const [purchased, setPurchased] = useState(null)
    // Check if user rated this course
    const [isRated, setIsRated] = useState(null)
    // Course id for rating
    const [courseId, setCourseId] = useState(null)
    // Course rate modal. appear if user not rated course
    const [rateModal, setRateModal] = useState(null)
    // Lesson complete modal
    const [completeModal, setCompleteModal] = useState(null)
    // Next lesson id
    const [nextLessonId, setNextLessonId] = useState(null)
    // Is lesson completed
    const [isLessonCompleted, setIsLessonCompleted] = useState(null)
    const [isLogged, setIsLogged] = useState(false)

    let api = new CoursesApi();
    let lessonApi = new LessonApi()

    useEffect(()=>{
        if (isLogged === false && userData !== null && courseId !== null) {
            // Logging enter to lesson
            (
                async ()=>{
                    await lessonApi.logUserEnter({u_id: ''+userData.id, c_id: courseId})
                }
            )();
            setIsLogged(true)
        }
        if (modules == null && lesson == null && purchased == null && courseId === null){
            // Getting lesson and modules and if purchased course
            api.getLesson(id).then((data)=>{
                api.getModule(data.lessonModuleId).then(data=>{
                    // Check purchase
                    api.checkIfPurchasedCourse(data.moduleCourseId).then(data=>{
                        if (data.message !== "User purchased course") {
                            setPurchased(false)
                        } else {
                            setPurchased(true)
                        }
                    })
                    setCourseId(data.moduleCourseId)
                    api.getModulesByCourseId(data.moduleCourseId).then(data=>{
                        setModules(data)
                    })
                })
                setLesson(data)
            })
        }
        if (isRated === null && courseId !== null && userData !== null) {
            let u_id = userData["id"]
            let c_id = courseId
            let data = {
                c_id: ''+c_id,
                u_id: ''+u_id
            }

            api.checkIfUserRated(data).then(data=>{
                if (data.data.message === "User rated") {
                    setIsRated(true)
                } else {
                    setIsRated(false)
                    // If user not rated course setting timeout to 5 minutes after rate modal will be apear
                    setTimeout(()=>{
                        setRateModal(<RateModal open={true} userId={u_id} courseId={c_id}/>)
                    }, 5000)
                }
            })
        }
        if (nextLessonId === null && courseId !== null) {
            (
                async ()=>{
                    await lessonApi.getNextLesson({c_id: courseId, l_id: id})
                        .then((res)=>{
                            let data = res.data
                            console.log(data)
                            console.log(`Lesson with id ${data.nextLessonId} find`)
                            setNextLessonId(+data.nextLessonId)
                        })
                        .catch(()=>{
                            console.log(`Next lesson not found`)
                            setNextLessonId(-1)
                        })
                }
            )()
        }
        if (isLessonCompleted === null && userData !== null && id !== null && courseId !== null) {
            (
                async ()=>{
                    let res = await lessonApi.isLessonCompleted({u_id: ''+userData.id, c_id: courseId, l_id: id})

                    console.log(res.message)
                    if (res.message == "Lesson already completed!"){
                        setIsLessonCompleted(true)
                    } else {
                        setIsLessonCompleted(false)
                    }
                }
            )()
        }
    }, [modules, lesson, purchased, isRated, isLessonCompleted, isLogged])

    // Loadings and modals
    if (!lesson || !modules || userData == null || purchased === null || nextLessonId === null || isLessonCompleted === null) {
        return <Spinner/>
    }
    if (!isAuthorized) {
        return <Modal type="error" info="You are not authorized. Please sign in/up first" buttonLink={`/signin`} buttonText="Sign in" title="Error" open={true}/>
    }
    if (!purchased) {
        return <Modal type="error" info="You are not purchased this course. Please purchase first!" buttonLink={`/`} buttonText="Go to main" title="Error" open={true}/>
    }

    let {lessonId,
        lessonType,
        lessonModuleId,
        lessonTitle,
        lessonLink,
        lessonContent} = lesson

    // Set video or lecture container
    let videoContainer = lessonLink !== "no data" ? (<div className="video-container w-full h-full bg-gray-700">
        <ReactPlayer url={lessonLink} controls width="100%" height="100%"/>
    </div>) : (<h1 className="text-2xl font-bold text-red-500 border-l-4 pl-4 border-red-500 bg-red-200 py-3" >No video link added yet</h1>)

    let lectureContainer = (<div className="content mt-5 mb-32">
        <h1 className="text-3xl font-bold border-l-4 border-gray-900 p-2 bg-indigo-100 text-gray-900">Lecture: {lessonTitle}</h1>
        <p className="text-lg mt-2 italic p-2">{lessonContent}</p>
    </div>)

    let lessonContainer = lessonType === "video" ? videoContainer : lectureContainer
    let rightBlock = lessonType === "video" ? (<div className="col-span-2">
        <hr/>
        <div className="modules my-3">
            <h1 className="text-gray-900 text-2xl font-bold my-4">{lessonTitle}</h1>
            <p>{lessonContent}</p>
        </div>
        <hr/>
    </div>) :null

    // Rendering modules
    let renderedModules = "No modules added yet."
    if(modules.length != 0) {
        renderedModules = modules.map((elem)=>{
            return <ModuleItem id={elem.moduleId}/>
        })
    }

    let nextLesson = ()=>{
        if (nextLessonId != -1){
            window.location.href = `http://localhost:3000/lesson/${nextLessonId}`
        } else {
            window.location.href = `http://localhost:3000/`
        }
    }
    let completeLesson = async ()=>{
        console.log({u_id: ''+userData.id, c_id: courseId, l_id: id})
        let res = await ky.post(`http://localhost:8000/api/lessons/complete`, {
            body: JSON.stringify({u_id: ''+userData.id, c_id: courseId, l_id: id}),
            headers: {'Content-Type': 'application/json'}
        }).json()

        let lesson_Id
        if (nextLessonId != -1){
            lesson_Id = nextLessonId
        }
        else {
            lesson_Id = lessonId
        }
        if (res.message == "Lesson already completed!") {
            setCompleteModal(
                <Modal
                    title="Info"
                    type="info"
                    open={true}
                    info="You already completed this lesson."
                    buttonText="Next lesson"
                    href={true}
                    buttonLink={`/lesson/${lesson_Id}`}/>
            )
        }
        else {
            setCompleteModal(
                <Modal
                    title="Success"
                    type="success"
                    open={true}
                    info="You completed this lesson. Nice!"
                    buttonText="Next lesson"
                    href={true}
                    buttonLink={`/lesson/${lesson_Id}`}
                />
            )
        }
    }

    return (
        <>
            {rateModal}
            {completeModal}
            {/*Navbar*/}
            <section className="h-16 bg-gray-800 pl-44 pr-44 items-center relative flex justify-between">
                <div className="flex relative items-center">
                    <Link to="/" className="text-2xl font-bold text-white mr-10">ONLINE COURSES</Link>
                    <Link to="/" className="bg-gray-900 text-white px-3 py-2 rounded-md font-medium mr-2">Courses</Link>
                    <Link to="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium mr-2">Contacts</Link>
                    <Link to="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium mr-2">Help</Link>
                </div>
                <div className="flex relative">
                    <div className="flex">
                        <div className="relative inline-block text-left">
                            <Menu>
                                {({ open }) => (
                                    <>
                                        <Menu.Button className="focus:outline-none inline-flex justify-center w-full">
                                            <button className="hover:bg-indigo-600 focus:ring-2 transition flex items-center text-gray-50 relative focus:outline-none px-5 py-2 bg-indigo-500 rounded-lg">
                                                        <span className="text-md mr-1 font-bold">
                                                            {userData.name}
                                                        </span>
                                                <UserCircleIcon className="inline w-7 h-7"/>
                                            </button>
                                        </Menu.Button>

                                        <Transition
                                            show={open}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items static className="absolute right-0 w-56 mt-2 origin-top-right bg-gray-800 text-white mt-4 divide-y divide-gray-100 rounded-md shadow-xl outline-none">
                                                <div className="py-1">
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <Link
                                                                to="/profile/"
                                                                className={`${
                                                                    active
                                                                        ? "bg-gray-100 text-gray-900"
                                                                        : "text-white"
                                                                } flex mx-4 rounded my-2 px-4 py-2 font-medium text-sm leading-5`}
                                                            >
                                                                <UserIcon className="w-5 h-5 inline mr-2"/>
                                                                Your profile
                                                            </Link>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <Link
                                                                to="/settings/"
                                                                className={`${
                                                                    active
                                                                        ? "bg-gray-100 text-gray-900"
                                                                        : "text-white"
                                                                } flex mx-4 rounded my-2 px-4 py-2 font-medium text-sm leading-5`}
                                                            >
                                                                <AdjustmentsIcon className="w-5 h-5 inline mr-2"/>
                                                                Settings
                                                            </Link>
                                                        )}
                                                    </Menu.Item>
                                                    <hr className="mx-7"/>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <a
                                                                href="/logout/"
                                                                className={`${
                                                                    active
                                                                        ? "bg-gray-100 text-gray-900"
                                                                        : "text-white"
                                                                } flex mx-4 rounded my-2 px-4 py-2 font-medium text-sm leading-5`}
                                                            >
                                                                <LogoutIcon className="w-5 h-5 inline mr-2"/>
                                                                Sign out
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                </div>
                                            </Menu.Items>
                                        </Transition>
                                    </>
                                )}
                            </Menu>
                        </div>
                    </div>
                </div>
            </section>
            <main>
                <div className="container mt-5 grid grid-cols-6 gap-4 mb-32">
                    <div className="col-span-4">
                        {lessonContainer}
                        <div className="flex justify-between">
                            {isLessonCompleted ? <>
                                <div className="flex items-center border-l-4 border-blue-500 bg-blue-200 text-blue-500 font-bold px-4">
                                    <InformationCircleIcon className="w-5 h-5 mr-2"/>
                                    <span>Lesson already completed</span>
                                </div>
                            </> : <div></div>}
                            <div className="flex justify-center">
                                <button onClick={()=>completeLesson()} className="mr-2 focus:ring-2 focus:outline-none hover:bg-green-600 transition px-8 py-2 text-lg font-bold flex items-center bg-green-500 mt-2 text-white rounded-md">
                                    <span>Complete lesson</span>
                                    <CheckCircleIcon className="w-5 h-5 ml-2"/>
                                </button>
                                <button onClick={()=>nextLesson()} className="focus:ring-2 focus:outline-none hover:bg-blue-600 transition px-8 py-2 text-lg font-bold flex items-center bg-blue-500 mt-2 text-white rounded-md">
                                    <span>Next lesson</span>
                                    <ChevronDoubleRightIcon className="w-5 h-5 ml-2"/>
                                </button>
                            </div>
                        </div>
                        <br/>
                        <hr/>
                        <h1 className="text-gray-900 text-2xl font-bold my-4">Course materials</h1>
                        {renderedModules}
                    </div>
                    {rightBlock}
                </div>
            </main>
        </>
    )
}



