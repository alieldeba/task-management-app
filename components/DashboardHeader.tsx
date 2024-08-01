"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import React from "react";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { setUser } from "@/app/GlobalRedux/Features/user/userSlice";
import axios from "axios";
import { User, UserData } from "@/types";

function DashboardHeader({
    search,
    setSearch,
}: {
    search: string;
    setSearch: (value: string) => void;
}) {
    const router = useRouter();
    const cookie = new Cookies();
    const dispatch = useDispatch();

    const user: User = useSelector((state: any) => state.user.user);

    const [userData, setUserData] = React.useState<UserData>({
        username: user.username,
        email: user.email,
        linkedinURL: user.linkedinURL,
    });

    function logout() {
        cookie.remove("token");
        toast.success("You have been logged out successfully");
        router.replace("/");
    }

    const { mutate: updateUser } = useMutation({
        mutationFn: async () => {
            try {
                const response = await axios.put(
                    `http://localhost:8000/users/${user._id}`,
                    userData,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${cookie.get("token")}`,
                        },
                    }
                );

                // Saving user to global state
                dispatch(setUser(response.data));

                toast.success("Profile updated successfully.");
            } catch (err) {
                toast.error(
                    "Something went wrong while updating your profile."
                );
                console.error(err);
            }
        },
    });

    return (
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <div className="relative ml-auto flex-1 md:grow-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search specific task..."
                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                    value={search}
                    onChange={(e: any) =>
                        setSearch(e.target.value.toLocaleLowerCase())
                    }
                />
            </div>
            <AlertDialog>
                <Dialog>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="overflow-hidden rounded-full"
                            >
                                <Avatar>
                                    <AvatarImage src="https://github.com/alieldeba.png" />
                                    <AvatarFallback>
                                        {user.username[0].toUpperCase()}
                                        {user.username[1].toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>
                                {user.username}
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DialogTrigger>
                                <DropdownMenuItem>
                                    Profile Settings
                                </DropdownMenuItem>
                            </DialogTrigger>
                            <DropdownMenuSeparator />
                            <AlertDialogTrigger className="w-full">
                                <DropdownMenuItem>Logout</DropdownMenuItem>
                            </AlertDialogTrigger>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit profile</DialogTitle>
                            <DialogDescription>
                                Enter your Linkedin URL to fetch your data right
                                away to the website.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="flex flex-col items-start gap-2">
                                <Label
                                    htmlFor="username"
                                    className="text-right"
                                >
                                    Username
                                </Label>
                                <Input
                                    id="username"
                                    placeholder="John"
                                    className="col-span-3"
                                    value={userData.username}
                                    onChange={(e) =>
                                        setUserData({
                                            ...userData,
                                            username: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="flex flex-col items-start gap-2">
                                <Label htmlFor="email" className="text-right">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    placeholder="user@example.com"
                                    className="col-span-3"
                                    value={userData.email}
                                    onChange={(e) =>
                                        setUserData({
                                            ...userData,
                                            email: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="flex flex-col items-start gap-2">
                                <Label
                                    htmlFor="linkedin-url"
                                    className="text-right"
                                >
                                    Linkedin URL
                                </Label>
                                <Input
                                    id="linkedin-url"
                                    placeholder="https://linkedin.com/in/username"
                                    className="col-span-3"
                                    value={userData.linkedinURL}
                                    onChange={(e) =>
                                        setUserData({
                                            ...userData,
                                            linkedinURL: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={() => updateUser()}>
                                Save changes
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action will make you log out from your account
                            and you will have to login again to access you
                            dashboard.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <Button variant="destructive" onClick={() => logout()}>
                            Logout
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </header>
    );
}

export default DashboardHeader;
