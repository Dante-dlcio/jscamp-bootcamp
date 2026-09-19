import { NavLink } from "react-router";
import { useAuthStore } from "../store/authStore";
import { useFavoritesStore } from "../store/favoritesStore";
import { Link } from "./Link";

export function Header() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  // Podemos leer el dato directamente del estado, sin llamar funciones dentro del selector
  const favoritesCount = useFavoritesStore((state) => state.favorites.length);

  return (
    <header>
      <Link href="/" style={{ textDecoration: "none" }}>
        <h1 style={{ color: "white" }}>
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
          DevJobs
        </h1>
      </Link>

      <nav>
        <NavLink
          className={({ isActive }) => (isActive ? "navLinkIsActive" : "")}
          to="/search"
        >
          Empleos
        </NavLink>
        {isLoggedIn && (
          <span>
            Empleos favoritos {favoritesCount > 0 ? "❤️" : "🤍"}
            {favoritesCount}
          </span>
        )}
        <button type="button" onClick={isLoggedIn ? logout : login}>
          {isLoggedIn ? "Cerrar sesión" : "Iniciar Sesión"}
        </button>
      </nav>
    </header>
  );
}
