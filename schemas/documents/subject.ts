import { BulbOutlineIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import slugConfig from "../../util/slugConfig";
import stringConfig from "../../util/stringConfig";
import { descriptionConfig } from "../../util";

export const SUBJECT_ICON = BulbOutlineIcon;

export default defineType({
	name: "subject",
	type: "document",
	title: "Subject",
	icon: SUBJECT_ICON,
	__experimental_formPreviewTitle: false,
	fields: [
		defineField({
			name: "name",
			type: "string",
			title: "Name",
			description: descriptionConfig.name("Subject", "required"),
			validation: (Rule) => Rule.custom(stringConfig.requireString),
		}),
		defineField({
			name: "slug",
			type: "slug",
			title: "Slug",
			description: descriptionConfig.slug2("Subject", "required"),
			options: {
				source: "name",
				slugify: slugConfig.customSlugify,
			},
			validation: (Rule) => Rule.custom(slugConfig.requireSlug),
		}),
	],
	orderings: [
		{
			title: "Name",
			name: "nameAsc",
			by: [
				{ field: "name", direction: "asc" },
			],
		},
	],
	preview: {
		select: {
			name: "name",
		},
		prepare(selection) {
			const {
				name,
			} = selection;
			return {
				title: name,
			};
		},
	},
});