import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { hasBusinessInfo } from "@/models/users";

export default async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check for session cookie
  const sessionCookie = request.cookies.get("better-auth.session_token");

  // Paths that don't require authentication
  const publicPaths = ["/home", "/login"];

  // If accessing a public path without session, allow it
  if (publicPaths.includes(pathname) && !sessionCookie) {
    return NextResponse.next();
  }

  // If user is authenticated and trying to access login page, redirect based on business info
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
      // If error getting session, clear the invalid cookie and allow access to login
      console.error("Error getting session in proxy:", error);
      return NextResponse.next();
    }
  }

  // If user is not authenticated and trying to access protected paths
  if (!sessionCookie) {
    // Redirect to /home for unauthenticated users trying to access protected routes
    if (
      pathname === "/" ||
      pathname.startsWith("/(dashboard)") ||
      pathname === "/business-info"
    ) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
    // Allow access to other public paths
    return NextResponse.next();
  }

  // If user is authenticated, check business info for protected paths (except business-info page and API routes)
  if (
    sessionCookie &&
    pathname !== "/business-info" &&
    !pathname.startsWith("/api") &&
    !publicPaths.includes(pathname)
  ) {
    try {
      const session = await auth.api.getSession({
        headers: request.headers,
      });
      if (session?.user) {
        const completed = await hasBusinessInfo(session.user.id);
        // If business info is not complete, redirect to business-info page
        if (!completed && pathname !== "/business-info") {
          return NextResponse.redirect(new URL("/business-info", request.url));
        }
      } else {
        // Session cookie exists but no valid session - redirect to login
        return NextResponse.redirect(new URL("/login", request.url));
      }
    } catch (error) {
      // If error checking business info, log and redirect to login
      console.error("Error checking business info in proxy:", error);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Allow access for authenticated users
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
