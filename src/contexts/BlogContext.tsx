
import React, { createContext, useContext, useState } from "react";
import { BlogPost } from "@/types/blog";
import { blogPosts as initialBlogPosts } from "@/data/blog-posts";
import { useToast } from "@/hooks/use-toast";

interface BlogContextType {
  posts: BlogPost[];
  addPost: (post: Omit<BlogPost, "id" | "date">) => void;
  updatePost: (post: BlogPost) => void;
  deletePost: (id: string) => void;
  getPost: (id: string) => BlogPost | undefined;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<BlogPost[]>(initialBlogPosts);
  const { toast } = useToast();

  const addPost = (post: Omit<BlogPost, "id" | "date">) => {
    const newPost: BlogPost = {
      ...post,
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
    };
    setPosts([newPost, ...posts]);
    toast({
      title: "Success",
      description: "Blog post created successfully",
    });
  };

  const updatePost = (updatedPost: BlogPost) => {
    setPosts(posts.map(post => post.id === updatedPost.id ? updatedPost : post));
    toast({
      title: "Success",
      description: "Blog post updated successfully",
    });
  };

  const deletePost = (id: string) => {
    setPosts(posts.filter(post => post.id !== id));
    toast({
      title: "Success",
      description: "Blog post deleted successfully",
    });
  };

  const getPost = (id: string) => {
    return posts.find(post => post.id === id);
  };

  return (
    <BlogContext.Provider value={{ posts, addPost, updatePost, deletePost, getPost }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error("useBlog must be used within a BlogProvider");
  }
  return context;
};
