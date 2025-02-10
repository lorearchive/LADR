import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { usePrefStore } from "../../store.ts"

export default function LangUpdater() {
    const location = useLocation()
    const navigate = useNavigate()
    const lang = usePrefStore((state) => state.lang)
    const setLang = usePrefStore((state) => state.setLang)

    useEffect(() => {
        const pathParts = location.pathname.split("/")

        if (pathParts[1] !== lang) {
            pathParts[1] = encodeURIComponent(lang)
            navigate(pathParts.join("/"), { replace: true })
        }
    }, [lang, setLang, navigate, location.pathname]) // Effect that listens to lang changes

    return null
}
