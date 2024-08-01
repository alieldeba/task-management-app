"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PinLeftIcon } from "@radix-ui/react-icons";
import axios from "../../../utils/axios";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import { ButtonLoading } from "@/components/ButtonLoading";
import { setUser } from "@/app/GlobalRedux/Features/user/userSlice";
import { useDispatch } from "react-redux";

export default function Login() {
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const cookies = new Cookies();
    const router = useRouter();

    const dispatch = useDispatch();

    const { mutate: login, isPending } = useMutation({
        mutationFn: async (e: Event) => {
            e.preventDefault();
            return await axios
                .post("/auth/login", {
                    email,
                    password,
                })
                .then((res) => {
                    toast.success(
                        "You logged in successfully, Now you can access your dashboard."
                    );

                    // Save token in user's cookies
                    cookies.set("token", res.data.access_token, {
                        expires: new Date(Date.now() + 86400000), // Expires after 1 day
                        path: "/",
                    });

                    // Saving user to global state
                    dispatch(setUser(res.data.user));
                    // dispatch(setUserUsername(res.data.username));
                    // dispatch(setUserEmail(res.data.email));
                    // dispatch(setUserLinkedinURL(res.data.linkedinURL));

                    // Redirect to dashboard
                    router.replace("/dashboard");
                })
                .catch((err) => {
                    toast.error("Something went wrong while logging in.");
                    console.error(err);
                });
        },
    });

    return (
        <main className="w-full flex items-center justify-center h-screen">
            <Link
                href="/"
                className={
                    "absolute top-5 left-5 z-50 " +
                    buttonVariants({ variant: "outline", size: "icon" })
                }
            >
                <PinLeftIcon />
            </Link>
            <form onSubmit={(e: any) => login(e)}>
                <Card className="w-full max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-2xl">Login</CardTitle>
                        <CardDescription>
                            Enter your email below to login to your account.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="user@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        {isPending ? (
                            <ButtonLoading className="w-full" />
                        ) : (
                            <Button className="w-full" type="submit">
                                Sign in
                            </Button>
                        )}
                    </CardFooter>
                </Card>
            </form>
        </main>
    );
}
