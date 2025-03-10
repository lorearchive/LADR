import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname])

  return null;
};

export default ScrollToTop;

// What did you expect ScrollToTop to do?
// Used for components btw - like pages scroll to top on first load/mount