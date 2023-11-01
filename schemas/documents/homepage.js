import { HomeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
	name: "homepage",
	type: "document",
	title: "Homepage",
	icon: HomeIcon,
	fields: [
		defineField({
			name: "temp",
			type: "string",
			title: "Temp",
			description: "",
			// initalValue config
			// hidden config
			// readOnly config
			// validation config
		}),
	],
	// orderings config
	// preview config
});