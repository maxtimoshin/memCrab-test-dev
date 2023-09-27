import "./App.css";
import { AppContextProvider } from "./AppContext.tsx";
import Panel from "./components/Panel/index.tsx";
import Table from "./components/Table/index.tsx";

function App() {
  return (
    <AppContextProvider>
      <div className="wrapper">
        <Panel />
        <Table />
      </div>
    </AppContextProvider>
  );
}

export default App;
