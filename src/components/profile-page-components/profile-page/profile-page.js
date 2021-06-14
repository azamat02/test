import React, {Component, useContext, useEffect, useState} from 'react'
import {ProgressBar} from 'react-bootstrap'
import '../../course-page-components/course-rating/course-rating.css'
import {
    AcademicCapIcon, BookOpenIcon,
    LightningBoltIcon, LockClosedIcon,
    PresentationChartBarIcon,
    UserIcon
} from "@heroicons/react/outline";
import Modal from "../../tools/modal";
import {AppContext} from "../../../stateManager";
import CoursesApi from "../../api";
import Spinner from "../../main-page-components/spinner";
import PurchasedCourses from "../purchased-courses-section";

export default function ProfilePage() {
    const [activeButton, setActiveButton] = useState(0)
    const { appState } = useContext(AppContext)
    const { isAuthorized, userData } = appState
    const [purchasedCourses, setPurchasedCourses] = useState(null)
    const [allCourses, setAllCourses] = useState(null)

    if (!isAuthorized) {
        return <Modal info="You are not authorized! Please sign in/up." title="Error" type="error" open={true} buttonText="Sign in" buttonLink="/signin"/>
    }

    let changeButton = (num) => {
        setActiveButton(num)
    }

    return (
        <>
            <div className="grid grid-rows-10 grid-flow-col mt-10 gap-4">
                {/*Sidebar*/}
                <div className="col-span-1 row-span-3 ">
                    <div className="sticky top-0 rounded shadow pt-8 px-10 pb-8 h-50 mt">
                        <h1 className="text-3xl font-bold">Profile</h1>
                        <a href="#information">
                            <button onClick={()=> changeButton(0)} className={`${activeButton === 0 ? `bg-gray-300` : `bg-gray-50`} hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 transition px-7 py-3 mt-8 shadow font-bold rounded-lg block w-full text-left`}>
                                <UserIcon className="w-5 h-5 inline mb-1 mr-2"/>
                                Profile info
                            </button>
                        </a>
                        <a href="#courses">
                            <button onClick={()=> changeButton(1)} className={`${activeButton === 1 ? `bg-gray-300` : `bg-gray-50`} hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-gray-700 shadow px-7 py-3 mt-4 font-bold rounded-lg block w-full text-left`}>
                                <BookOpenIcon className="w-5 h-5 inline mb-1 mr-2"/>
                                My courses
                            </button>
                        </a>
                        <a href="#change_password">
                            <button onClick={()=> changeButton(2)} className={`${activeButton === 2 ? `bg-gray-300` : `bg-gray-50`} hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-gray-700 shadow px-7 py-3 mt-4 font-bold rounded-lg block w-full text-left`}>
                                <LockClosedIcon className="w-5 h-5 inline mb-1 mr-2"/>
                                Change password
                            </button>

                        </a>
                    </div>
                </div>

                {/*Personal info*/}
                <div className="col-span-1" id="information">
                    <div className="col-span-3 rounded container shadow pt-2">
                        <div className="px-6 py-2">
                            <h1 className="text-2xl font-medium ">Profile information</h1>
                            <h1 className="text-lg text-gray-500 ">Personal data</h1>
                        </div>
                        <hr className="mt-2 "/>
                        <div className="grid grid-cols-6 bg-gray-100 p-6">
                            <div className="text-gray-600 font-medium col-span-2">Full name</div>
                            <div className="font-medium col-span-4">{userData.name+" "+userData.surname}</div>
                        </div>
                        <div className="grid grid-cols-6 p-6">
                            <div className="text-gray-600 font-medium col-span-2">Email adress</div>
                            <div className="font-medium col-span-4">{userData.email}</div>
                        </div>
                        <div className="grid grid-cols-6 bg-gray-100 p-6">
                            <div className="text-gray-600 font-medium col-span-2">Login</div>
                            <div className="font-medium col-span-4">{userData.login}</div>
                        </div>
                    </div>
                </div>

                {/*Purchased Courses*/}
                <PurchasedCourses userId={userData.id}c/>

                {/*Change password*/}
                <div className="col-span-1 mb-36" id="change_password">
                    <div className="container rounded mt-2 shadow pt-2 pb-10">
                        <div className="px-6 py-2">
                            <h1 className="text-2xl font-medium ">Change password</h1>
                            <h1 className="text-lg text-gray-500 ">Password details</h1>
                        </div>
                        <hr className="mt-2 mb-2"/>
                        <div className="px-6 py-2">
                            <form>
                                <div className="grid grid-cols-2 gap-5">
                                    <div>
                                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Password</label>
                                        <input className="border-gray-400 border-2 focus:outline-none rounded-md py-2 block mb-4 mt-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full px-4 sm:text-sm" type="text" placeholder="Enter password"/>
                                    </div>
                                    <div>
                                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Repeat password</label>
                                        <input className="border-gray-400 border-2 focus:outline-none rounded-md py-2 block mb-4 mt-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full px-4 sm:text-sm" type="text" placeholder="Enter password"/>
                                    </div>
                                </div>
                                <button className="bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 py-3 px-10 transition font-bold text-white rounded-lg hover:bg-green-600">
                                    Change password
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}