import { mediaAssetSource } from "sanity-plugin-media";

const imageConfig = {
	options: {
		hotspot: true,
		storeOriginalFilename: false,
		sources: [mediaAssetSource],
	},
};

export default imageConfig;