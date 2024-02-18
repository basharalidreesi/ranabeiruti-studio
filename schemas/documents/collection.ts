import { PackageIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import slugConfig from "../../util/slugConfig";
import stringConfig from "../../util/stringConfig";
import { descriptionConfig, portableTextConfig } from "../../util";

export const COLLECTION_ICON = PackageIcon;

export default defineType({
	name: "collection",
	type: "document",
	title: "Collection",
	icon: COLLECTION_ICON,
	__experimental_formPreviewTitle: false,
	fields: [
		defineField({
			name: "name",
			type: "string",
			title: "Name",
			description: descriptionConfig.name("Collection", "required"),
			validation: (Rule) => Rule.custom(stringConfig.requireString),
		}),
		defineField({
			name: "slug",
			type: "slug",
			title: "Slug",
			description: descriptionConfig.slug2("Collection", "required"),
			options: {
				source: "name",
				slugify: slugConfig.customSlugify,
			},
			validation: (Rule) => Rule.custom(slugConfig.requireSlug),
		}),
		defineField({
			name: "description",
			type: "simplePortableText",
			title: "Blurb",
			description: descriptionConfig.description2("Collection", "required"),
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
			description: "description",
		},
		prepare(selection) {
			const {
				name,
				description,
			} = selection;
			return {
				title: name,
				subtitle: portableTextConfig.renderAsPlainText(description),
			};
		},
	},
});