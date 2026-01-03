const CommunityPage = () => {
  const posts: any[] = [];

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-xl font-mono text-cyan-400 mb-4">
          # community-name
        </h1>

        {posts.length === 0 ? (
          <div className="border border-dashed border-cyan-700/40 rounded-xl p-8 text-center text-gray-400 font-mono">
            No posts yet. Be the first to post 👇
          </div>
        ) : (
          <div className="space-y-4">{/* posts */}</div>
        )}
      </div>
    </div>
  );
};

export default function CommunityPage() {
  return <div>Community Page</div>;
}
