import { RocketIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { COUNTRIES } from "../../lib/countries";

export const LOCATION_ICON = RocketIcon;

export default defineType({
	name: "location",
	type: "document",
	title: "Location",
	icon: LOCATION_ICON,
	__experimental_formPreviewTitle: false,
	fields: [
		defineField({
			name: "name",
			type: "string",
			title: "Name",
			description: "",
		}),
		defineField({
			name: "locale",
			type: "string",
			title: "Locale",
			description: "",
			options: {
				list: COUNTRIES,
			},
			validation: (Rule) => Rule.required(),
		}),
	],
	orderings: [
		{
			title: "Locale",
			name: "localeAsc",
			by: [
				{ field: "locale", direction: "asc" },
				{ field: "name", direction: "asc" },
			],
		},
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
			locale: "locale",
		},
		prepare(selection) {
			const {
				name,
				locale,
			} = selection;
			return {
				title: [name, locale ? COUNTRIES.find((country) => country.value === locale)?.title : null]?.filter(Boolean)?.join(", "),
				// subtitle: locale,
			};
		},
	},
});