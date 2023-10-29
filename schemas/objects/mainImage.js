import { defineField, defineType } from "sanity";
import { imageConfig } from "../../util";

export default defineType({
	name: "mainImage",
	type: "image",
	title: "Main Image",
	description: "",
	fields: [
		defineField({
			name: "caption", // `multimediaPortableText` and `portableTextConfig.renderAsPlainText` will break if `name` is changed
			type: "simplePortableText",
			title: "Caption",
			// hidden: ({ parent }) => !parent?.asset,
		}),
	],
	options: imageConfig.options,
	// validation: (Rule) => Rule.custom((value) => {
	// 	if (!value?.asset) { return "Required"; };
	// 	return true;
	// }),
});