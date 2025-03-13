import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import api from "./utils/axiosInstance";

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/_next")) {
    NextResponse.next();
    return;
  }

  if (req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/prispevky", req.url));
  }

  const isOnAuthPage = req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/register");
  const tokenCookie = req.cookies.get("access_token");
  const token = tokenCookie?.value;

  if (token === undefined) {
    if (isOnAuthPage) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const isTokenValid = (
    await api.get(`/auth/verify`, {
      headers: {
        Cookie: `access_token=${token}`,
      },
    })
  ).data;

  if (!isTokenValid) {
    return NextResponse.redirect(new URL("/login", req.url)).cookies.delete("access_token");
  }

  if (isOnAuthPage) {
    return NextResponse.redirect(new URL("/prispevky", req.url));
  }

  return NextResponse.next();
}
