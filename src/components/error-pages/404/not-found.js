import React from 'react'
import {Link} from "react-router-dom";

export default function NotFound() {
    return (
        <>
            <div className="flex justify-center my-72">
                <h1 className="text-9xl font-bold border-r-4 border-gray-900 pr-10">404</h1>
                <h1 className="text-5xl font-bold pl-10">
                    Not found
                    <Link to="/" className="text-lg mt-10 block text-blue-600 underline">
                        Go to main
                    </Link>
                </h1>
            </div>
        </>
    )
}