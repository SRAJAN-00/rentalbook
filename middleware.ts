import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;

    // Add CORS headers to all API routes
    if (pathname.startsWith("/api/")) {
      // Handle preflight requests
      if (req.method === "OPTIONS") {
        return new NextResponse(null, {
          status: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        });
      }

      // For other API requests, add CORS headers to the response
      const response = NextResponse.next();
      response.headers.set("Access-Control-Allow-Origin", "*");
      response.headers.set(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
      );
      response.headers.set(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
      );
      return response;
    }

    // If trying to access protected routes without token, redirect to signin
    if (pathname.startsWith("/books") || pathname.startsWith("/dashboard")) {
      return;
    }

    return;
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Public routes that don't require authentication
        const publicRoutes = ["/", "/auth/signin", "/auth/signup", "/api/auth"];

        // Allow access to public routes and auth API routes
        if (publicRoutes.some((route) => pathname.startsWith(route))) {
          return true;
        }

        // For protected routes (books, dashboard), require authentication
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};
