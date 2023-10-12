export default function requireSlug(slug) {
	if (!slug || !slug?.current || slug?.current?.trim()?.length === 0) { return "Required"; };
	if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/g.test(slug?.current)) { return "Invalid slug"; };
	return true;
}