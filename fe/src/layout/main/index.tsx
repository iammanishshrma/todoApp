import { Outlet } from "react-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/appSidebar";

const MainLayout = () => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main>
                <SidebarTrigger />
                <Outlet />
            </main>
        </SidebarProvider>
    );
};

export default MainLayout;
