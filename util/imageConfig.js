import { useEffect, useState } from "react";
import { mediaAssetSource } from "sanity-plugin-media";
import useSanityClient from "../sanity.client";
import imageUrlBuilder from "@sanity/image-url";

export const imageSources = [mediaAssetSource];

const imageConfig = {
	options: {
		hotspot: true,
		storeOriginalFilename: false,
		sources: imageSources,
	},
	buildImage: (imageObject) => {
		const [data, setData] = useState(null);
		const client = useSanityClient();
		const imageBuilder = imageUrlBuilder(client);
		useEffect(() => {
			async function getData() {
				const data = imageBuilder.image(imageObject).width(1500);
				setData(data);
			};
			getData();
		}, [imageObject]);
		return data;
	},
};

export default imageConfig;