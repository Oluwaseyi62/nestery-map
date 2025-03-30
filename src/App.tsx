
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Properties from "./pages/Properties";
import MapView from "./pages/MapView";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BlogAdmin from "./pages/BlogAdmin";
import BlogCreate from "./pages/BlogCreate";
import BlogEdit from "./pages/BlogEdit";
import { BlogProvider } from "./contexts/BlogContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BlogProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/map" element={<MapView />} />
            <Route path="/property/:id" element={<PropertyDetailPage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/admin" element={<BlogAdmin />} />
            <Route path="/blog/create" element={<BlogCreate />} />
            <Route path="/blog/edit/:id" element={<BlogEdit />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </BlogProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
