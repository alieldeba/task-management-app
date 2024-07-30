import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkLogin } from "./app/actions";

// Middleware to handle authentication and redirection
export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    // Check if the user is logged in
    const loginStatus: boolean = await checkLogin();

    if (loginStatus) {
        if (
            pathname === "/" ||
            pathname.startsWith("/auth/login") ||
            pathname.startsWith("/auth/register")
        ) {
            // Redirect logged-in users trying to access login or registration pages to /dashboard
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
    } else {
        // User is not logged in, redirect if trying to access restricted areas
        if (pathname.startsWith("/dashboard")) {
            // Redirect unauthenticated users trying to access the dashboard to /
            return NextResponse.redirect(new URL("/", request.url));
        }
    }

    // If no redirection is required, proceed to the next middleware or route
    NextResponse.next();
}
