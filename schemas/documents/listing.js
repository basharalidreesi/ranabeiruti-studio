import { BoltIcon, CalendarIcon, FilterIcon, HomeIcon, LinkIcon, OkHandIcon, UlistIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { slugConfig, stringConfig } from "../../util";
import { PROJECT_ICON } from "./project";
import { PRESS_ICON } from "./press";

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
		defineField({
			name: "quicklinks",
			type: "array",
			title: "QuickLinks",
			description: "",
			of: [
				defineArrayMember({
					name: "quicklinkGroup",
					type: "object",
					title: "QuickLink Group",
					icon: BoltIcon,
					fields: [
						defineField({
							name: "title",
							type: "string",
							title: "Title",
							description: "",
							validation: (Rule) => Rule.custom(stringConfig.requireString),
						}),
						defineField({
							name: "items",
							type: "array",
							title: "Items",
							description: "",
							of: [
								defineArrayMember({
									name: "linkToItem",
									type: "reference",
									title: "Link to Item",
									icon: LinkIcon,
									to: [
										{ type: "project" },
										{ type: "news" },
										{ type: "press" },
									],
									options: {
										disableNew: true,
									},
								}),
								defineArrayMember({
									name: "filterByTag",
									type: "reference",
									title: "Filter by Tag",
									icon: FilterIcon,
									to: [
										{ type: "client" },
										{ type: "location" },
										{ type: "type_" },
										{ type: "subject" },
										{ type: "collection" },
									],
									options: {
										disableNew: true,
									},
								}),
								defineArrayMember({
									name: "filterByDate",
									type: "object",
									title: "Filter by Date",
									icon: CalendarIcon,
									fields: [
										defineField({
											name: "year",
											type: "number",
											title: "Year",
											description: "",
											validation: (Rule) => Rule.required().integer(),
										}),
									],
								}),
								defineArrayMember({
									name: "customFilter",
									type: "object",
									title: "Custom Filter",
									icon: OkHandIcon,
									fields: [
										defineField({
											name: "label",
											type: "string",
											title: "Label",
											description: "",
											validation: (Rule) => Rule.custom(stringConfig.requireString),
										}),
										defineField({
											name: "tags",
											type: "array",
											title: "Tags",
											of: [
												defineArrayMember({
													name: "tag",
													type: "reference",
													title: "Tag",
													to: [
														{ type: "client" },
														{ type: "location" },
														{ type: "type_" },
														{ type: "subject" },
														{ type: "collection" },
													],
												}),
											],
										}),
									],
								}),
							],
						}),
					],
				}),
			],
		}),
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