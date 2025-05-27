import logo from "@/assets/images/logo.png";
import { Home, LaptopMinimalCheck, LogOut } from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router";
import { Button } from "./ui/button";
import useAuthStore from "@/store/authstore";

// Menu items.
const items = [
    {
        title: "Home",
        to: "/",
        icon: Home,
    },
    {
        title: "Todos",
        to: "/todos",
        icon: LaptopMinimalCheck,
    },
    {
        title: "Logout",
        icon: LogOut,
    },
];

export function AppSidebar() {
    const logout = useAuthStore((state) => state.logout);

    return (
        <Sidebar>
            <SidebarHeader className="mb-4 mt-2">
                <Link to="/" className="max-w-[140px]">
                    <img className="w-full" src={logo} alt="Qudoz" />
                </Link>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    {items.map((item) => {
                        if (!item.to) {
                            return (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-start !p-2"
                                            onClick={logout}
                                        >
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Button>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            );
                        }
                        return (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                    <Link to={item.to}>
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    );
}
