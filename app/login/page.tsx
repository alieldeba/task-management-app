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
import axios from "../../utils/axios";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

export default function Login() {
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");

    // const { mutate: login, isPending } = useMutation({
    //     mutationFn: async (e: Event) => {
    //         e.preventDefault();
    //         return await axios
    //             .post("https://managing-tasks-api.vercel.app/auth/login", {
    //                 email,
    //                 password,
    //             })
    //             .then((res) => console.log(res.data))
    //             .catch((err) => console.error(err));
    //     },
    // });

    async function login() {
        return await axios
            .post("/auth/login", {
                email: "alieldeba375@gmail.com",
                password: "alisameh2007",
            })
            .then((res) => toast(res.data.access_token))
            .catch((err) => console.error(err));
    }

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
                    <Button className="w-full" onClick={() => login()}>
                        Sign in
                    </Button>
                </CardFooter>
            </Card>
        </main>
    );
}
