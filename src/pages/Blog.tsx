
import React from "react";
import { Link } from "react-router-dom";
import { useBlog } from "@/contexts/BlogContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit } from "lucide-react";

const Blog = () => {
  const { posts } = useBlog();
  const publishedPosts = posts.filter(post => post.published);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-realestate-darkblue">Real Estate Blog</h1>
        <div className="flex space-x-3">
          <Link to="/blog/create">
            <Button className="flex items-center gap-2">
              <Plus size={16} />
              Create New Post
            </Button>
          </Link>
          <Link to="/blog/admin">
            <Button variant="outline" className="flex items-center gap-2">
              <Edit size={16} />
              Manage Posts
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {publishedPosts.length === 0 ? (
          <div className="col-span-full text-center py-10">
            <h2 className="text-xl font-medium text-gray-600 mb-2">No published posts yet</h2>
            <p className="text-gray-500 mb-6">Create your first blog post to get started</p>
            <Link to="/blog/create">
              <Button className="flex items-center gap-2">
                <Plus size={16} />
                Create New Post
              </Button>
            </Link>
          </div>
        ) : (
          publishedPosts.map(post => (
            <Card key={post.id} className="property-card-shadow h-full flex flex-col">
              <CardHeader className="p-0">
                <div className="h-48 overflow-hidden rounded-t-lg">
                  <img 
                    src={post.coverImage || "/placeholder.svg"} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardHeader>
              <CardContent className="flex-grow p-5">
                <CardTitle className="mb-2 text-xl text-realestate-darkblue">{post.title}</CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  {post.date} • By {post.author}
                </CardDescription>
                <p className="mt-3 text-gray-600 line-clamp-3">{post.excerpt}</p>
              </CardContent>
              <CardFooter className="px-5 pb-5 pt-0">
                <Link to={`/blog/${post.id}`} className="w-full">
                  <Button variant="default" className="w-full bg-realestate-blue hover:bg-realestate-darkblue">
                    Read More
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Blog;
