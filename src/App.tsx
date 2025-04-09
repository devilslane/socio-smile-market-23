
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Consultation from "./pages/Consultation";
import Marketplace from "./pages/Marketplace";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import DoctorPortal from "./pages/DoctorPortal";
import AdminPortal from "./pages/AdminPortal";

const queryClient = new QueryClient();

// Get the basename from the environment or use a default for GitHub Pages
const getBasename = () => {
  // When deployed to GitHub Pages, the site is served from the repository name path
  // In development, we don't need a basename
  return process.env.NODE_ENV === 'production' ? '/socio-smile-market' : '/';
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={getBasename()}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/consultation" element={<Consultation />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/marketplace/:productId" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/doctor-portal" element={<DoctorPortal />} />
          <Route path="/admin-portal" element={<AdminPortal />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
