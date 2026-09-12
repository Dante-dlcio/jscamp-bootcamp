import { useLocation, useNavigate } from "react-router";

export function useRouter() {
  const navigateTo = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;

  return {
    currentPath,
    navigateTo,
  };
}
