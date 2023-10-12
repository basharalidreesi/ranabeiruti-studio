import { CaseIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
	name: "client",
	type: "document",
	title: "Client",
	icon: CaseIcon,
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
	// orderings config
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