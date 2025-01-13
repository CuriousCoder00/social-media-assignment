import { BrowserRouter as Router } from "react-router";
import AppRoutes from "./routes";
import Header from "./components/header";

function App() {
  return (
    <Router>
      <Header />
      <div className="pt-16 md:px-20 px-4 max-w-screen mx-auto overflow-x-hidden">
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
