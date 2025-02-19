import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { usePrefStore } from "../store.ts"

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
            setLang(pathParts[0])
        }
        
    }, [location.pathname])

    useEffect(() => { // sets URL when lang changes
        const pathParts = location.pathname.split("/")

        if (pathParts[1] === lang) { // this safeguard prevents infinite loops
            pathParts[1] = encodeURIComponent(lang)
            navigate(pathParts.join("/"), { replace: true })
        } else {
            return
        }
        
    }, [lang])


    return null
}
