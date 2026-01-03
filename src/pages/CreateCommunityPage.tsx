const CreateCommunityPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-xl font-mono text-cyan-400 mb-6">
          ~/create-community
        </h1>

        <form className="space-y-5 bg-slate-900/50 p-6 rounded-xl border border-cyan-900/40">
          <input
            type="text"
            placeholder="Community name"
            className="w-full bg-slate-950 border border-cyan-900/40 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-400 text-white"
          />

          <textarea
            placeholder="Community description"
            rows={4}
            className="w-full bg-slate-950 border border-cyan-900/40 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-400 text-white"
          />

          <button
            type="submit"
            className="w-full bg-cyan-900/30 hover:bg-cyan-900/50 border border-cyan-400/50 rounded-lg py-2 font-mono transition"
          >
            Create Community
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCommunityPage;
