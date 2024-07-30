import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login",
    description:
        "This is a task management app with a standalone features for creating and managing tasks.",
};

export default function LoginLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return children;
}
