import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../supabase-client';
import { MessageCircle, Send, Bookmark, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LikeButton from './LikeButton';
import CommentSection from './CommentSection';

interface Post {
    id: number;
    title: string;
    content: string;
    image_url: string;
    avatar_url: string | null;
    created_at: string;
}

interface PostDetailProps {
    postId: number;
}

const fetchPost = async (postId: number): Promise<Post> => {
    const { data, error } = await supabase.from('Posts').select('*').eq('id', postId).single();
    if (error) throw new Error(error.message);
    return data as Post;
};

const PostDetail = ({ postId }: PostDetailProps) => {
    const navigate = useNavigate();
    const [likeCount, setLikeCount] = useState(0);

    const { data: post, error, isLoading } = useQuery<Post, Error>({
        queryKey: ["post", postId],
        queryFn: () => fetchPost(postId)
    });

    if (isLoading) return <div className="flex justify-center items-center min-h-screen text-gray-400">Loading post...</div>;
    if (error) return <div className="flex justify-center items-center min-h-screen text-red-500">Error: {error.message}</div>;
    if (!post) return <div className="flex justify-center items-center min-h-screen text-gray-400">Post not found</div>;

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInMs = now.getTime() - date.getTime();
        const diffInHours = Math.floor(diffInMs / (1000*60*60));
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInHours < 24) return `${diffInHours} hours ago`;
        if (diffInDays < 7) return `${diffInDays} days ago`;
        return date.toLocaleDateString();
    };

    return (
        <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-gray-200 mb-4">
                <ArrowLeft className="w-5 h-5" /> Back
            </button>

            <div className="bg-slate-800 text-gray-100 border border-slate-700 rounded-lg shadow-sm overflow-hidden">
                {/* Header */}
                <div className="flex items-center p-4 border-b border-slate-700">
                    {post.avatar_url ? (
                        <img src={post.avatar_url} className="w-10 h-10 rounded-full mr-3 object-cover"/>
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 via-pink-500 to-orange-400 mr-3"/>
                    )}
                    <div>
                        <h1 className="text-lg font-semibold">{post.title}</h1>
                        <p className="text-xs text-gray-400">{formatDate(post.created_at)}</p>
                    </div>
                </div>

                {/* Image */}
                {post.image_url && <img src={post.image_url} className="w-full max-h-[600px] object-contain" />}

                {/* Actions */}
                <div className="flex items-center justify-between p-4 border-t border-b border-slate-700">
                    <div className="flex gap-4">
                        <LikeButton postId={postId} onLikeCountChange={setLikeCount}/>
                        <MessageCircle className="w-7 h-7 cursor-pointer hover:text-cyan-400 transition"/>
                        <Send className="w-7 h-7 cursor-pointer hover:text-cyan-400 transition"/>
                    </div>
                    <Bookmark className="w-7 h-7 cursor-pointer hover:text-cyan-400 transition"/>
                </div>

                <div className="px-4 pb-3 text-sm font-semibold">{likeCount} {likeCount === 1 ? 'like' : 'likes'}</div>

                <div className="px-4 pb-4 text-gray-100 whitespace-pre-wrap">{post.content}</div>

                <CommentSection postId={postId}/>
            </div>
        </div>
    )
};

export default PostDetail;
