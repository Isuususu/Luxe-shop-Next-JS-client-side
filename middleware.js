import { NextResponse } from "next/server";

export { default } from "next-auth/middleware";

//Middleware have to expose desktop layout phone image path
export const config = {
  matcher: [
    // match all routes except static files and APIs
    "/((?!api|_next/static|_next/image|favicon.ico|public/images).*)",
  ],
};
