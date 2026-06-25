import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { locales, routing } from "./i18n/routing";

const LOCALE_COOKIE = "fntracker-locale";
const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;

  if (
    cookieLocale &&
    !locales.includes(cookieLocale as (typeof locales)[number])
  ) {
    const response = NextResponse.redirect(request.url);
    response.cookies.set(LOCALE_COOKIE, routing.defaultLocale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
    return response;
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
