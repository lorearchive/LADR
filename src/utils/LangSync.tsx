import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { usePrefStore } from "../store.ts"

let ignore = false // Second useEffect should ignore the request to update URL if the lang change comes from the URL.

export default function LangSync() { // Updates the lang on URL manipulaion and manipulates the URL on lang change
    const location = useLocation()
    const navigate = useNavigate()
    const setLang = usePrefStore((state) => state.setLang)
    const lang = usePrefStore((state) => state.lang)


    useEffect(() => { // sets lang when URL changes

        const pathParts = location.pathname.split("/").filter(Boolean)
        if (pathParts[0] !== lang && pathParts[0] === undefined) {
            setLang("en")
        } else if (pathParts[0] !== lang && pathParts[0] !== undefined) {
            ignore = true
            setLang(pathParts[0])
        }
        
    }, [location.pathname])

    useEffect(() => { // sets URL when lang changes

        try {
            if (!ignore) {
                const pathParts = location.pathname.split("/").filter(Boolean)
    
                if (!(pathParts[0] === lang)) { // this safeguard prevents infinite loops
                    pathParts[0] = encodeURIComponent(lang)
                    navigate(pathParts.join("/"), { replace: true })
                }
            }
        } finally {
            ignore = false
        }
        
    }, [lang])


    return null
}
