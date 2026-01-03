import PostCard from "./PostCard";

interface PostListProps {
  userId?: string;
}

const posts: any[] = []; // later Supabase se aayega

const PostList = ({ userId }: PostListProps) => {
  if (posts.length === 0) {
    return (
      <div className="border border-dashed border-cyan-700/40 rounded-xl p-8 text-center text-gray-400 font-mono">
        No posts found ✨
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
