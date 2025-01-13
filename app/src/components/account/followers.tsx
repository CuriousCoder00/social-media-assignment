import { useSession } from "@/hooks/use-session";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Link } from "react-router";
import LoginPrompt from "../login-prompt";
import { ScrollArea } from "../ui/scroll-area";
import AddFriendButton from "./add-friend-button";
import { Avatar, AvatarFallback } from "../ui/avatar";

export default function Followers({
  userId,
  username,
  name,
  children,
  followers,
}: {
  userId: string;
  username: string;
  name: string;
  children: React.ReactNode;
  followers: Array<{
    _id: string;
    email: string;
    name: string;
    username: string;
    friends: [];
  }>;
}) {
  const { session } = useSession();
  const isLoggedIn = session.isLoggedIn;
  if (isLoggedIn) {
    return (
      <Dialog>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Followers of {username}</DialogTitle>
            <DialogDescription>See who follows {name}</DialogDescription>
          </DialogHeader>
          <ScrollArea className="flex flex-col items-center justify-start max-h-96 space-y-2 gap-3 pr-3">
            {followers.map((follower) => (
              <div
                key={follower._id}
                className="flex items-center justify-between w-full p-2 rounded-lg border border-foreground/30 hover:bg-foreground/5 my-3"
              >
                <Link
                  to={`/account/${follower.username}`}
                  className="flex items-center space-x-2 w-full"
                >
                  <Avatar>
                    <AvatarFallback>
                      {follower.name[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="flex flex-col items-start">
                    <span className="uppercase font-semibold">
                      {follower.name}
                    </span>
                    <span>{follower.username}</span>
                  </span>
                </Link>
                <AddFriendButton
                  name={name}
                  username={username}
                  userId={userId}
                />
              </div>
            ))}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <LoginPrompt username={username} name={name} />
    </Dialog>
  );
}
