import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import api from "./utils/axiosInstance";

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  const isAuthPage = ["/login", "/register"].includes(req.nextUrl.pathname);
  const isTokenValid = (await api.get("/auth/verify")).data;

  if (isAuthPage && isTokenValid) {
    console.log("Redirecting to /");
    const lastPage = req.headers.get("referer") || "/";
    return NextResponse.redirect(new URL(lastPage, req.url));
  }

  if (!isAuthPage && !isTokenValid) {
    console.log("Redirecting to /login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
