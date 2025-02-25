import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.name;

  if (req.nextUrl.pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  const isAuthPage = ["/login", "/register"].includes(req.nextUrl.pathname);

  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && isAuthPage) {
    const lastPage = req.headers.get("referer") || "/";
    return NextResponse.redirect(new URL(lastPage, req.url));
  }

  return NextResponse.next();
}
