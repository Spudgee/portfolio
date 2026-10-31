import QRCode from "qrcode";

/** Blank modules around the code; scanners need a light margin to find its edges. */
const QUIET_ZONE = 2;

/**
 * A QR code for `value`, built on the server as one SVG path, so it stays sharp at any size and
 * ships no script. It is always dark on light in both themes: many phone scanners cannot read a
 * light-on-dark code, so these two colours deliberately skip the paper and ink tokens. It fills its
 * column up to 18rem: large enough to scan from across a table, small enough to leave room around it.
 */
export function QrCode({ value, label }: { value: string; label: string }) {
	const { modules } = QRCode.create(value, { errorCorrectionLevel: "M" });
	const box = modules.size + QUIET_ZONE * 2;
	let path = "";
	for (let row = 0; row < modules.size; row++) {
		for (let col = 0; col < modules.size; col++) {
			if (modules.get(row, col)) {
				path += `M${col + QUIET_ZONE} ${row + QUIET_ZONE}h1v1h-1z`;
			}
		}
	}

	return (
		<svg
			viewBox={`0 0 ${box} ${box}`}
			shapeRendering="crispEdges"
			className="aspect-square w-full max-w-[18rem] rounded-3xl bg-[#ffffff] text-[#171717]"
		>
			<title>{label}</title>
			<path d={path} fill="currentColor" />
		</svg>
	);
}
