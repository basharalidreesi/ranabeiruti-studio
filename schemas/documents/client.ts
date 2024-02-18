import { CaseIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import slugConfig from "../../util/slugConfig";
import stringConfig from "../../util/stringConfig";
import descriptionConfig from "../../util/descriptionConfig";

export const CLIENT_ICON = CaseIcon;

export default defineType({
	name: "client",
	type: "document",
	title: "Client",
	icon: CLIENT_ICON,
	__experimental_formPreviewTitle: false,
	fields: [
		defineField({
			name: "name",
			type: "string",
			title: "Name",
			description: descriptionConfig.name("Client", "required"),
			validation: (Rule) => Rule.custom(stringConfig.requireString),
		}),
		defineField({
			name: "slug",
			type: "slug",
			title: "Slug",
			description: descriptionConfig.slug2("Client", "required"),
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