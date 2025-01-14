import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getUsers } from "@/lib/services/users.actions";
import React, { useEffect } from "react";
import { Link } from "react-router";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-h-[90dvh] overflow-y-hidden">
      <ScrollArea className="hidden md:block max-h-[90dvh] overflow-y-auto">
        <Sidebar2 />
      </ScrollArea>
      {/* Main Content */}
      <ScrollArea className="md:col-span-2 max-h-[90dvh] overflow-y-auto pr-3">
        {children}
      </ScrollArea>
      {/* Sidebar */}
      <ScrollArea className="hidden md:block max-h-[90dvh] overflow-y-auto">
        <Sidebar />
      </ScrollArea>
    </div>
  );
}

function Sidebar() {
  const trends = [
    { topic: "Technology", posts: "125K posts" },
    { topic: "Sports", posts: "98K posts" },
    { topic: "Entertainment", posts: "85K posts" },
  ];

  return (
    <ScrollArea className="rounded-lg shadow p-4">
      <h2 className="font-bold text-xl mb-4">Trending Topics</h2>
      {trends.map((trend, index) => (
        <div key={index} className="mb-4">
          <h3 className="font-semibold">{trend.topic}</h3>
          <p className="text-sm text-gray-500">{trend.posts}</p>
        </div>
      ))}
    </ScrollArea>
  );
}

function Sidebar2() {
  const [users, setUsers] = React.useState<
    {
      _id: string;
      email: string;
      name: string;
      username: string;
    }[]
  >([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await getUsers();
      setUsers(res.data);
    };
    fetchUsers();
  }, []);
  return (
    <div className="rounded-lg shadow p-4">
      <h2 className="font-bold text-xl mb-4">Trending Topics</h2>
      {users.map((user, index) => (
        <div key={index} className="mb-4 flex gap-4 items-center">
          <Avatar>
            <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.username}</p>
          </div>
          <Button variant="outline" asChild>
            <Link to={`/account/${user.username}`}>View Profile</Link>
          </Button>
        </div>
      ))}
    </div>
  );
}
