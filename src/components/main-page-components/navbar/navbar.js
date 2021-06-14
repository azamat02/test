import React, {Component, useContext, useState} from "react"
import {Link} from 'react-router-dom'
import './navbar.css'
import {AppContext} from "../../../stateManager";
import AuthService from "../../auth-service";
import Spinner from "../spinner";
import {Menu, Transition} from "@headlessui/react";
import {AdjustmentsIcon, LogoutIcon, UserCircleIcon, UserIcon} from "@heroicons/react/outline";

export default function Navbar(props){
    const { appState } = useContext(AppContext)
    const {isAuthorized, userData} = appState

    let {activeLink} = props

    let authBlock = !isAuthorized ? (
        <>
            <li className="block text-lg flex items-center mr-4 text-blue-500 font-medium">
                <Link to="/signin">
                    Sign in
                </Link>
            </li>
            <li className="block px-6 ml-2 py-2 transition text-medium text-white bg-blue-500 hover:bg-blue-600 rounded items-center flex text-lg">
                <Link to="/signup">
                    Sign up
                </Link>
            </li>
        </>
    ) : (
        <>
            <li className="block ml-2 transition">
                <div className="relative z-10 inline-block text-left">
                    <Menu>
                        {({ open }) => (
                            <>
                                <Menu.Button className="focus:outline-none inline-flex justify-center w-full">
                                    <button className="hover:bg-blue-600 focus:ring-2 transition flex items-center text-white relative focus:outline-none px-5 py-2 bg-blue-500 rounded-lg">
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
                                    <Menu.Items static className="border-2 absolute right-0 w-56 mt-2 origin-top-right text-gray-800 bg-white mt-4 divide-y divide-gray-100 rounded-md shadow-xl outline-none">
                                        <div className="py-1">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link
                                                        to="/profile/"
                                                        className={`${
                                                            active
                                                                ? "bg-gray-200 text-gray-900"
                                                                : "text-gray-800"
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
                                                                ? "bg-gray-200 text-gray-900"
                                                                : "text-gray-800"
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
                                                                ? "bg-gray-200 text-gray-900"
                                                                : "text-gray-800"
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
            </li>
        </>
    )

    return (
        <>
            <nav className="navbar">
                <ul className="nav-links">
                    <Link to="/" className="logo">
                            <span>
                                ONLINE COURSES
                            </span>
                    </Link>
                    <li className={`${activeLink === 'main' ? `text-blue-500` : ``} ml-12 block text-lg flex items-center mr-4 font-medium`}><Link to="/">Main page</Link></li>
                    <li className={`${activeLink === 'contacts' ? `text-blue-500` : ``} ml-8 block text-lg flex items-center mr-4 font-medium`}><Link to="/contacts">Contacts</Link></li>
                </ul>
                <ul className="nav-links">
                    {authBlock}
                </ul>
            </nav>
        </>
    )
}