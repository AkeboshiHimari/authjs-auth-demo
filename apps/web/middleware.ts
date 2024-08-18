import { auth } from "@/auth";

export default auth((req) => {
	if (
		!req.auth &&
		req.nextUrl.pathname === ("/protected/middleware" || "/rbac/middleware")
	) {
		const redirectUrl =
			process.env.NEXT_PUBLIC_AUTH_URL || "http://localhost:3001";
		const newUrl = new URL("/", redirectUrl);
		return Response.redirect(newUrl);
	}

	if (
		req.auth?.user.role !== "super" &&
		req.nextUrl.pathname === "/rbac/middleware"
	) {
		const newUrl = new URL(
			"/rbac/middleware/denied",
			`${req.nextUrl.protocol}//${req.nextUrl.host}`,
		);
		return Response.redirect(newUrl);
	}
});

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
