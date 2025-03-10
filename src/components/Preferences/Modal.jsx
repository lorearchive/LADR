import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Backdrop from "./Backdrop";

const Modal = ({ handleClose }) => {

    const lang = window.location.pathname.split("/").filter(Boolean).slice(0, -1)[0]
    const navigate = useNavigate()
    const handleNavigate = (lang) => {
        navigate(`/${lang}/` + window.location.pathname.split("/").filter(Boolean).slice(1).join("/"));
    }

    return (
        <Backdrop onClick={handleClose}>
            <motion.div
                onClick={(e) => e.stopPropagation()}
                className="relative flex flex-col items-center p-6 rounded-lg shadow-lg dark:bg-gray-800 z-60"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.13 }}
            >

                <div className="w-full mb-3 text-left">
                    <h1 style={{fontStyle: "oblique"}}>Preferences</h1>
                </div>

                <div id="settingsWindow" className="p-3">
                    <div id="setting" className="flex items-center">
                        <p>Language:</p>
                        <div className="inline-flex ml-3 rounded-md shadow-xs dark:border-slate-700" role="group">
                            <button type="button" onClick={() => handleNavigate("en")} className={`px-4 py-2 border-t-3 border-b-3 text-sm dark:border-gray-700 font-medium rounded-s-lg focus:z-10 ${lang === "en" ? "bg-blue-700 text-white dark:bg-blue-600" : "bg-white text-gray-900 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"}`}>
                                English (en)
                            </button>
                            <button type="button" onClick={() => handleNavigate("ko")} className={`px-4 py-2 border-t-3 border-b-3 text-sm dark:border-gray-700 font-medium focus:z-10 ${lang === "ko" ? "bg-blue-700 text-white dark:bg-blue-600" : "bg-white text-gray-900 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"}`}>
                                Korean (ko)
                            </button>
                            <button type="button" onClick={() => handleNavigate("zh")} className={`px-4 py-2 border-t-3 border-b-3 text-sm dark:border-gray-700 font-medium focus:z-10 ${lang === "zh" ? "bg-blue-700 text-white dark:bg-blue-600" : "bg-white text-gray-900 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"}`}>
                                Chinese (zh)
                            </button>
                            <button type="button" onClick={() => handleNavigate("th")} className={`px-4 py-2 border-t-3 border-b-3 text-sm dark:border-gray-700 font-medium focus:z-10 ${lang === "th" ? "bg-blue-700 text-white dark:bg-blue-600" : "bg-white text-gray-900 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"}`}>
                                Thai (th)
                            </button>
                            <button type="button" onClick={() => handleNavigate("ja")} className={`px-4 py-2 border-t-3 border-b-3 text-sm dark:border-gray-700 rounded-e-lg font-medium focus:z-10 ${lang === "ja" ? "bg-blue-700 text-white dark:bg-blue-600" : "bg-white text-gray-900 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"}`}>
                                Japanese (ja)
                            </button>
                        </div>
                    </div>
                </div>

                <button onClick={handleClose} className="p-3 rounded-md dark:bg-gray-900">Close</button>
            </motion.div>
        </Backdrop>
    );
}

export default Modal;