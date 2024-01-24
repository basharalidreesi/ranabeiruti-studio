import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import slugConfig from "../../util/slugConfig";
import stringConfig from "../../util/stringConfig";

export const TYPE_ICON = TagIcon;

export default defineType({
	name: "type_",
	type: "document",
	title: "Type",
	icon: TYPE_ICON,
	__experimental_formPreviewTitle: false,
	fields: [
		defineField({
			name: "name",
			type: "string",
			title: "Name",
			description: "",
			validation: (Rule) => Rule.custom(stringConfig.requireString),
		}),
		defineField({
			name: "slug",
			type: "slug",
			title: "Slug",
			description: "",
			options: {
				source: "name",
				slugify: slugConfig.customSlugify,
			},
			validation: (Rule) => Rule.custom(slugConfig.requireSlug),
		}),
		defineField({
			name: "applicableToDocumentTypes",
			type: "array",
			title: "Applicable to",
			description: "",
			of: [
				{ type: "string", },
			],
			options: {
				list: [
					{
						title: "Projects?",
						value: "project",
					},
					{
						title: "Publications?",
						value: "publication",
					},
				],
			},
			initialValue: ["projects", "publications"],
			validation: (Rule) => Rule.required(),
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
			applicableToDocumentTypes: "applicableToDocumentTypes",
		},
		prepare(selection) {
			const {
				name,
				applicableToDocumentTypes,
			} = selection;
			const isApplicableToProjects = applicableToDocumentTypes && applicableToDocumentTypes.includes("project");
			const isApplicableToPublications = applicableToDocumentTypes && applicableToDocumentTypes.includes("publication");
			return {
				title: name,
				subtitle: applicableToDocumentTypes && `Applicable to ${[isApplicableToProjects && "projects", isApplicableToPublications && "publications"]?.filter(Boolean)?.join(" and ")}`,
			};
		},
	},
});