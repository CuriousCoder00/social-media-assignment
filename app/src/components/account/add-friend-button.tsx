import { useSession } from "@/hooks/use-session";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";
import LoginPrompt from "../login-prompt";

export default function AddFriendButton({
  userId,
  username,
  name,
}: {
  userId: string;
  username: string;
  name: string;
}) {
  const { session } = useSession();
  const isLoggedIn = session.isLoggedIn;
  const isFriends = session.friends.includes(userId);
  console.log(isFriends);
  if (isLoggedIn && session.user.id !== userId && !isFriends) {
    return <Button>Add Friend</Button>;
  }
  if (isLoggedIn && session.user.id === userId) {
    return null;
  }
  if (isLoggedIn && isFriends) {
    return <Button>Remove</Button>;
  }
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Add Friend</Button>
      </DialogTrigger>
      <LoginPrompt username={username} name={name} />
    </Dialog>
  );
}
