import { useMemo } from "react";
import { useClient } from "sanity";

export const USE_CDN = true;
export const API_VERSION = "2023-10-01";

export default function useSanityClient() {
	const client = useClient({
		useCdn: USE_CDN,
		apiVersion: API_VERSION,
	});
	return useMemo(() => client, [client]);
};