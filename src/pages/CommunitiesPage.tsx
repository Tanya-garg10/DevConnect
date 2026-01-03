import CommunityList from "../components/CommunityList";

const CommunitiesPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-mono text-cyan-400 mb-6">
          ~/communities
        </h1>

        <CommunityList />
      </div>
    </div>
  );
};

export default function CommunitiesPage() {
  return <div>Communities Page</div>;
}
