import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import {Link} from "react-router-dom";
import {
    CheckCircleIcon,
    ExclamationCircleIcon,
    InformationCircleIcon,
    QuestionMarkCircleIcon
} from "@heroicons/react/outline";
import Spinner from "../../main-page-components/spinner";
import axios from "axios";

export default function RateModal(props) {

    let {open, courseId, userId} = props
    let [isOpen, setIsOpen] = useState(open)
    let [isLoader, setLoader] = useState(false)

    let sendData = async (e) => {
        e.preventDefault()

        setLoader(<Spinner/>)

        let text = e.target.querySelector("textarea").value
        let data = {
            u_id: ''+userId,
            c_id: ''+courseId,
            ctext: text,
            rate: ''
        }

        setLoader(
            <>
                <div className="flex items-center font-bold text-2xl">
                    <CheckCircleIcon className="w-10 h-10 mr-2 text-green-500"/>
                    <span>Thanks for your feedback!</span>
                </div>
                <button onClick={closeModal} className="w-full text-center py-2 bg-blue-500 text-white rounded mt-4 font-bold">Close</button>
            </>
        )

        let response = await axios.post("http://localhost:8000/api/comments", data).then(res=> {
            return res
        })
        console.log(response)
    }

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    let formContainer = isLoader ? isLoader : <>
        <Dialog.Title
            as="h3"
            className="text-lg font-bold text-xl justify-center leading-6 flex items-center text-gray-800"
        >
            <span>Share your feedback</span>
        </Dialog.Title>

        <textarea id="feedback_text" className="mt-3 w-full border-2 border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 px-3 py-2" rows="5" placeholder="Write here..."></textarea>
        <div className="mt-5 flex justify-end focus:outline-none">
            <button type="button" onClick={closeModal} className="bg-gray-200 hover:bg-gray-300 hover:text-gray-700 focus:outline-none transition focus-visible:ring-blue-500 px-6 py-2 font-bold text-gray-500 shadow rounded-md mr-2">Later</button>
            <button type={"submit"} className="bg-blue-500 hover:bg-blue-700 focus:outline-none transition focus-visible:ring-blue-500 px-6 py-2 font-bold text-white shadow rounded-md">Submit</button>
        </div>
    </>

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    open={isOpen}
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeModal}
                >
                    <div className="min-h-screen px-4 text-center focus:outline-none">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            leave="ease-in duration-200"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-black opacity-50 " />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                          &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="focus:outline-none inline-block w-full max-w-md px-6 py-5 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-xl">
                                <form onSubmit={(e)=>sendData(e)}>
                                    {formContainer}
                                </form>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
