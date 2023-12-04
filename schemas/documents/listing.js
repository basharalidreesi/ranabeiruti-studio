import { HomeIcon, UlistIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { imageConfig, slugConfig, stringConfig } from "../../util";
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
			name: "featuredProjects",
			type: "array",
			title: "Featured Projects",
			description: "",
			of: [
				defineArrayMember({
					name: "featuredProject",
					type: "object",
					title: "Featured Project",
					fields: [
						defineField({
							name: "project",
							type: "reference",
							title: "Project",
							to: [{ type: "project", }],
							options: {
								disableNew: true,
							},
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: "doesUseProjectImage",
							type: "boolean",
							title: "Use project main image?",
							description: "",
							options: {
								layout: "checkbox",
							},
							validation: (Rule) => Rule.required(),
							initialValue: true,
						}),
						defineField({
							name: "image",
							type: "image",
							title: "Image",
							options: imageConfig.options,
							hidden: ({ parent }) => parent.doesUseProjectImage,
							validation: (Rule) => Rule.custom((value, context) => {
								if (!value?.asset && !context.parent.doesUseProjectImage) { return "Required"; };
								return true;
							}),
						}),
					],
					preview: {
						select: {
							title: "project.title",
							subtitle: "project.subtitle",
							projectImage: "project.image",
							doesUseProjectImage: "doesUseProjectImage",
							image: "image",
						},
						prepare(selection) {
							const {
								title,
								subtitle,
								projectImage,
								doesUseProjectImage,
								image,
							} = selection;
							return {
								title: title,
								subtitle: subtitle,
								media: (doesUseProjectImage ? projectImage : image) || PROJECT_ICON,
							};
						},
					},
				}),
			],
			hidden: ({ document }) => document?._id?.replace("drafts.", "") !== "homepage",
			validation: (Rule) => Rule.custom((value, context) => {
				if ((!value || value.length === 0) && context.document?._id?.replace("drafts.", "") === "homepage") { return "Required"; };
				return true;
			}),
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