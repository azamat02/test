import React,{Component} from "react"
import './footer.css'

export default function Footer(){

    return (
        <>
            <footer>
                <div className="footer-part-one">
                    <p className="title">
                        ONLINE COURSES
                    </p>
                    <p className="text-green">Web page map</p>
                    <a href="/">Main page</a>
                    <a href="/">My course</a>
                    <a href="/">Profile</a>
                </div>
                <div className="footer-part-two">
                    <p className="title">Information</p>
                    <p className="text-green">Support</p>
                    <a href="/">Contacts</a>
                    <a href="/">FAQ</a>
                </div>
                <div className="footer-part-three">
                    <p className="title">Social networks</p>
                    <a href="instagram.com">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-instagram" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#1A9E5E" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <rect x="4" y="4" width="16" height="16" rx="4" />
                            <circle cx="12" cy="12" r="3" />
                            <line x1="16.5" y1="7.5" x2="16.5" y2="7.501" />
                        </svg>
                    </a>
                    <a href="telegram.com">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-telegram" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#1A9E5E" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" />
                        </svg>
                    </a>
                </div>
            </footer>
        </>
    )
}