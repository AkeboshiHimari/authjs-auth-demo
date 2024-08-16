import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
	trustHost: true,
	session: { strategy: "jwt" },
	...authConfig,
	callbacks: {
		async session({ session, token }) {
			session.user.id = token.sub as string;
			session.user.name = token.name;
			session.user.role = token.role;
			session.user.google = token.google;
			session.user.twitter = token.twitter;
			return session;
		},
		
	},
});
