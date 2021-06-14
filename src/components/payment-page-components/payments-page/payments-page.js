import React, {Component, useContext, useEffect, useState} from 'react'
import CoursesApi from "../../api";
import Spinner from "../../main-page-components/spinner";
import ListBox from "../../tools/listbox";
import PaymentForm from "../../tools/payment-form";
import {BookOpenIcon, CashIcon, LockClosedIcon, UserIcon} from "@heroicons/react/outline";
import Modal from "../../tools/modal";
import {AppContext} from "../../../stateManager";

export default function PaymentsPage(props) {
    const { appState } = useContext(AppContext)
    const { isAuthorized, userData } = appState
    const [courseId, setCourseId] = useState(props.courseId)
    const [course, setCourse] = useState(null)

    let api = new CoursesApi()

    useEffect(()=>{
        if (course == null) {
            api.getCourse(courseId).then(data=>{
                setCourse(data)
            })
        }
    })

    if (!isAuthorized) {
        return <Modal info="You are not authorized! Please sign in/up." title="Error" type="error" open={true} buttonText="Sign in" buttonLink="/signin"/>
    }

    if (!course) {
        return <Spinner/>
    }

    let countries = [
        {id: 1, name: "Kazakhstan"},
        {id: 2, name: "Russia"},
        {id: 3, name: "UK"},
        {id: 4, name: "USA"},
        {id: 5, name: "Turkey"},
        {id: 6, name: "France"},
    ]

    return (
        <div className="container mt-10 grid grid-cols-3 gap-5">
            {/*All details*/}
            <div className="details col-span-2">
                <h1 className="text-3xl font-bold text-gray-900">Order placement</h1>
                <div className="adress">
                    <p className="my-2 mt-10 text-gray-700 font-medium">Billing address</p>
                    <ListBox items={countries}/>
                </div>
                <hr/>
                <br/>
                <div className="payment-details">
                    <h1 className="text-xl my-5 mx-2 font-bold text-gray-900">Payment details</h1>
                    <PaymentForm/>
                </div>
                <br/>
                <hr/>
                <br/>
                <div className="order-details mb-36">
                    <h1 className="text-xl my-5 mx-2 font-bold text-gray-900">Order details</h1>
                    <div className="w-1/2 shadow-xl rounded-lg px-10 py-4 border-2 border-blue-500 bg-blue-100 flex justify-between">
                        <p className="text-lg font-bold">{course.courseTitle}</p>
                        <p className="text-lg font-bold flex items-center">
                            <CashIcon className="w-5 h-5 mr-1"/>
                            2$
                        </p>
                    </div>
                </div>
            </div>
            {/*Complete order*/}
            <div className="complete">
                <div className="sticky top-0 rounded shadow p-6 h-50">
                    <h1 className="text-3xl font-bold mb-2">Order complete</h1>
                    <br/>
                    <div className="flex justify-between">
                        <p className="text-md font-medium mb-2">{course.courseTitle}</p>
                        <p className="text-md font-medium mb-2">2$</p>
                    </div>
                    <div className="flex justify-between border-t-2 pt-2 border-gray-900">
                        <p className="text-md font-bold mb-2">Total price: </p>
                        <p className="text-md font-bold mb-2">2$</p>
                    </div>
                    <br/><br/>
                    <p>
                        By completing your purchase, you agree to these <a href="" className="text-blue-900 font-medium underline">Terms of Service.</a>
                    </p>
                    <button className="px-10 py-3 bg-blue-500 text-white rounded mt-4 w-full transition hover:bg-blue-600 focus:outline-none focus:ring-2">Complete order</button>
                </div>
            </div>
        </div>
    )
}