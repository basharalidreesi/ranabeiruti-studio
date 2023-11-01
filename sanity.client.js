import { useMemo } from "react";
import { useClient } from "sanity";

export const USE_CDN = false;
export const API_VERSION = "2023-10-01";

export default function useSanityClient() {
	const client = useClient({
		USE_CDN,
		API_VERSION
	});
	return useMemo(() => client, [client]);
};