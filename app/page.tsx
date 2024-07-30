import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
    return (
        <main className="w-full h-screen flex flex-col gap-2 items-center justify-center">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
                Task Management App
            </h1>
            <p className="leading-7 [&:not(:first-child)]:mt-6 text-center">
                Start now by creating an account or by logging to your existing
                account to reach your tasks ✨
            </p>
            <div className="flex gap-3">
                <Link
                    href="/auth/register"
                    className={buttonVariants({
                        variant: "default",
                        size: "lg",
                    })}
                >
                    Register new account
                </Link>
                <Link
                    href="/auth/login"
                    className={buttonVariants({
                        variant: "outline",
                        size: "lg",
                    })}
                >
                    Login existing account
                </Link>
            </div>
        </main>
    );
}
