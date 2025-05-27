import { Outlet } from "react-router";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/appSidebar";
import Header from "@/components/header";
import Cookies from "js-cookie";

const MainLayout = () => {
    const defaultOpen = Cookies.get("sidebar_state") === "true";
    return (
        <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />
            <main className="w-full">
                <Header />
                <Outlet />
            </main>
        </SidebarProvider>
    );
};

export default MainLayout;
