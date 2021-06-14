// import React, {Component} from 'react'
//
// export default class Modal extends Component {
//     constructor(props) {
//         super(props);
//
//         this.type = props.type
//     }
//
//     render() {
//         return (
//
//         )
//     }
// }

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import {Link} from "react-router-dom";
import {CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon} from "@heroicons/react/outline";

export default function Modal(props) {

    let {type, href, open, title, info, buttonText, buttonLink} = props
    let [isOpen, setIsOpen] = useState(open)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

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
                            <div className="focus:outline-none inline-block w-full max-w-md px-4 py-5 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-xl">
                                <div className="grid grid-cols-7 gap-4">
                                    <div className="col-span-1 flex justify-center">
                                        {type === 'error' ? <ExclamationCircleIcon className="text-red-500 w-10 h-10"/>: ''}
                                        {type === 'info' ? <InformationCircleIcon className="text-blue-500 w-10 h-10"/>: ''}
                                        {type === 'success' ? <CheckCircleIcon className="text-green-500 w-10 h-10"/>: ''}
                                    </div>
                                    <div className="col-span-6">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            {title}
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                {info}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-5 flex justify-end focus:outline-none">
                                    {href ? <a href={buttonLink ? buttonLink : '/'}>
                                        <button
                                            type="button"
                                            className={`${type === 'info' ? `bg-blue-500 hover:bg-blue-700 focus-visible:ring-blue-500`: ``}
                                                        ${type === 'success' ? `bg-green-500 hover:bg-green-700 focus-visible:ring-green-500`: ``}
                                                        ${type === 'error' ? `bg-red-500 hover:bg-red-700 focus-visible:ring-red-500`: ``} focus:outline-none focus:ring-2 inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2`}
                                            onClick={closeModal}
                                        >
                                            {buttonText ? buttonText : 'OK'}
                                        </button>
                                    </a> : <Link to={buttonLink ? buttonLink : '/'}>
                                        <button
                                            type="button"
                                            className={`${type === 'info' ? `bg-blue-500 hover:bg-blue-700 focus-visible:ring-blue-500`: ``}
                                                        ${type === 'success' ? `bg-green-500 hover:bg-green-700 focus-visible:ring-green-500`: ``}
                                                        ${type === 'error' ? `bg-red-500 hover:bg-red-700 focus-visible:ring-red-500`: ``} focus:outline-none focus:ring-2 inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2`}
                                            onClick={closeModal}
                                        >
                                            {buttonText ? buttonText : 'OK'}
                                        </button>
                                    </Link>}
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
