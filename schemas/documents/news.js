import { defineField, defineType } from "sanity";
import { dateConfig, imageConfig, slugConfig, stringConfig } from "../../util";
import { BellIcon } from "@sanity/icons";

export default defineType({
	name: "news",
	type: "document",
	title: "News",
	icon: BellIcon,
	fields: [
		defineField({
			name: "title",
			type: "string",
			title: "Title",
			description: "",
			validation: (Rule) => Rule.custom(stringConfig.requireString),
		}),
		defineField({
			name: "slug",
			type: "slug",
			title: "Slug",
			description: "",
			options: {
				source: "title",
				slugify: slugConfig.customSlugify,
			},
			validation: (Rule) => Rule.custom(slugConfig.requireSlug),
		}),
		defineField({
			name: "date",
			type: "date",
			title: "Date",
			description: "",
			options: {
				dateFormat: dateConfig.dateFormat,
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "description",
			type: "simplePortableText",
			title: "Blurb",
			description: "",
		}),
		// defineField({
		// 	name: "image",
		// 	type: "image",
		// 	title: "Main Image",
		// 	description: "",
		// 	options: imageConfig.options,
		// 	// validation: (Rule) => Rule.custom((value) => {
		// 	// 	if (!value?.asset) { return "Required"; };
		// 	// 	return true;
		// 	// }),
		// }),
		defineField({
			name: "body",
			type: "multimediaPortableText",
			title: "Body",
			description: "",
		}),
	],
	// orderings config
	preview: {
		select: {
			title: "title",
			// date
			// description
			// image
		},
		prepare(selection) {
			const {
				title,
				// date
				// description
				// image
			} = selection;
			return {
				title: title,
				// subtitle
				// media
				// description
			};
		},
	},
});