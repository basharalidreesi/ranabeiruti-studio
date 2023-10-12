export default function requireString(string) {
	if (!string || string?.trim()?.length === 0) { return "Required"; };
	return true;
}