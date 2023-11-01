import { DatabaseIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
	name: "projectsListing",
	type: "document",
	title: "Projects Listing",
	icon: DatabaseIcon,
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
		// defineField({
		// 	name: "categories",
		// 	type: "array",
		// 	title: "Categories",
		// 	of: [
		// 		defineArrayMember({
		// 			name: "category",
		// 			type: "object",
		// 			title: "Category",
		// 			fields: [
		// 				defineField({
		// 					name: "title",
		// 					type: "string",
		// 					title: "Title",
		// 				}),
		// 				defineField({
		// 					name: "contents",
		// 					type: "array",
		// 					title: "Contents",
		// 					of: [
		// 						defineArrayMember({
		// 							name: "item",
		// 							type: "reference",
		// 							title: "Specific item",
		// 							to: [
		// 								{ type: "project" },
		// 								{ type: "press" },
		// 								{ type: "news" },
		// 								{ type: "type_" },
		// 								{ type: "subject" },
		// 								{ type: "collection" },
		// 							],
		// 						}),
		// 						defineArrayMember({
		// 							name: "collectionsP",
		// 							type: "object",
		// 							title: "All Collections",
		// 							fields: [
		// 								defineField({
		// 									name: "title",
		// 									type: "string",
		// 									title: "Title",
		// 								}),
		// 							],
		// 						}),
		// 						defineArrayMember({
		// 							name: "projectsP",
		// 							type: "object",
		// 							title: "All Projects",
		// 							fields: [
		// 								defineField({
		// 									name: "title",
		// 									type: "string",
		// 									title: "Title",
		// 								}),
		// 							],
		// 						}),
		// 						defineArrayMember({
		// 							name: "typesP",
		// 							type: "object",
		// 							title: "All Types",
		// 							fields: [
		// 								defineField({
		// 									name: "title",
		// 									type: "string",
		// 									title: "Title",
		// 								}),
		// 							],
		// 						}),
		// 						defineArrayMember({
		// 							name: "subjectsP",
		// 							type: "object",
		// 							title: "All Subjects",
		// 							fields: [
		// 								defineField({
		// 									name: "title",
		// 									type: "string",
		// 									title: "Title",
		// 								}),
		// 							],
		// 						}),
		// 					],
		// 				}),
		// 			],
		// 		}),
		// 	],
		// }),
	],
});