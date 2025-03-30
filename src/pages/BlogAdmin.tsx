
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useBlog } from "@/contexts/BlogContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Plus, Edit, Trash2, Check, X } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const BlogAdmin = () => {
  const { posts, deletePost } = useBlog();
  const [search, setSearch] = useState("");

  const filteredPosts = search 
    ? posts.filter(post => 
        post.title.toLowerCase().includes(search.toLowerCase()) || 
        post.author.toLowerCase().includes(search.toLowerCase())
      )
    : posts;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-realestate-darkblue">Blog Management</h1>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <Input 
            placeholder="Search posts..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-72"
          />
          <Link to="/blog/create">
            <Button className="flex items-center gap-2 whitespace-nowrap">
              <Plus size={16} />
              New Post
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPosts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      {search ? "No posts match your search" : "No posts found"}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPosts.map(post => (
                    <TableRow key={post.id}>
                      <TableCell className="font-medium max-w-[240px] truncate">
                        <Link to={`/blog/${post.id}`} className="hover:underline">
                          {post.title}
                        </Link>
                      </TableCell>
                      <TableCell>{post.author}</TableCell>
                      <TableCell>
                        {formatDistanceToNow(new Date(post.date), { addSuffix: true })}
                      </TableCell>
                      <TableCell>
                        {post.published ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <Check size={12} className="mr-1" />
                            Published
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                            <X size={12} className="mr-1" />
                            Draft
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Link to={`/blog/edit/${post.id}`}>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Edit size={16} />
                            <span className="sr-only">Edit</span>
                          </Button>
                        </Link>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => deletePost(post.id)}
                        >
                          <Trash2 size={16} />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogAdmin;
