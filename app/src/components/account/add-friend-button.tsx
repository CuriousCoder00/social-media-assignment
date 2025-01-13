import { useSession } from "@/hooks/use-session";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";
import LoginPrompt from "../login-prompt";
import { useToast } from "@/hooks/use-toast";
import { addFriend, removeFriend } from "@/lib/services/friends.actions";

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
  const { toast } = useToast();
  const isLoggedIn = session.isLoggedIn;
  const isFriends = session.friends.includes(userId);
  const handleAddFriend = async () => {
    const res = await addFriend(userId);
    toast({
      title: res.data.message,
      variant: res.status === 200 ? "default" : "destructive",
    });
  };
  const handleRemoveFriend = async () => {
    const res = await removeFriend(userId);
    toast({
      title: res.data.message,
      variant: res.status === 200 ? "default" : "destructive",
    });
  };
  if (isLoggedIn && session.user.id !== userId && !isFriends) {
    return <Button onClick={() => handleAddFriend()}>Add Friend</Button>;
  }
  if (isLoggedIn && session.user.id === userId) {
    return null;
  }
  if (isLoggedIn && isFriends) {
    return <Button onClick={() => handleRemoveFriend()}>Remove</Button>;
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
