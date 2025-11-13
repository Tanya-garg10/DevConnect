import React from 'react'
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabase-client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export interface Comment {
  id: number;
  post_id: number;
  content: string;
  author: string;
  created_at: string;
  parent_comment_id: number | null;
  user_id: string;
  children?: Comment[];
}

interface CommentSectionProps {
  postId: number;
}

const fetchComments = async (postId: number): Promise<Comment[]> => {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('post_id', postId)
    .order('created_at', { ascending: true });

  if (error) throw new Error(error.message);
  return data || [];
};

const createComment = async (
  content: string,
  postId: number,
  userId?: string,
  author?: string
) => {
  if (!userId || !author) {
    throw new Error('You must be logged in to comment.');
  }

  const { error } = await supabase.from('comments').insert({
    post_id: postId,
    content: content,
    user_id: userId,
    author: author,
  });

  if (error) throw new Error(error.message);
};

const CommentSection = ({ postId }: CommentSectionProps) => {
  const [newComment, setNewComment] = React.useState('');
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: comments = [] } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => fetchComments(postId),
    enabled: !!postId,
  });

  const { mutate, isPending, isError } = useMutation({
    mutationFn: (content: string) =>
      createComment(content, postId, user?.id, user?.user_metadata?.user_name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      setNewComment('');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    mutate(newComment);
  };

  // Build comment tree structure
  const buildCommentTree = (comments: Comment[]): Comment[] => {
    const map = new Map<number, Comment>();
    const roots: Comment[] = [];

    comments.forEach(comment => {
      map.set(comment.id, { ...comment, children: [] });
    });

    comments.forEach(comment => {
      const node = map.get(comment.id)!;
      if (comment.parent_comment_id === null) {
        roots.push(node);
      } else {
        const parent = map.get(comment.parent_comment_id);
        if (parent) {
          if (!parent.children) parent.children = [];
          parent.children.push(node);
        }
      }
    });

    return roots;
  };

  const commentTree = buildCommentTree(comments);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Comments</h3>
      {user ? (
        <form className="mb-4" onSubmit={handleSubmit}>
          <textarea
            className="w-full border border-gray-300 rounded-md p-2 mb-2"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            className="text-sm font-semibold text-blue-500 hover:text-blue-700 disabled:opacity-50"
            type="submit"
            disabled={isPending || !newComment.trim()}
          >
            {isPending ? 'Posting...' : 'Post'}
          </button>
          {isError && <p className="text-red-500 text-sm mt-2">Error posting comment.</p>}
        </form>
      ) : (
        <p className="text-gray-500">Log in to view and add comments.</p>
      )}
      
      <div className="space-y-4 mt-6">
        {commentTree.map((comment) => (
          <div key={comment.id}>
            {/* Import CommentItem from ./CommentItem */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;