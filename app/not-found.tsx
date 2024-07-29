import { buttonVariants } from "@/components/ui/button";
import { PinLeftIcon } from "@radix-ui/react-icons";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "404 | Page Not Found",
};

export default function NotFound() {
    return (
        <main className="relative p-5">
            <Link
                href="/"
                className={
                    "absolute top-5 left-5 z-50 " +
                    buttonVariants({ variant: "outline", size: "icon" })
                }
            >
                <PinLeftIcon />
            </Link>
            <section className="flex flex-col items-center justify-center h-[calc(100vh-40px)]">
                <div
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                        }}
                    />
                </div>
                <h1 className="text-4xl font-bold mb-2 text-center text-primary">
                    404
                </h1>
                <h3 className="text-3xl font-bold mb-2 text-center">
                    Page Not Found
                </h3>
                <p className="text-lg text-muted-foreground mb-4 text-center">
                    The page you&apos;re looking for does not exist.
                </p>
            </section>
        </main>
    );
}
