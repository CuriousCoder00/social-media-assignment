import { Link } from "react-router";
import { ModeToggle } from "./theme-toggle";
import { useSession } from "@/hooks/use-session";
import ProfileSettings from "./profile-settings";

export default function Header() {
  const { session } = useSession();
  return (
    <header className="fixed inset-x-0 w-full flex items-center justify-between p-2 bg-background dark:bg-black border-b-2 md:px-20 px-4">
      <Link to={"/"} className="text-md font-bold">
        Hello!!
      </Link>
      <nav className="flex items-center space-x-4">
        <div className="">
          {session.isLoggedIn ? (
            <ProfileSettings />
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/auth/register">Get Started</Link>
              <ModeToggle />
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
