import { Link } from "react-router";
import { Button } from "./ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

export default function LoginPrompt({
  username,
  name,
}: {
  username: string;
  name: string;
}) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          <h1>See more from {username}</h1>
        </DialogTitle>
        <DialogDescription>
          <p>See posts from {name}</p>
        </DialogDescription>
      </DialogHeader>
      <Button asChild className="w-full">
        <Link to="/auth/login">Login</Link>
      </Button>
    </DialogContent>
  );
}
