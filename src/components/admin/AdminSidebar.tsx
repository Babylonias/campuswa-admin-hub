import { useState } from "react";
import { Building2, GraduationCap, Home, Settings, Users, ChevronLeft, Menu } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

const sidebarItems: SidebarItem[] = [
  { title: "Tableau de Bord", url: "/admin", icon: Home },
  { title: "Universités", url: "/admin/universities", icon: Building2 },
  { title: "Amphithéâtres", url: "/admin/amphitheaters", icon: GraduationCap },
  { title: "Utilisateurs", url: "/admin/users", icon: Users },
  { title: "Paramètres", url: "/admin/settings", icon: Settings },
];

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const AdminSidebar = ({ collapsed, onToggle }: AdminSidebarProps) => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div 
      className={cn(
        "bg-sidebar-background border-r border-sidebar-border transition-all duration-300 flex flex-col h-full",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-sidebar-foreground">
              campusWa
            </span>
          </div>
        )}
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {collapsed ? <Menu className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {sidebarItems.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            className={({ isActive: routeIsActive }) =>
              cn(
                "flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sidebar-foreground hover:bg-sidebar-accent group",
                (routeIsActive || isActive(item.url)) && "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm",
                collapsed && "justify-center"
              )
            }
          >
            <item.icon className={cn("h-5 w-5 flex-shrink-0", collapsed && "h-6 w-6")} />
            {!collapsed && (
              <span className="font-medium text-sm truncate">{item.title}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center space-x-3 px-3 py-2">
            <div className="w-8 h-8 bg-gradient-accent rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold text-white">A</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                Administrateur
              </p>
              <p className="text-xs text-sidebar-foreground/60">
                admin@campuswa.com
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSidebar;