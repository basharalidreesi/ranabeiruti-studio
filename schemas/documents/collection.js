import { BottleIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const COLLECTION_ICON = BottleIcon;

export default defineType({
	name: "collection",
	type: "document",
	title: "Collection",
	icon: COLLECTION_ICON,
	fields: [
		defineField({
			name: "name",
			type: "string",
			title: "Name",
			description: "",
			// initalValue config
			// hidden config
			// readOnly config
			// validation config
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