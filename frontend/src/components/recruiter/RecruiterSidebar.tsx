"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { useLogoutMutation } from "@/redux/services/authApi";
import { setLogout } from "@/redux/slice/auth";
import { type AppDispatch } from "@/redux/store/store";
import {
  AreaChartIcon as ChartArea,
  Factory,
  File,
  LayoutDashboard,
  Loader,
  LogOut,
  Users,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const RecruiterSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [logout, { isLoading: isLogoutLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    await logout();
    dispatch(setLogout());
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-sidebar-accent/50 transition-colors"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-sm">
                <Users className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold text-sidebar-foreground">
                  TalentHub
                </span>
                <span className="text-xs text-sidebar-foreground/70">
                  Recruiter Portal
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider mb-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={true}
                  className="w-full justify-start gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-blue-600 data-[active=true]:text-white data-[active=true]:shadow-sm"
                >
                  <Link to="/recruiter">
                    <LayoutDashboard className="size-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={false}
                  className="w-full justify-start gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <Link to="/recruiter/company">
                    <Factory className="size-4" />
                    <span>Company</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={false}
                  className="w-full justify-start gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <Link to="/candidates">
                    <Users className="size-4" />
                    <span>Candidates</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={false}
                  className="w-full justify-start gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <Link to="/applications">
                    <File className="size-4" />
                    <span>Applications</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={false}
                  className="w-full justify-start gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <Link to="/analytics">
                    <ChartArea className="size-4" />
                    <span>Analytics</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border/50">
        <button
          onClick={handleLogout}
          disabled={isLogoutLoading}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 group"
        >
          {isLogoutLoading ? (
            <Loader className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <LogOut className="size-4 group-hover:scale-110 transition-transform" />
              <span>Logout</span>
            </>
          )}
        </button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default RecruiterSidebar;
