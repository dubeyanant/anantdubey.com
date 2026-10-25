/* Live miniatures printed inside stamps. Pure CSS motion; reduced-motion freezes them on their end frame. */

export function FnoVignette() {
	return (
		<div className="relative h-full min-h-40 overflow-hidden border-2 border-current">
			{/* the phone, with an order ticket and a BUY button that keeps getting tapped */}
			<div className="absolute top-[14%] left-[7%] h-[72%] w-[26%] min-w-24 rounded-[18px] border-[3px] border-current p-[6%]">
				<div className="mb-2 h-2 w-full rounded-sm bg-current opacity-25" />
				<div className="mb-2 h-2 w-[70%] rounded-sm bg-current opacity-25" />
				<div className="mb-2 h-2 w-[85%] rounded-sm bg-current opacity-25" />
				<div
					className="absolute inset-x-[10%] bottom-[8%] h-[16%] rounded-md bg-emerald"
					style={{ animation: "tap 1.8s var(--ease-out-expo) infinite" }}
				/>
			</div>
			{/* the module's slice of trade volume rises after each tap */}
			<div className="absolute right-[6%] bottom-[12%] left-[42%] flex h-[62%] items-end gap-[3%]">
				{[34, 48, 40, 56, 46].map((h) => (
					<span key={h} className="flex-1 bg-current opacity-20" style={{ height: `${h}%` }} />
				))}
				<span
					className="h-full flex-1 origin-bottom bg-current"
					style={{ animation: "rise 1.8s var(--ease-out-expo) infinite" }}
				/>
			</div>
		</div>
	);
}

export function VoiceVignette() {
	const bars = [22, 46, 30, 58, 26, 42, 18, 36];
	return (
		<div className="flex h-16 items-center gap-1.5" aria-hidden="true">
			{bars.map((h, i) => (
				<span
					key={`${h}-${i}`}
					className="w-1.5 rounded-full bg-current"
					style={{ height: h, animation: `speak 1.1s ease-in-out ${i * 0.09}s infinite` }}
				/>
			))}
		</div>
	);
}
