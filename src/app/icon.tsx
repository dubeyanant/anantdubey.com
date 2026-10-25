import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// The stamp form at its smallest size: a perforated square with the monogram.
export default function Icon() {
	return new ImageResponse(
		<div style={{ width: 64, height: 64, display: "flex", background: "#c8211b", padding: 6 }}>
			<div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", background: "#fbf9f4", color: "#c8211b", fontSize: 30, fontWeight: 900, letterSpacing: -1 }}>
				AD
			</div>
		</div>,
		size,
	);
}
