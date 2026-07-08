import { NextResponse } from "next/server";

export function proxy() {
  const response = NextResponse.next();

  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");

  return response;
}

export const config = {
  matcher: [
    "/login",
    "/forgot-password",
    "/accept-invite",
    "/offline",
    "/dashboard/:path*",
    "/siswa/:path*",
    "/orang-tua/:path*",
    "/guru/:path*",
    "/dudi/:path*",
    "/admin/:path*",
  ],
};
