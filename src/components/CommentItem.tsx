import { useState } from "react";
import type { Comment } from "./CommentSection";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabase-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  comment: Comment & { children?: Comment[] };
  postId: number;
  formatTime: (dateString: string) => string;
}

const createReply = async (
  replyContent: string,
  postId: number,
  parentCommentId: number,
  userId?: string,
  author?: string,
  avatarUrl?: string
) => {
  if (!userId || !author) throw new Error("You must be logged in to reply.");

  const { error } = await supabase.from("Comments").insert({
    post_id: postId,
    content: replyContent,
    parent_comment_id: parentCommentId,
    user_id: userId,
    author,
    avatar_url: avatarUrl || null,
  });

  if (error) throw new Error(error.message);
};

export const CommentItem = ({ comment, postId, formatTime }: Props) => {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (replyContent: string) => {
      const author = user?.user_metadata?.user_name || user?.user_metadata?.full_name || user?.email || 'Anonymous';
      const avatarUrl = user?.user_metadata?.avatar_url || null;
      return createReply(replyContent, postId, comment.id, user?.id, author, avatarUrl);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Comments", postId] });
      setReplyText("");
      setShowReply(false);
    },
  });

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    mutate(replyText);
  };

  const hasChildren = comment.children && comment.children.length > 0;

  return (
    <div className="border-l-2 border-gray-700 pl-4">
      <div className="py-3">
        <div className="flex gap-3">
          {hasChildren && (
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="mt-1 p-1 hover:bg-gray-700 rounded"
              title={isCollapsed ? "Expand" : "Collapse"}
            >
              {isCollapsed ? <ChevronDown className="w-4 h-4 text-gray-400"/> : <ChevronUp className="w-4 h-4 text-gray-400"/>}
            </button>
          )}
          {!hasChildren && <div className="w-4"></div>}

          <div className="flex-1">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span className="font-semibold text-gray-200">{comment.author}</span>
              <span>•</span>
              <span>{formatTime(comment.created_at)}</span>
            </div>
            <p className="mt-1 text-sm text-gray-200">{comment.content}</p>

            <div className="flex gap-4 mt-1 text-xs">
              {user && (
                <button
                  onClick={() => setShowReply(!showReply)}
                  className="text-gray-400 hover:text-cyan-400 font-medium transition"
                >
                  {showReply ? "Cancel" : "Reply"}
                </button>
              )}
            </div>

            {/* Reply Form */}
            {showReply && user && (
              <form onSubmit={handleReplySubmit} className="mt-2 bg-slate-800 p-2 rounded">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full bg-slate-900 border border-gray-700 rounded p-2 text-sm text-gray-200 resize-none focus:outline-none focus:border-cyan-500"
                  rows={2}
                  placeholder="Write a reply..."
                />
                <div className="flex justify-end gap-2 mt-1 flex-wrap">
                  <button type="button" onClick={() => setShowReply(false)} className="px-2 py-1 text-xs text-gray-400 hover:bg-gray-700 rounded">
                    Cancel
                  </button>
                  <button type="submit" disabled={isPending} className="px-2 py-1 text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 rounded">
                    {isPending ? "Posting..." : "Reply"}
                  </button>
                </div>
                {isError && <p className="text-red-400 text-xs mt-1">{error?.message}</p>}
              </form>
            )}

            {/* Replies */}
            {hasChildren && !isCollapsed && (
              <div className="mt-2 space-y-2">
                {comment.children!.map(child => (
                  <CommentItem key={child.id} comment={child} postId={postId} formatTime={formatTime}/>
                ))}
              </div>
            )}

            {/* Collapsed indicator */}
            {hasChildren && isCollapsed && (
              <div className="mt-2 text-xs text-gray-400 flex items-center gap-1">
                <ChevronDown className="w-3 h-3"/>
                {comment.children!.length} {comment.children!.length === 1 ? 'reply' : 'replies'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
