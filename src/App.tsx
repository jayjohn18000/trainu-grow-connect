import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import Landing from "@/pages/Landing";
import Discover from "@/pages/Discover";
import Directory from "@/pages/Directory";
import TrainerProfile from "@/pages/TrainerProfile";
import ClientDashboard from "@/pages/ClientDashboard";
import TrainerDashboard from "@/pages/TrainerDashboard";
import GymAdminDashboard from "@/pages/GymAdminDashboard";
import Calendar from "@/pages/Calendar";
import Progress from "@/pages/Progress";
import Programs from "@/pages/Programs";
import Clients from "@/pages/Clients";
import Messages from "@/pages/Messages";
import Community from "@/pages/Community";
import Growth from "@/pages/Growth";
import Settings from "@/pages/Settings";
import Admin from "@/pages/Admin";
import AdminClasses from "@/pages/AdminClasses";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<AppLayout><Outlet /></AppLayout>}>
          <Route path="/discover" element={<Discover />} />
          <Route path="/dashboard/client" element={<ClientDashboard />} />
          <Route path="/dashboard/trainer" element={<TrainerDashboard />} />
          <Route path="/dashboard/gym-admin" element={<GymAdminDashboard />} />
          <Route path="/directory" element={<Directory />} />
          <Route path="/trainers/:slug" element={<TrainerProfile />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/community" element={<Community />} />
          <Route path="/growth" element={<Growth />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/trainers" element={<Admin />} />
          <Route path="/admin/classes" element={<AdminClasses />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
