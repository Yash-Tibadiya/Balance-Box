import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { hasBusinessInfo } from "@/models/users";

export default async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check for session cookie
  const sessionCookie = request.cookies.get("better-auth.session_token");

  // If user is authenticated and trying to access login page, redirect to business-info or home
  if (sessionCookie && pathname === "/login") {
    try {
      const session = await auth.api.getSession({
        headers: request.headers,
      });
      if (session?.user) {
        const completed = await hasBusinessInfo(session.user.id);
        if (completed) {
          return NextResponse.redirect(new URL("/", request.url));
        } else {
          return NextResponse.redirect(new URL("/business-info", request.url));
        }
      }
    } catch (error) {
      // If error, just redirect to home
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Paths that don't require authentication
  const publicPaths = ["/home", "/login"];

  // If accessing a public path, allow it
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // If user is not authenticated and trying to access protected path
  if (!sessionCookie) {
    // Redirect to /home for unauthenticated users
    if (
      pathname === "/" ||
      pathname.startsWith("/(dashboard)") ||
      pathname === "/business-info"
    ) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
  }

  // If user is authenticated, check business info for protected paths (except business-info page and API routes)
  if (
    sessionCookie &&
    pathname !== "/business-info" &&
    !pathname.startsWith("/api")
  ) {
    try {
      const session = await auth.api.getSession({
        headers: request.headers,
      });
      if (session?.user) {
        const completed = await hasBusinessInfo(session.user.id);
        // If business info is not complete, redirect to business-info page
        if (!completed) {
          return NextResponse.redirect(new URL("/business-info", request.url));
        }
      }
    } catch (error) {
      // If error checking business info, allow access (fail open)
      console.error("Error checking business info in middleware:", error);
    }
  }

  // If user is authenticated, allow access
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images/ (image files)
     */
    "/((?!_next/static|_next/image|favicon.ico|images/).*)",
  ],
};
