import { getNameInitial } from "@/lib/utils";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getUserByUsername } from "@/lib/services/users.actions";
import { Skeleton } from "../ui/skeleton";
import NotFound from "@/pages/not-found";
import {
  Users,
  Image as ImageIcon,
  MessageCircle,
  Heart,
  Share2,
  Calendar,
} from "lucide-react";
import AddFriendButton from "./add-friend-button";
import EditProfile from "./edit-profile";
import { useSession } from "@/hooks/use-session";
import Followers from "./followers";
import Mutuals from "./mutual-connections";
interface UserProfile {
  email: string;
  friends: Array<{
    _id: string;
    email: string;
    name: string;
    username: string;
    friends: [];
  }>;
  posts: Array<{
    _id: string;
    content: string;
    image: string;
    likes: [];
    comments: [];
    user: string;
    createdAt: Date;
  }>;
  name: string;
  username: string;
  _id: string;
  joined: Date;
}

export const ProfileDetails = () => {
  const { session } = useSession();
  const username = useParams().username as string;

  const [ProfileData, setProfileData] = useState<UserProfile>({
    email: "",
    friends: [],
    name: "",
    username: "",
    _id: "",
    joined: new Date(),
    posts: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getUserByUsername(username);
      setProfileData(res.data);
      setLoading(false);
    };
    fetchData();
  }, [username]);
  if (loading) {
    return (
      <div className="flex flex-col items-center p-4 justify-center rounded-md dark:bg-neutral-900 bg-neutral-200 w-full relative">
        <Skeleton className="w-14 h-4 rounded-sm" />
        <div className="absolute top-0 left-0 right-0 bg-sky-700 h-1/2 m-4 rounded-t-md"></div>
        <div className="flex flex-col items-start justify-center w-full p-4">
          <Skeleton className="w-28 h-28 rounded-full" />
          <div className="flex justify-between items-center space-x-7">
            <div className="mt-4 flex flex-col space-y-0">
              <Skeleton className="w-14 h-4 rounded-sm" />
              <Skeleton className="w-16 h-4 rounded-sm" />
            </div>
            <div className="flex items-center justify-start gap-2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!ProfileData._id) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen w-full p-4 mt-20">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 -mt-20">
        <div className="bg-background rounded-lg shadow-lg p-6 w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full">
            <div className="flex items-center gap-6 w-full">
              <Avatar className="w-28 h-28">
                <AvatarFallback className="text-xl">
                  {getNameInitial(ProfileData.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col w-full">
                <div className="flex flex-col">
                  <h1 className="text-2xl font-bold">{ProfileData.name}</h1>
                  <h1 className="text-sm text-muted-foreground">
                    @{ProfileData.username}
                  </h1>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar size={20} />
                    Joined {new Date(ProfileData.joined).getFullYear()}
                  </span>
                </div>
                {session.user.id !== ProfileData._id && (
                  <div className="flex items-center gap-2 mt-2">
                    <Mutuals />
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-4">
                <AddFriendButton
                  name={ProfileData.name}
                  username={ProfileData.username}
                  userId={ProfileData._id}
                />
                {session.isLoggedIn && session.user.id === ProfileData._id && (
                  <EditProfile />
                )}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-6 mt-6 py-4 border-y border-foreground">
            <Followers
              name={ProfileData.name}
              username={ProfileData.username}
              userId={ProfileData._id}
              followers={ProfileData.friends}
            >
              <div className="flex items-center gap-2">
                <Users size={20} />
                <span className=" font-semibold">
                  {ProfileData.friends.length}
                </span>
                <span>Followers</span>
              </div>
            </Followers>
            <div className="flex items-center gap-2">
              <ImageIcon size={20} />
              <span className=" font-semibold">
                {ProfileData.posts?.length || 0}
              </span>
              <span>Posts</span>
            </div>
          </div>

          {/* Recent Post */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-4">Recent Post</h2>
            <div className="border border-foreground/30 rounded-lg p-4">
              <p className="">
                Just launched a new project! Check out my latest work on
                building scalable applications with React and TypeScript. 🚀
                #webdev #coding
              </p>
              <img
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80"
                alt="Code screenshot"
                className="mt-4 rounded-lg w-full h-64 object-cover"
              />
              <div className="flex items-center gap-6 mt-4 text-gray-600">
                <button className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                  <Heart size={20} />
                  <span>245</span>
                </button>
                <button className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                  <MessageCircle size={20} />
                  <span>23</span>
                </button>
                <button className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                  <Share2 size={20} />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
