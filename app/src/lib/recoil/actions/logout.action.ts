import { logout } from "@/lib/services/auth.actions";
import { redirect } from "react-router";

export const logoutAction = async () => {
    localStorage.removeItem("session");
    localStorage.removeItem("token");
    await logout();
    redirect("/")
}