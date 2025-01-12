import { BrowserRouter as Router } from "react-router";
import { ModeToggle } from "./components/theme-toggle";
import AppRoutes from "./routes";

function App() {
  return (
    <Router>
      <ModeToggle />
      <AppRoutes />
    </Router>
  );
}

export default App;
