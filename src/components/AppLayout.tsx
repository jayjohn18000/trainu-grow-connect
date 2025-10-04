import { RoleSwitcher } from "./RoleSwitcher";
import { TabNavigation } from "./TabNavigation";
import { Button } from "./ui/button";
import { ArrowLeft, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col w-full">
      <header className="sticky top-0 z-20 flex h-14 items-center justify-between gap-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-primary">TrainU</h2>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/settings")}
          >
            <Settings className="h-5 w-5" />
          </Button>
          <RoleSwitcher />
        </div>
      </header>

      <TabNavigation />

      <main className="flex-1 overflow-auto">
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
  );
}
