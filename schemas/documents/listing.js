import { HomeIcon, UlistIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { PROJECT_ICON } from "./project";
import { PRESS_ICON } from "./press";
import { slugConfig, stringConfig } from "../../util";

export default defineType({
	name: "listing",
	type: "document",
	title: "Listing",
	icon: UlistIcon,
	fields: [
		defineField({
			name: "title",
			type: "string",
			title: "Title",
			description: "",
			// initalValue config
			// hidden config
			// readOnly config
			validation: (Rule) => Rule.custom(stringConfig.requireString),
		}),
		defineField({
			name: "slug",
			type: "slug",
			title: "Slug",
			description: "",
			options: {
				source: "title",
				slugify: slugConfig.customSlugify,
				// isUnique config
			},
			hidden: ({ document }) => document?._id?.replace("drafts.", "") === "homepage",
			readOnly: ({ document }) => document?._id?.replace("drafts.", "") === "homepage",
			validation: (Rule) => Rule.custom((value, context) => {
				if (context.document?._id?.replace("drafts.", "") === "homepage") { return true; };
				return slugConfig.requireSlug(value);
			}),
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
	preview: {
		select: {
			title: "title",
			_id: "_id",
		},
		prepare(selection) {
			const {
				title,
				_id,
			} = selection;
			const id = _id.replace("drafts.", "");
			return {
				title: title,
				subtitle:
					id === "homepage" ? "Homepage"
					: id === "projectsListing" ? "Projects Listing"
					: id === "pressListing" ? "Press Listing"
					: null,
				media:
					id === "homepage" ? HomeIcon
					: id === "projectsListing" ? PROJECT_ICON
					: id === "pressListing" ? PRESS_ICON
					: null
			};
		},
	},
});