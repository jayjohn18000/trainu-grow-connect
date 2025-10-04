import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { RoleSwitcher } from "./RoleSwitcher";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 overflow-auto">
          <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
            <SidebarTrigger />
            <RoleSwitcher />
          </header>
          <div className="p-6">{children}</div>
          <Button
            variant="outline"
            size="icon"
            className="fixed bottom-6 left-6 z-50 shadow-lg"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </main>
      </div>
    </SidebarProvider>
  );
}
