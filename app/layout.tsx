import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import ReactQueryProvider from "./ReactQueryProvider";
import { Providers } from "./GlobalRedux/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Task Management App",
    description:
        "This is a task management app with a standalone features for creating and managing tasks.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ReactQueryProvider>
                    <Providers>{children}</Providers>
                    <Toaster richColors />
                </ReactQueryProvider>
            </body>
        </html>
    );
}
