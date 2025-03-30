
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useBlog } from "@/contexts/BlogContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const { getPost } = useBlog();
  const navigate = useNavigate();
  
  const post = getPost(id || "");

  if (!post) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <p className="mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
        <Link to="/blog">
          <Button>Return to Blog</Button>
        </Link>
      </div>
    );
  }

  const publishDate = new Date(post.date);
  const timeAgo = formatDistanceToNow(publishDate, { addSuffix: true });

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-6">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-realestate-darkblue">{post.title}</h1>
        <div className="flex items-center justify-between text-gray-500 text-sm mb-6">
          <div>
            By {post.author} • Published {timeAgo}
          </div>
          <Link to={`/blog/edit/${post.id}`}>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Edit size={14} />
              Edit
            </Button>
          </Link>
        </div>
      </div>

      {post.coverImage && (
        <div className="my-8">
          <img 
            src={post.coverImage} 
            alt={post.title}
            className="w-full max-h-[400px] object-cover rounded-lg shadow-md"
          />
        </div>
      )}

      <div className="prose max-w-none">
        {post.content.split("\n\n").map((paragraph, index) => (
          <p key={index} className="mb-4 text-gray-700 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};

export default BlogPost;
