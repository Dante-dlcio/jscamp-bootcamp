import { Header } from "./components/Header";
import { SearchFormSection } from "./components/SearchFormSection";
import { SearchResultSection } from "./components/SearchResultsSection";
import { Footer } from "./components/Footer";

function App() {
  return (
    <>
      <Header />

      <main>
        <SearchFormSection />
        <SearchResultSection />
      </main>
      <Footer />
    </>
  );
}

export default App;
