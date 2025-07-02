import RecruiterSidebar from "@/components/recruiter/RecruiterSidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetUserQuery } from "@/redux/services/authApi";

const RecruiterLayout = () => {
  const { data: recruiter } = useGetUserQuery();

  return (
    <SidebarProvider>
      <RecruiterSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-lg font-semibold">Recruiter Dashboard</h1>
            <div className="flex gap-3 items-center">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>
                  {recruiter?.fullname.slice(0, 1)}
                </AvatarFallback>
              </Avatar>
              <h1>{recruiter?.fullname}</h1>
            </div>
          </div>
        </header>
        <main className="flex flex-col">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default RecruiterLayout;
