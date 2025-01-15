import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { getUserByUsername, getFriends } from "@/lib/services/users.actions";
import { useSession } from "@/hooks/use-session";

interface User {
  _id: string;
  username: string;
}

interface MutualConnections {
  [key: string]: string[];
}

export default function Mutuals() {
  const { session } = useSession();
  console.log(session);
  const username = useParams().username as string;
  const [mutualConnections, setMutualConnections] = useState<
    MutualConnections[]
  >([]);

  const fetchProfileData = async () => {
    try {
      // Fetch profile user details
      const userResponse = await getUserByUsername(username);
      const user = userResponse.data;
      // Fetch the current user's following
      const profileFollowersResponse = await getFriends(user._id);
      const profileFollowers = profileFollowersResponse.data;
      // Find mutual connections
      const mutuals = profileFollowers.filter((follower: User) => {
        return session.friends.includes(follower._id);
      });
      setMutualConnections(mutuals);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, [username]);

  return (
    <div>
      {session.user.username === username ? null : mutualConnections ? (
        mutualConnections.length > 0 ? (
          <p>
            Followed by{" "}
            {mutualConnections.length < 3 && (
              <>
                <Link to={`/account/${mutualConnections[0].username}`}>
                  {mutualConnections[0].username}
                </Link>
                ,{" "}
                <Link to={`/account/${mutualConnections[1].username}`}>
                  {mutualConnections[1].username}
                </Link>{" "}
              </>
            )}
            {mutualConnections.length > 2 && (
              <>
                <Link to={`/account/${mutualConnections[0].username}`}>
                  {mutualConnections[0].username}
                </Link>
                ,{" "}
                <Link to={`/account/${mutualConnections[1].username}`}>
                  {mutualConnections[1].username}
                </Link>{" "}
                and {mutualConnections.length - 2} others
              </>
            )}
          </p>
        ) : null
      ) : null}
    </div>
  );
}
