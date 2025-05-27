import logo from "@/assets/images/logo.png";
import { Home, LaptopMinimalCheck } from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router";

// Menu items.
const items = [
    {
        title: "Home",
        url: "/",
        icon: Home,
    },
    {
        title: "Todos",
        url: "/todos",
        icon: LaptopMinimalCheck,
    },
];

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader className="mb-4 mt-2">
                <Link to="/" className="max-w-[140px]">
                    <img className="w-full" src={logo} alt="Qudoz" />
                </Link>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                                <Link to={item.url}>
                                    <item.icon />
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    );
}
