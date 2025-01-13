import React from "react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Main Content */}
      <div className="md:col-span-3">{children}</div>
      {/* Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>
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
    <div className="rounded-lg shadow p-4">
      <h2 className="font-bold text-xl mb-4">Trending Topics</h2>
      {trends.map((trend, index) => (
        <div key={index} className="mb-4">
          <h3 className="font-semibold">{trend.topic}</h3>
          <p className="text-sm text-gray-500">{trend.posts}</p>
        </div>
      ))}
    </div>
  );
}
