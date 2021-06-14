import React, {useState} from "react";

import { Dialog } from '@headlessui/react'


export default function ContactsPage(){
    let [isOpen, setIsOpen] = useState(true)

    return (
        <main>
            <div className="container mt-12">
                <h1 className="text-4xl font-bold ">Contact us</h1>
                <div className="mt-6 leading-8">
                    <p>Email: test@mail.com</p>
                    <p>Phone: +77001231212</p>
                </div>
            </div>
        </main>
    )
}