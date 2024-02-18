import { defineField, defineType } from "sanity";
import { dateConfig, descriptionConfig, imageConfig, portableTextConfig, slugConfig, stringConfig } from "../../util";
import { BellIcon } from "@sanity/icons";

export const NEWS_ICON = BellIcon;
export const NEWS_TITLE = "News";

export default defineType({
	name: "news",
	type: "document",
	title: NEWS_TITLE,
	icon: NEWS_ICON,
	fields: [
		defineField({
			name: "title",
			type: "string",
			title: "Title",
			description: descriptionConfig.title("News item", "required"),
			validation: (Rule) => Rule.custom(stringConfig.requireString),
		}),
		defineField({
			name: "slug",
			type: "slug",
			title: "Slug",
			description: descriptionConfig.slug("News item", "required"),
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
			description: descriptionConfig.date("News item", "Press Listing", "required"),
			options: {
				dateFormat: dateConfig.dateFormat,
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "image",
			type: "image",
			title: "Image",
			description: descriptionConfig.mainImage("News item", "Press Listing", "optional", false),
			options: imageConfig.options,
		}),
		defineField({
			name: "body",
			type: "lessComplexPortableText",
			title: "Body",
			description: descriptionConfig.body("News item", "required"),
			validation: (Rule) => Rule.required(),
		}),
	],
	orderings: [
		{
			title: "Date, newest first",
			name: "dateDesc",
			by: [
				{ field: "date", direction: "desc" },
			],
		},
		{
			title: "Date, oldest first",
			name: "dateAsc",
			by: [
				{ field: "date", direction: "asc" },
			],
		},
		{
			title: "Title",
			name: "titleAsc",
			by: [
				{ field: "title", direction: "asc" },
			],
		},
	],
	preview: {
		select: {
			title: "title",
			date: "date",
			image: "image",
			description: "description",
		},
		prepare(selection) {
			const {
				title,
				date,
				image,
				description,
			} = selection;
			return {
				title: title,
				subtitle: date ? dateConfig.renderAsString(date, "short") : "No date",
				description: portableTextConfig.renderAsPlainText(description),
				media: image && image.asset ? image : null,
			};
		},
	},
});