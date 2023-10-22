import { useEffect, useState } from "react";
import useSanityClient from "../sanity.client";

const referenceConfig = {
	buildReference: (ref) => {
		const [data, setData] = useState(null);
		const client = useSanityClient();
		useEffect(() => {
			async function getData() {
				const data = await client.fetch(`*[_id == "${ref}"][0]`);
				setData(data);
			};
			getData();
		}, []);
		return data;
	},
};

export default referenceConfig;