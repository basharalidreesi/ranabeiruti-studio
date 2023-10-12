import { RocketIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
	name: "location",
	type: "document",
	title: "Location",
	icon: RocketIcon,
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
		defineField({
			name: "locale",
			type: "string",
			title: "Locale",
			description: "",
			// list config
			// initalValue config
			// hidden config
			// readOnly config
			// validation config
		}),
	],
	// orderings config
	preview: {
		select: {
			name: "name",
			locale: "locale",
		},
		prepare(selection) {
			const {
				name,
				locale
			} = selection;
			return {
				title: [name, locale]?.filter(Boolean)?.join(", "),
			};
		},
	},
});