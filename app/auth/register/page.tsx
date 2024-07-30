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
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useRouter } from "next/navigation";

export default function Register() {
    const [username, setUsername] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [linkedinURL, setLinkedinURL] = React.useState<string>("");

    const router = useRouter();

    const { mutate: register, isPending } = useMutation({
        mutationFn: async (e: Event) => {
            e.preventDefault();
            return await axios
                .post("/auth/register", {
                    username,
                    email,
                    password,
                    linkedinURL,
                })
                .then((res) => {
                    toast.success(res.data.message);

                    // Redirect to login
                    router.replace("/auth/login");
                })
                .catch((err) => {
                    toast.error(
                        "Something went wrong while creating your account."
                    );
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
            <form onSubmit={(e: any) => register(e)}>
                <Card className="w-full max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-2xl">Register</CardTitle>
                        <CardDescription>
                            Enter your email below to login to your account.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Username</Label>
                            <Input
                                id="username"
                                type="text"
                                placeholder="john"
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Linkedin URL</Label>
                            <Input
                                id="linkedin-url"
                                type="text"
                                placeholder="https://linkedin.com/in/user"
                                onChange={(e) => setLinkedinURL(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="user@example.com"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" type="submit">
                            Sign up
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </main>
    );
}
