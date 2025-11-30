import { NextRequest, NextResponse } from "next/server";

export default function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check for session cookie
  const sessionCookie = request.cookies.get("better-auth.session_token");

  // If user is authenticated and trying to access login page, redirect to home
  if (sessionCookie && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
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
    if (pathname === "/" || pathname.startsWith("/(dashboard)")) {
      return NextResponse.redirect(new URL("/home", request.url));
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
