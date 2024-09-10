import { NextResponse } from "next/server";

export async function middleware(req: any) {
  const token = req.cookies.get("token")?.value;
  const url = req.nextUrl.clone();

  const checkToken = async () => {
    const res = await fetch("http://localhost:4000/checkAuth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    const result = await res.json();

    return result;
  };

  if (url.pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      const result = await checkToken();

      if (result.status !== 200) {
        console.log("no token");
        return NextResponse.redirect(new URL("/login", req.url));
      }

      return NextResponse.next();
    } catch (error) {
      console.log("val erreur : ", error);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
  if (url.pathname.startsWith("/login")) {
    if (token) {
      try {
        const res = await checkToken();

        console.log(res.status);

        if (res.status === 200) {
          return NextResponse.redirect(new URL("/dashboard", req.url));
        }
      } catch (error) {
        return;
      }
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
