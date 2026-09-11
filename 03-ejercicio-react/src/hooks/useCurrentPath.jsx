import { useState, useEffect } from "react";

export function useCurrentPath() {
  const [currentRoute, setRoute] = useState(window.location.pathname);
  const updateRoute = () => setRoute(window.location.pathname);

  useEffect(() => {
    window.addEventListener("popstate", updateRoute);
    return () => window.removeEventListener("popstate", updateRoute);
  }, []);
  return currentRoute;
}
