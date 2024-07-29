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
import Link from "next/link";

export default function Register() {
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
                    <CardTitle className="text-2xl">Register</CardTitle>
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
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" required />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full">Sign up</Button>
                </CardFooter>
            </Card>
        </main>
    );
}
