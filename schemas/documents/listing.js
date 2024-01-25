import { HomeIcon, UlistIcon, UnknownIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { imageConfig, slugConfig, stringConfig } from "../../util";
import { PROJECT_ICON, PROJECT_TITLE } from "./project";
import { PRESS_ICON, PRESS_TITLE } from "./press";
import { PUBLICATION_ICON, PUBLICATION_TITLE } from "./publication";
import { NEWS_ICON, NEWS_TITLE } from "./news";

export const LISTING_ICON = UlistIcon;

export default defineType({
	name: "listing",
	type: "document",
	title: "Listing",
	icon: LISTING_ICON,
	__experimental_formPreviewTitle: false,
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
			name: "featuredItems",
			type: "array",
			title: "Featured Items",
			description: "",
			of: [
				defineArrayMember({
					name: "featuredItem",
					type: "object",
					title: "Featured Item",
					fields: [
						defineField({
							name: "item",
							type: "reference",
							title: "Item",
							to: [
								{ type: "project", },
								{ type: "publication", },
								{ type: "news", },
								{ type: "press", },
							],
							options: {
								disableNew: true,
							},
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: "displayMode",
							type: "string",
							title: "Display Mode",
							description: "",
							options: {
								list: [
									{
										value: "expansive",
										title: "Expansive",
									},
									{
										value: "constrained",
										title: "Constrained",
									},
								],
								layout: "radio",
								direction: "horizontal",
							},
							initialValue: "expansive",
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: "doesUseDocumentImage",
							type: "boolean",
							title: "Use document main image (if applicable)?",
							description: "",
							options: {
								layout: "checkbox",
							},
							initialValue: true,
						}),
						defineField({
							name: "image",
							type: "image",
							title: "Image",
							options: imageConfig.options,
							hidden: ({ parent }) => parent.doesUseDocumentImage,
							validation: (Rule) => Rule.custom((value, context) => {
								if (!value?.asset && !context.parent.doesUseDocumentImage) { return "Required"; };
								return true;
							}),
						}),
					],
					preview: {
						select: {
							documentType: "item._type",
							documentTitle: "item.title",
							documentSubtitle: "item.subtitle",
							documentPublisher: "item.publisher",
							documentImage: "item.image",
							displayMode: "displayMode",
							doesUseDocumentImage: "doesUseDocumentImage",
							image: "image",
						},
						prepare(selection) {
							const {
								documentType,
								documentTitle,
								documentSubtitle,
								documentPublisher,
								documentImage,
								displayMode,
								doesUseDocumentImage,
								image,
							} = selection;
							const resolveTitle = (type) => {
								switch (type) {
									case "project": return documentTitle ? [documentTitle, documentSubtitle]?.filter(Boolean)?.join(": ") : null;
									case "publication": return documentTitle;
									case "news": return documentTitle;
									case "press": return documentTitle ? [documentPublisher, documentTitle]?.filter(Boolean)?.join(": ") : null;
									default: return null;
								};
							};
							const resolveDisplayMode = (mode) => {
								switch (mode) {
									case "expansive": return "Expansive";
									case "constrained": return "Constrained";
									default: return null;
								};
							};
							const resolveSubtitle = (type) => {
								switch (type) {
									case "project": return [PROJECT_TITLE, resolveDisplayMode(displayMode)]?.filter(Boolean)?.join(", ");
									case "publication": return [PUBLICATION_TITLE, resolveDisplayMode(displayMode)]?.filter(Boolean)?.join(", ");
									case "news": return [NEWS_TITLE, resolveDisplayMode(displayMode)]?.filter(Boolean)?.join(", ");
									case "press": return [PRESS_TITLE, resolveDisplayMode(displayMode)]?.filter(Boolean)?.join(", ");
									default: return null;
								};
							};
							const resolveMedia = (type) => {
								switch (type) {
									case "project": return (doesUseDocumentImage ? documentImage : image) || PROJECT_ICON;
									case "publication": return (doesUseDocumentImage ? documentImage : image) || PUBLICATION_ICON;
									case "news": return (doesUseDocumentImage ? documentImage : image) || NEWS_ICON;
									case "press": return (doesUseDocumentImage ? documentImage : image) || PRESS_ICON;
									default: return UnknownIcon;
								};
							};
							return {
								title: resolveTitle(documentType),
								subtitle: resolveSubtitle(documentType),
								media: resolveMedia(documentType),
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
		defineField({
			name: "isEnabled",
			type: "boolean",
			title: "Enable listing?",
			description: "",
			options: {
				layout: "checkbox",
			},
			initialValue: true,
			hidden: ({ document }) => document?._id?.replace("drafts.", "") === "homepage",
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
					: id === "publicationsListing" ? "Publications Listing"
					: id === "pressListing" ? "Press Listing"
					: null,
				media:
					id === "homepage" ? HomeIcon
					: id === "projectsListing" ? PROJECT_ICON
					: id === "publicationsListing" ? PUBLICATION_ICON
					: id === "pressListing" ? PRESS_ICON
					: null
			};
		},
	},
});