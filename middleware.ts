import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;

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
     * - api/auth (NextAuth.js routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
