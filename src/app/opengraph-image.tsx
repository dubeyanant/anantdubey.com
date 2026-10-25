import { ImageResponse } from "next/og";

export const alt = "Anant Dubey: Flutter engineer. 10% of a broking app's trade volume, 200K+ daily users.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The share card is the sheet itself: name on post-red, one stamp carrying the proof.
export default function OpengraphImage() {
	const perf = Array.from({ length: 18 });
	return new ImageResponse(
		<div style={{ width: "100%", height: "100%", display: "flex", background: "#c8211b", color: "#fbf9f4", padding: 64, fontFamily: "sans-serif" }}>
			<div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 600 }}>
				<div style={{ fontSize: 22, letterSpacing: 4, textTransform: "uppercase" }}>Sheet Nº 2026 · Mumbai</div>
				<div style={{ display: "flex", flexDirection: "column" }}>
					<div style={{ fontSize: 150, fontWeight: 900, lineHeight: 0.85, letterSpacing: -2 }}>ANANT</div>
					<div style={{ fontSize: 150, fontWeight: 900, lineHeight: 0.85, letterSpacing: -2 }}>DUBEY</div>
					<div style={{ fontSize: 34, marginTop: 28, lineHeight: 1.3 }}>Flutter engineer in Mumbai. Trading apps and AI agents.</div>
				</div>
				<div style={{ fontSize: 22, letterSpacing: 4, textTransform: "uppercase" }}>anantdubey.com</div>
			</div>
			<div style={{ display: "flex", marginLeft: "auto", width: 400, height: 500, background: "#fbf9f4", padding: 20, position: "relative" }}>
				{perf.map((_, i) => (
					<div key={`t${i}`} style={{ position: "absolute", top: -9, left: 4 + i * 22.4, width: 16, height: 16, borderRadius: 8, background: "#c8211b" }} />
				))}
				{perf.map((_, i) => (
					<div key={`b${i}`} style={{ position: "absolute", bottom: -9, left: 4 + i * 22.4, width: 16, height: 16, borderRadius: 8, background: "#c8211b" }} />
				))}
				<div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", border: "4px solid #1f3fa8", color: "#1f3fa8", width: "100%", padding: 24 }}>
					<div style={{ fontSize: 20, letterSpacing: 3 }}>ONE-TAP F&O · 2024–26</div>
					<div style={{ display: "flex", flexDirection: "column" }}>
						<div style={{ fontSize: 170, fontWeight: 900, lineHeight: 0.85 }}>10%</div>
						<div style={{ fontSize: 26, fontWeight: 700, marginTop: 14, lineHeight: 1.3 }}>of the app&apos;s total trade volume, from one module I architected</div>
					</div>
				</div>
			</div>
		</div>,
		size,
	);
}
