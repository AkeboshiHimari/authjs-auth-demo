import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/sonner";
import ConsoleWarning from "@/components/warning";
import { SessionProvider } from "next-auth/react";

const Pretendard = localFont({
	src: "./fonts/PretendardVariable.woff2",
	display: "swap",
	variable: "--font-pretendard",
	weight: "45 920",
});

export default async function RootLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<>
			<html lang="ko">
				<head>
					<meta name="viewport" content="width=device-width, initial-scale=1" />
				</head>
				<SessionProvider>
					<body className={Pretendard.className}>
						<ThemeProvider
							attribute="class"
							defaultTheme="system"
							enableSystem
							disableTransitionOnChange
						>		
							<main className="flex flex-col min-h-screen">{children}</main>
							<ConsoleWarning />
							<Toaster className={Pretendard.className} />
						</ThemeProvider>
					</body>
				</SessionProvider>
			</html>
		</>
	);
}
