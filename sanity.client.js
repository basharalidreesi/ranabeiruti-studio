import { useMemo } from "react";
import { useClient } from "sanity";

export const useCdn = false;
export const apiVersion = "2023-10-01";

export default function useSanityClient() {
	const client = useClient({
		useCdn,
		apiVersion
	});
	return useMemo(() => client, [client]);
};