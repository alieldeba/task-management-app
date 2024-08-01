import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard",
    description:
        "This is a task management app with a standalone features for creating and managing tasks.",
};

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return children;
}
