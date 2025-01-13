import { logoutAction } from "@/lib/recoil/actions/logout.action";
import { Button } from "../ui/button";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { LucideLogOut } from "lucide-react";

export default function LogoutButton() {
  const handleLogout = () => {
    logoutAction().then(() => {
      window.location.replace("/");
    });
  };
  return (
    <Button
      asChild
      className="w-full flex items-center justify-start pl-3"
      variant={"ghost"}
    >
      <DropdownMenuItem onClick={() => handleLogout()}>
        <LucideLogOut className="size-5" />
        Logout
      </DropdownMenuItem>
    </Button>
  );
}
