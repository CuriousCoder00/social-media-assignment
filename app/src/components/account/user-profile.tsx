import { getNameInitial } from "@/lib/utils";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getUserByUsername } from "@/lib/services/users.actions";
import { Skeleton } from "../ui/skeleton";
import NotFound from "@/pages/not-found";

interface UserProfile {
  email: string;
  friends: Array<{
    _id: string;
    email: string;
    name: string;
    friends: [];
    __v: number;
  }>;
  name: string;
  username: string;
  length: number;
  _id: string;
}

export const ProfileDetails = () => {
  const username = useParams().username as string;
  const [ProfileData, setProfileData] = useState<UserProfile>({
    email: "",
    friends: [],
    name: "",
    username: "",
    length: 0,
    _id: "",
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getUserByUsername(username);
      setProfileData(res.data);
      console.log(res.data);
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
  if(!ProfileData._id){
    return <NotFound />
  }
  return (
    <div className="flex flex-col items-center p-4 justify-center rounded-md dark:bg-neutral-900 bg-neutral-200 w-full relative">
      <h1 className="font-semibold">User Profile</h1>
      <div className="absolute top-0 left-0 right-0 bg-sky-700 h-1/2 m-4 rounded-t-md"></div>
      <div className="flex flex-col items-start justify-center w-full p-4">
        <Avatar className="w-28 h-28">
          <AvatarFallback className="text-xl">
            {getNameInitial(ProfileData.name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex justify-between items-center space-x-7">
          <div className="mt-4 flex flex-col space-y-0">
            <h2 className="text-lg font-semibold">{ProfileData.username}</h2>
            <h2 className="text-sm text-muted-foreground">
              {ProfileData.email}
            </h2>
          </div>
          <div className="flex items-center justify-start gap-2">
            <div className="flex items-center justify-center gap-2">
              <h2 className="text-md font-semibold">
                {ProfileData.friends.length}
              </h2>
              <h2 className="text-md text-muted-foreground">Friends</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
