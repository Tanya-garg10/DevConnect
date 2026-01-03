// src/components/PostList.tsx
import PostCard from "./PostCard";

export default function PostList() {
  const posts = []; // mock posts
  return (
    <div className="grid gap-4 w-full">
      {posts.map((post, idx) => (
        <PostCard key={idx} />
      ))}
    </div>
  );
}

// src/components/PostCard.tsx
export default function PostCard() {
  return (
    <div className="p-4 border border-gray-700 rounded-lg text-gray-300">
      PostCard placeholder
    </div>
  );
}

