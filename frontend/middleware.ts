import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import api from "./utils/axiosInstance";

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  if (req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/prispevky", req.url));
  }

  const isOnAuthPage = req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/register");
  const tokenCookie = req.cookies.get("access_token") as { value: string } | undefined;
  const token = tokenCookie?.value;

  console.log(token);

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
    const response = NextResponse.redirect(new URL("/login", req.url));
    response.cookies.delete("access_token");
    return response;
  }

  if (isOnAuthPage) {
    return NextResponse.redirect(new URL("/prispevky", req.url));
  }

  return NextResponse.next();
}
