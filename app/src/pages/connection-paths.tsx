import { ScrollArea } from "@/components/ui/scroll-area";
import { useSession } from "@/hooks/use-session";
import { getConnectionPaths } from "@/lib/services/friends.actions";
import { getUserByUsername, getUserById } from "@/lib/services/users.actions";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function ConnectionPaths() {
  const [paths, setPaths] = useState<string[][]>([]);
  const username = useParams().username as string;
  const { session } = useSession();
  const fetchPaths = async () => {
    try {
      const userResponse = await getUserByUsername(username);
      const user = userResponse.data;

      const pathsResponse = await getConnectionPaths(user._id);
      const rawPaths: string[][] = pathsResponse.data.paths;

      // Map IDs to usernames
      const mappedPaths = await Promise.all(
        rawPaths.map(async (path) => {
          const usernames = await Promise.all(
            path.map(async (userId) => {
              const userResponse = await getUserById(userId);
              return userResponse.data.username;
            })
          );
          return usernames;
        })
      );

      setPaths(mappedPaths);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPaths();
  }, [username]);

  if (session.user.username === username) return null;

  return (
    <ScrollArea className="max-h-96 overflow-y-auto w-full">
      <h1 className="mb-10">Connection Paths</h1>
      <div className="grid gap-5 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 mx-auto">
        {paths.length > 0 &&
          paths.map((path, index) => (
            <div
              className="col-span-1 flex items-center sm:justify-end gap-2 border-2 border-border p-2 rounded-md"
              key={index}
            >
              {path.map((username, index) => (
                <span
                  key={index}
                  className="text-sm px-3 py-1 bg-foreground/30 rounded-md"
                >
                  {username}
                </span>
              ))}
            </div>
          ))}
      </div>
    </ScrollArea>
  );
}
