import React, {useState} from 'react'
import {Link} from "react-router-dom";
import {ChartSquareBarIcon, HomeIcon, TableIcon, UsersIcon} from "@heroicons/react/outline";
import {TiContacts} from "react-icons/all";

export default function AdminSidebar({show, setTab, hideActivity}) {
    return (
        <>
            {/*Sidebar*/}
            <div className={`${show ? '-translate-x-full': ``} fixed inset-y-0 left-0 p-4 w-64 h-full bg-gray-800 transform transition-200 ease-in-out`}>
                <Link to="/">
                    <h1 className="text-white font-bold text-center text-xl mt-10 mb-10 cursor-pointer">ONLINE COURSES</h1>
                </Link>

                <Link to="/">
                    <div className="mt-2 hover:bg-blue-500 transition font-bold cursor-pointer bg-gray-900 text-gray-100 flex items-center px-5 py-3 rounded-lg">
                        <HomeIcon className="w-5 h-5 mr-2"/>
                        <span>Home</span>
                    </div>
                </Link>

                <Link to="/contacts">
                    <div className="mt-2 hover:bg-blue-500 transition font-bold cursor-pointer bg-gray-900 text-gray-100 flex items-center px-5 py-3 rounded-lg">
                        <TiContacts className="w-5 h-5 mr-2"/>
                        <span>Contacts</span>
                    </div>
                </Link>

                <div onClick={()=>{setTab('tables')}} className="mt-2 hover:bg-blue-500 transition font-bold cursor-pointer bg-gray-900 text-gray-100 flex items-center px-5 py-3 rounded-lg">
                    <TableIcon className="w-5 h-5 mr-2"/>
                    <span>Tables</span>
                </div>

                <div onClick={()=>{setTab('stats')}} className="mt-2 hover:bg-blue-500 transition font-bold cursor-pointer bg-gray-900 text-gray-100 flex items-center px-5 py-3 rounded-lg">
                    <ChartSquareBarIcon className="w-5 h-5 mr-2"/>
                    <span>Statistics</span>
                </div>

                <div onClick={()=>{hideActivity();setTab('users-activity')}} className="mt-2 hover:bg-blue-500 transition font-bold cursor-pointer bg-gray-900 text-gray-100 flex items-center px-5 py-3 rounded-lg">
                    <UsersIcon className="w-5 h-5 mr-2"/>
                    <span>Users Activity</span>
                </div>
            </div>
        </>
    )
}
