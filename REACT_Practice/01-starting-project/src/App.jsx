import { Examples } from "./components/Examples.jsx";
import Header from "./components/Header/Header.jsx";
import { CoreConcepts } from "./components/CoreConcepts";

function App() {
  return (
    <>
      <Header/>
      <main>
      <CoreConcepts/>
      <Examples/>
      </main>
    </>
  );
}

export default App;
