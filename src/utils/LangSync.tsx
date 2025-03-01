import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"


// Unused since globally-managed lang support dropped

let ignore = false // Second useEffect should ignore the request to update URL if the lang change comes from the URL.

export default function LangSync() { // Updates the lang on URL manipulaion and manipulates the URL on lang change
    const location = useLocation()
    const navigate = useNavigate()




    return null
}
