import { Link } from "react-router";
import { ModeToggle } from "./theme-toggle";

export default function Header() {
  return (
    <header className="fixed w-full flex items-center justify-between p-2 bg-background dark:bg-black border-b-2">
      <h1 className="text-md font-bold">Social Networks</h1>
      <nav>
        <ul className="flex items-center space-x-4">
          <li>
            <Link to="/auth/login">Login</Link>
          </li>
          <li>
            <Link to="/auth/register">Register</Link>
          </li>
        </ul>
      </nav>
      <ModeToggle />
    </header>
  );
}
