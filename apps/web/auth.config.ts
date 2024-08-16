import Twitter from "next-auth/providers/twitter";
import Google from "next-auth/providers/google";

import type { NextAuthConfig } from "next-auth";
const isProduction = process.env.NODE_ENV === "production";

export default {
	providers: [],
	cookies: {
		sessionToken: {
			name: `${isProduction ? "__Secure-" : ""}next-auth.session-token`,
			options: {
				httpOnly: true,
				sameSite: "lax",
				path: "/",
				secure: isProduction,
				domain: ".vercel.app",
			},
		},
		callbackUrl: {
			name: `${isProduction ? "__Secure-" : ""}next-auth.callback-url`,
			options: {
				sameSite: "lax",
				path: "/",
				secure: isProduction,
				domain: ".vercel.app",
			},
		},
		csrfToken: {
			name: `${isProduction ? "__Host-" : ""}next-auth.csrf-token`,
			options: {
				httpOnly: true,
				sameSite: "lax",
				path: "/",
				secure: isProduction,
				domain: ".vercel.app",
			},
		},
	},
} satisfies NextAuthConfig;
