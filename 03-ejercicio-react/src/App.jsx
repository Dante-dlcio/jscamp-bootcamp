import { HomePage } from "./pages/Home";
import { Search } from "./pages/Search";
import { NotFound } from "./pages/404";
import { useCurrentPath } from "./hooks/useCurrentPath";
import { Route } from "./components/Route";

function App() {
  const currentPath = useCurrentPath();
  const isFound = ["/", "/search"].includes(currentPath);
  return (
    <>
      <Route path={"/"} element={<HomePage />} currentPath={currentPath} />
      <Route path={"/search"} element={<Search />} currentPath={currentPath} />
      {!isFound && <NotFound />}
    </>
  );
}

export default App;
