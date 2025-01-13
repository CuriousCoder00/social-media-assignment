import { PlusSquare } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export function CreatePost() {
  return (
    <div className="rounded-xl shadow p-4 mb-4 bg-foreground/5 w-full">
      <div className="flex items-center space-x-4">
        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt="Profile"
          className="h-10 w-10 rounded-full"
        />
        <Input type="text" placeholder="What's on your mind?" className="rounded-full" />
        <Button size="icon" className="p-2 text-blue-500 rounded-full">
          <PlusSquare className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
