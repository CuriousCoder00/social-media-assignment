import { Routes, Route } from "react-router";
import LoginPage from "./pages/auth/login";
import RegistrationPage from "./pages/auth/resgiter";

export default function AppRoutes() {
  return (
    <Routes>
      <Route index element={<h1>App</h1>} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegistrationPage />} />
    </Routes>
  );
}
