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
import { Button } from "../ui/button";
import useAuthStore from "@/store/authstore";
import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "@/utils/api/auth/logout";
import { toast } from "sonner";
import ConfirmBox from "../confirmBox";
import { useState } from "react";

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
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const logout = useAuthStore((state) => state.logout);
    const { mutate: mutateLogout } = useMutation({
        mutationFn: async () => logoutUser(),
        onSuccess: (message) => {
            toast.success(message);
            logout();
        },
        onError: () => {
            logout();
        },
    });

    return (
        <>
            <ConfirmBox
                title="Confirm Logout"
                description="Are you sure you want to logout?"
                buttonTitle="Logout"
                isOpen={isConfirmOpen}
                setIsOpen={setIsConfirmOpen}
                onConfirm={() => mutateLogout()}
            />
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
                                                onClick={() =>
                                                    setIsConfirmOpen(true)
                                                }
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
        </>
    );
}
