import { 
  LayoutDashboard, 
  Users, 
  TrendingUp, 
  MessageSquare, 
  Search,
  Settings,
  Shield,
  Calendar,
  Activity,
  Folder,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "@/lib/store/useAuthStore";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const getNavItems = (role: string) => {
  const roleSpecificItems = {
    client: [
      { title: "Dashboard", url: "/dashboard/client", icon: LayoutDashboard },
      { title: "Discover", url: "/discover", icon: Search },
      { title: "Calendar", url: "/calendar", icon: Calendar },
      { title: "Messages", url: "/messages", icon: MessageSquare },
    ],
    trainer: [
      { title: "Dashboard", url: "/dashboard/trainer", icon: LayoutDashboard },
      { title: "Calendar", url: "/calendar", icon: Calendar },
      { title: "Messages", url: "/messages", icon: MessageSquare },
      { title: "Clients", url: "/clients", icon: Users },
    ],
    gym_admin: [
      { title: "Dashboard", url: "/dashboard/gym-admin", icon: LayoutDashboard },
      { title: "Trainers", url: "/admin/trainers", icon: Users },
      { title: "Classes", url: "/admin/classes", icon: Calendar },
      { title: "Messages", url: "/messages", icon: MessageSquare },
    ],
  };

  return roleSpecificItems[role as keyof typeof roleSpecificItems] || [];
};

const secondaryItems = [
  { title: "Admin", url: "/admin", icon: Shield, roles: ["gym_admin"] },
  { title: "Settings", url: "/settings", icon: Settings, roles: ["client", "trainer", "gym_admin"] },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const { user } = useAuthStore();
  const collapsed = state === "collapsed";
  
  const navItems = getNavItems(user?.role || "client");
  const visibleSecondaryItems = secondaryItems.filter((item) =>
    item.roles.includes(user?.role || "client")
  );

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-lg font-bold text-foreground">
            {!collapsed && "TrainU"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-3 ${
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                            : "hover:bg-sidebar-accent/50"
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {visibleSecondaryItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-3 ${
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                            : "hover:bg-sidebar-accent/50"
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
