import { useNavigate, useLocation } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { cn } from "@/lib/utils";

type MainTab = "dashboard" | "schedule" | "communication";

interface SubTab {
  label: string;
  path: string;
  roles?: string[];
}

const mainTabs: { value: MainTab; label: string }[] = [
  { value: "dashboard", label: "Dashboard" },
  { value: "schedule", label: "Schedule" },
  { value: "communication", label: "Communication" },
];

const subTabs: Record<MainTab, SubTab[]> = {
  dashboard: [
    { label: "Overview", path: "/dashboard/client", roles: ["client"] },
    { label: "Discover", path: "/discover", roles: ["client"] },
    { label: "Overview", path: "/dashboard/trainer", roles: ["trainer"] },
    { label: "Overview", path: "/dashboard/gym-admin", roles: ["gym_admin"] },
  ],
  schedule: [
    { label: "Calendar", path: "/calendar" },
    { label: "Events", path: "/community/events", roles: ["client"] },
    { label: "Clients", path: "/clients", roles: ["trainer", "gym_admin"] },
    { label: "Workouts", path: "/workout", roles: ["client"] },
    { label: "Programs", path: "/programs", roles: ["trainer", "gym_admin"] },
    { label: "Progress", path: "/progress", roles: ["client"] },
  ],
  communication: [
    { label: "Messages", path: "/messages" },
    { label: "People", path: "/community/people" },
    { label: "Groups", path: "/community/groups" },
  ],
};

export function TabNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore();

  // Determine active main tab based on current path
  const getActiveMainTab = (): MainTab => {
    const path = location.pathname;
    if (path.startsWith("/dashboard") || path.startsWith("/discover")) return "dashboard";
    if (
      path.startsWith("/calendar") ||
      path.startsWith("/workout") ||
      path.startsWith("/progress") ||
      path.startsWith("/clients") ||
      path.startsWith("/programs") ||
      path.startsWith("/community/events") ||
      path.startsWith("/events")
    )
      return "schedule";
    if (
      path.startsWith("/messages") ||
      path.startsWith("/community/people") ||
      path.startsWith("/community/groups")
    )
      return "communication";
    return "dashboard";
  };

  const activeMainTab = getActiveMainTab();

  // Get visible subtabs for current main tab and user role
  const getVisibleSubTabs = (tab: MainTab): SubTab[] => {
    return subTabs[tab].filter(
      (subTab) => !subTab.roles || subTab.roles.includes(user?.role || "client")
    );
  };

  const visibleSubTabs = getVisibleSubTabs(activeMainTab);
  const isActiveSubTab = (path: string) => location.pathname === path;

  const handleMainTabChange = (value: string) => {
    const mainTab = value as MainTab;
    const firstSubTab = getVisibleSubTabs(mainTab)[0];
    if (firstSubTab) {
      navigate(firstSubTab.path);
    }
  };

  return (
    <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-6">
        {/* Main Tabs */}
        <Tabs value={activeMainTab} onValueChange={handleMainTabChange}>
          <TabsList className="h-12 bg-transparent border-0 rounded-none p-0 gap-6">
            {mainTabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 pt-3 font-semibold"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Sub Tabs */}
        <div className="flex gap-6 mt-2 pb-2">
          {visibleSubTabs.map((subTab) => (
            <button
              key={subTab.path}
              onClick={() => navigate(subTab.path)}
              className={cn(
                "text-sm font-medium transition-colors pb-2 border-b-2 border-transparent",
                isActiveSubTab(subTab.path)
                  ? "text-primary border-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {subTab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
