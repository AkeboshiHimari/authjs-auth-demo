"use client";
import { useEffect } from "react";
export default function ConsoleWarning() {
	useEffect(() => {
		const warningMessages = [
			{
				message: "Hello!👋 You can insert self-XSS warning here.",
				style: "color: white; font-size: 16px;",
			},
		];

		const emitWarning = () => {
			console.clear(); // Clear the console
			warningMessages.forEach((msg, index) => {
				setTimeout(() => {
					console.log(`%c${msg.message}`, msg.style);
				}, index * 1000); // Display each message at 1-second intervals
			});
		};

		emitWarning();
	}, []);

	return null;
}
