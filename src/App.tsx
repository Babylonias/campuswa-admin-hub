import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Universities from "./pages/admin/Universities";
import Amphitheaters from "./pages/admin/Amphitheaters";
import NewUniversity from "./pages/admin/universities/NewUniversity";
import EditUniversity from "./pages/admin/universities/EditUniversity";
import NewAmphitheater from "./pages/admin/amphitheaters/NewAmphitheater";
import EditAmphitheater from "./pages/admin/amphitheaters/EditAmphitheater";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="universities" element={<Universities />} />
            <Route path="universities/new" element={<NewUniversity />} />
            <Route path="universities/:id/edit" element={<EditUniversity />} />
            <Route path="amphitheaters" element={<Amphitheaters />} />
            <Route path="amphitheaters/new" element={<NewAmphitheater />} />
            <Route path="amphitheaters/:id/edit" element={<EditAmphitheater />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
