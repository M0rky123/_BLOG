import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import api from "./utils/axiosInstance";

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/_next")) {
    NextResponse.next();
    return;
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

  const isTokenValid = (await api.get(`/auth/verify/${token}`)).data;

  if (!isTokenValid) {
    const response = NextResponse.redirect(new URL("/login", req.url));
    response.cookies.delete("access_token");
    return response;
  }

  if (isOnAuthPage) {
    NextResponse.redirect(new URL("/", req.url));
    return;
  }

  return NextResponse.next();
}
