export function Post({
  username,
  time,
  content,
  imageUrl,
}: {
  username: string;
  time: string;
  content: string;
  imageUrl?: string;
}) {
  return (
    <div className="rounded-lg border border-foreground/30 shadow mb-4">
      <div className="p-4">
        <div className="flex items-center space-x-2">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt={username}
            className="h-10 w-10 rounded-full"
          />
          <div>
            <h3 className="font-semibold">{username}</h3>
            <p className="text-sm text-gray-500">{time}</p>
          </div>
        </div>
        <p className="mt-3">{content}</p>
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Post content"
            className="mt-3 rounded-lg w-full"
          />
        )}
        <div className="mt-4 flex items-center space-x-4">
          <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500">
            <span>❤️</span>
            <span>Like</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500">
            <span>💬</span>
            <span>Comment</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500">
            <span>↗️</span>
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}
