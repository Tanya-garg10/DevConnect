import { Link } from "react-router-dom";

const communities: any[] = []; // replace with real data later

const CommunityList = () => {
  if (communities.length === 0) {
    return (
      <div className="border border-dashed border-cyan-700/40 rounded-xl p-10 text-center">
        <p className="text-gray-400 font-mono mb-4">
          No communities yet 🚀
        </p>
        <Link
          to="/communities/create"
          className="inline-block px-4 py-2 font-mono text-sm bg-cyan-900/30 border border-cyan-400/50 rounded-lg hover:bg-cyan-900/50 transition"
        >
          + Create Community
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {communities.map((community) => (
        <Link
          key={community.id}
          to={`/communities/${community.id}`}
          className="bg-slate-900/50 border border-cyan-900/40 rounded-xl p-5 hover:border-cyan-400/50 hover:scale-[1.02] transition"
        >
          <h3 className="font-mono text-lg text-cyan-300">
            {community.name}
          </h3>
          <p className="text-sm text-gray-400 mt-2">
            {community.description}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default CommunityList;
