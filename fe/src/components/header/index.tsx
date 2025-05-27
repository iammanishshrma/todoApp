import { CircleUserRound } from "lucide-react";
import { SidebarTrigger } from "../ui/sidebar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ConfirmBox from "../confirmBox";
import useAuthStore from "@/store/authstore";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "@/utils/api/auth/logout";
import { toast } from "sonner";
import Loader from "../ui/loader";
import { useSidebar } from "@/components/ui/sidebar";
import { Link } from "react-router";
import logo from "@/assets/images/logo-dark-3.png";

const Header = () => {
    const { open } = useSidebar();
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const logout = useAuthStore((state) => state.logout);
    const { mutate: mutateLogout, isPending } = useMutation({
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
            {isPending && <Loader />}
            <header className="w-full p-2 py-4 bg-primary flex justify-between items-center">
                <div className="flex items-center gap-5">
                    <SidebarTrigger />
                    {!open && (
                        <Link
                            to="/"
                            className="text-white font-bold text-lg w-[90px]"
                        >
                            <img src={logo} alt="Qudoz" />
                        </Link>
                    )}
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <CircleUserRound />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="p-0">
                            <Link className="w-full p-2 py-1.5" to={"/profile"}>
                                Profile
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="p-0">
                            <button
                                type="button"
                                className="w-full cursor-pointer p-2 py-1.5 text-left"
                                onClick={() => setIsConfirmOpen(true)}
                            >
                                Logout
                            </button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </header>
            <ConfirmBox
                title="Confirm Logout"
                description="Are you sure you want to logout?"
                buttonTitle="Logout"
                isOpen={isConfirmOpen}
                setIsOpen={setIsConfirmOpen}
                onConfirm={() => mutateLogout()}
            />
        </>
    );
};

export default Header;
