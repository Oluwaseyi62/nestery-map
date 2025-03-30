import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBlog } from "@/contexts/BlogContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowLeft, Save } from "lucide-react";
import { BlogPost } from "@/types/blog";

interface BlogPostEditorProps {
  mode: "create" | "edit";
}

const BlogPostEditor: React.FC<BlogPostEditorProps> = ({ mode }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { addPost, updatePost, getPost } = useBlog();
  
  const defaultPost = {
    title: "",
    content: "",
    excerpt: "",
    author: "",
    coverImage: "/placeholder.svg",
    published: false
  };

  const [postData, setPostData] = useState(defaultPost);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (mode === "edit" && id) {
      const existingPost = getPost(id);
      if (existingPost) {
        setPostData({
          title: existingPost.title,
          content: existingPost.content,
          excerpt: existingPost.excerpt,
          author: existingPost.author,
          coverImage: existingPost.coverImage || "/placeholder.svg",
          published: existingPost.published
        });
      } else {
        navigate("/blog/admin");
      }
    }
  }, [mode, id, getPost, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPostData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setPostData(prev => ({ ...prev, published: checked }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!postData.title.trim()) {
      newErrors.title = "Title is required";
    }
    
    if (!postData.content.trim()) {
      newErrors.content = "Content is required";
    }
    
    if (!postData.excerpt.trim()) {
      newErrors.excerpt = "Excerpt is required";
    }
    
    if (!postData.author.trim()) {
      newErrors.author = "Author is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (mode === "create") {
      addPost(postData);
      navigate("/blog/admin");
    } else if (id) {
      const existingPost = getPost(id);
      if (existingPost) {
        updatePost({
          ...postData,
          id,
          date: existingPost.date
        });
        navigate(`/blog/${id}`);
      }
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      
      <h1 className="text-3xl font-bold mb-8 text-realestate-darkblue">
        {mode === "create" ? "Create New Blog Post" : "Edit Blog Post"}
      </h1>
      
      <form onSubmit={handleSubmit}>
        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={postData.title}
                onChange={handleChange}
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                name="author"
                value={postData.author}
                onChange={handleChange}
                className={errors.author ? "border-red-500" : ""}
              />
              {errors.author && <p className="text-sm text-red-500">{errors.author}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                name="excerpt"
                value={postData.excerpt}
                onChange={handleChange}
                rows={2}
                className={errors.excerpt ? "border-red-500" : ""}
              />
              {errors.excerpt && <p className="text-sm text-red-500">{errors.excerpt}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                name="content"
                value={postData.content}
                onChange={handleChange}
                rows={10}
                className={errors.content ? "border-red-500" : ""}
              />
              {errors.content && <p className="text-sm text-red-500">{errors.content}</p>}
              <p className="text-xs text-muted-foreground">
                Use double line breaks to create paragraphs.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="coverImage">Cover Image URL</Label>
              <Input
                id="coverImage"
                name="coverImage"
                value={postData.coverImage}
                onChange={handleChange}
              />
              {postData.coverImage && (
                <div className="mt-2 border rounded-md p-2 w-24 h-24">
                  <img 
                    src={postData.coverImage} 
                    alt="Cover preview" 
                    className="w-full h-full object-cover rounded"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.svg";
                    }}
                  />
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="published" 
                checked={postData.published}
                onCheckedChange={handleCheckboxChange}
              />
              <Label htmlFor="published" className="cursor-pointer">Publish this post</Label>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-end px-6 pb-6 pt-0">
            <Button type="submit" className="flex items-center gap-2">
              <Save size={16} />
              {mode === "create" ? "Create Post" : "Update Post"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default BlogPostEditor;
