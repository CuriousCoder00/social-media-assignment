import { CreatePost } from "@/components/home/create-post";
import { Post } from "@/components/home/post";
import HomeLayout from "@/layouts/home-layout";

export default function Home() {
  return (
    <HomeLayout>
      <div className="flex flex-col">
        <CreatePost />
        <Post
          username="John Doe"
          time="2 hours ago"
          content="Just finished working on an amazing project! 🚀"
          imageUrl="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
        />
        <Post
          username="Jane Smith"
          time="4 hours ago"
          content="Beautiful sunset today! 🌅"
          imageUrl="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
        />
      </div>
    </HomeLayout>
  );
}
