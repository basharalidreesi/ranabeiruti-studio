import { defineField, defineType } from "sanity";
import { customSlugify, imageConfig, requireSlug, requireString } from "../../util";
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
			validation: (Rule) => Rule.custom(requireString),
		}),
		defineField({
			name: "slug",
			type: "slug",
			title: "Slug",
			description: "",
			options: {
				source: "title",
				slugify: customSlugify,
			},
			validation: (Rule) => Rule.custom(requireSlug),
		}),
		defineField({
			name: "date",
			type: "date",
			title: "Date",
			description: "",
			options: {
				// dateFormat: "D MMMM YYYY",
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "description",
			type: "simplePortableText",
			title: "Short Description",
			description: "",
		}),
		defineField({
			name: "image",
			type: "image",
			title: "Main Image",
			description: "",
			options: imageConfig.options,
			// validation: (Rule) => Rule.custom((value) => {
			// 	if (!value?.asset) { return "Required"; };
			// 	return true;
			// }),
		}),
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
			// image
		},
		prepare(selection) {
			const {
				title,
				// date
				// image
			} = selection;
			return {
				title: title,
				// subtitle
				// media
			};
		},
	},
});