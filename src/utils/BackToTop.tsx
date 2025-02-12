import React from 'react';
import { useState, useEffect } from 'react';

export default function BackToTop() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 300)
        }

        window.addEventListener("scroll", toggleVisibility)
        return () => window.removeEventListener("scroll", toggleVisibility)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth"})
    }

    return (
        <button
            type="button"
            onClick={scrollToTop}
            className={`fixed bottom-4 cursor-pointer right-4 dark:bg-slate-700 text-white px-4 py-2 rounded-full shadow-lg transition-opacity ${
                isVisible ? "opacity-100" : "hidden"
              }`}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
            </svg>

        </button>
    )
}