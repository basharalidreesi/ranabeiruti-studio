import { BillIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
	name: "pressListing",
	type: "document",
	title: "Press Listing",
	icon: BillIcon,
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