import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import api from "./utils/axiosInstance";

export async function middleware(req: NextRequest, res: NextResponse) {
  if (req.nextUrl.pathname.startsWith("/_next")) {
    NextResponse.next();
    return;
  }

  const token = req.cookies.get("access_token")?.value;

  if (!token) {
    NextResponse.redirect(new URL("/login", req.nextUrl.origin));
    return;
  }

  const isTokenValid = (await api.get(`/auth/verify${token && `/${token}`}`)).data;

  if (!isTokenValid) {
    res.cookies.delete("access_token");
    NextResponse.redirect(new URL("/login", req.nextUrl.origin));
    return;
  }

  if (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/register") {
    NextResponse.redirect(new URL("/", req.nextUrl.origin));
    return;
  }

  NextResponse.next();
  return;
}
