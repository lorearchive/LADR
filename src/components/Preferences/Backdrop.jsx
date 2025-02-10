import { motion } from "framer-motion";

const Backdrop = ({ children, onClick }) => {
    return (
        <motion.div
            className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black opacity-50"
            onClick={onClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {children}
        </motion.div>
    );
}

export default Backdrop;