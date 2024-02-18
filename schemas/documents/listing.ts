import { HomeIcon, UlistIcon, UnknownIcon } from "@sanity/icons";
import { ValidationContext, defineArrayMember, defineField, defineType } from "sanity";
import { descriptionConfig, imageConfig, referenceConfig, slugConfig, stringConfig } from "../../util";
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
			description: descriptionConfig.title("Listing", "required"),
			validation: (Rule) => Rule.custom(stringConfig.requireString),
		}),
		defineField({
			name: "slug",
			type: "slug",
			title: "Slug",
			description: descriptionConfig.slug("Listing", "required"),
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
			description: "Projects, Publications, Press items, or News items to be featured on the Homepage. This field is required.",
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
							description: "The Project, Publication, Press item, or News item featured in this slide. This field is required.",
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
							description: "Specifies the display mode for the image (if any) featured in this slide. Choose \"Expansive\" for a full-bleed (cropped) image, and \"Constrained\" for one that preserves its intrinsic aspect ratio. This setting has no effect on slides without images. Default value: Expansive.",
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
							description: "Specifies whether to use the main image (if any) of the item featured in this slide, or to override it with a custom one. Default state: True.",
							options: {
								layout: "checkbox",
							},
							initialValue: true,
						}),
						defineField({
							name: "doesUseDocumentSubtitle",
							type: "boolean",
							title: "Use document subtitle (if applicable)?",
							description: "Specifies whether to use the subtitle of the item featured in this slide, or to override it with a custom one. This setting has no effect on slides with News or Press items. Default state: True.",
							options: {
								layout: "checkbox",
							},
							initialValue: true,
						}),
						defineField({
							name: "image",
							type: "image",
							title: "Image",
							description: "The custom image for the item featured in this slide. This field is required. Click on the crop icon located in the top right corner of the image to adjust its composition or define its focal point.",
							options: imageConfig.options,
							hidden: ({ parent }) => parent.doesUseDocumentImage,
							validation: (Rule) => Rule.custom((value, context: ValidationContext & { parent?: any }) => {
								if (!value?.asset && !context.parent?.doesUseDocumentImage) { return "Required"; };
								return true;
							}),
						}),
						defineField({
							name: "subtitle",
							type: "string",
							title: "Subtitle",
							description: "The custom subtitle for the item featured in this slide. This field is required.",
							hidden: ({ parent }) => parent.doesUseDocumentSubtitle,
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
							doesUseDocumentSubtitle: "doesUseDocumentSubtitle",
							image: "image",
							subtitle: "subtitle",
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
								doesUseDocumentSubtitle,
								image,
								subtitle,
							} = selection;
							const resolveTitle = (type) => {
								switch (type) {
									case "project": return documentTitle ? [documentTitle, !doesUseDocumentSubtitle && subtitle || documentSubtitle]?.filter(Boolean)?.join(" — ") : null;
									case "publication": return documentTitle ? [documentTitle, !doesUseDocumentSubtitle && subtitle || documentSubtitle]?.filter(Boolean)?.join(" — ") : null;
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
								title: resolveTitle(documentType) || undefined,
								subtitle: resolveSubtitle(documentType) || undefined,
								media: resolveMedia(documentType) || undefined,
							};
						},
					},
				}),
			],
			hidden: ({ document }) => document?._id?.replace("drafts.", "") !== "homepage",
			/** @ts-ignore */
			validation: (Rule) => Rule.custom((value, context) => {
				if ((!value || value.length === 0) && context.document?._id?.replace("drafts.", "") === "homepage") { return "Required"; };
				return true;
			}),
		}),
		defineField({
			name: "page",
			type: "lessComplexPageBuilder",
			title: "Page",
			description: descriptionConfig.page("Listing"),
			hidden: ({ document }) => document?._id?.replace("drafts.", "") !== "homepage",
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
				title: title || undefined,
				subtitle:
					id === "homepage" ? "Homepage"
					: id === "projectsListing" ? "Projects Listing"
					: id === "publicationsListing" ? "Publications Listing"
					: id === "pressListing" ? "Press Listing"
					: undefined,
				media:
					id === "homepage" ? HomeIcon
					: id === "projectsListing" ? PROJECT_ICON
					: id === "publicationsListing" ? PUBLICATION_ICON
					: id === "pressListing" ? PRESS_ICON
					: undefined
			};
		},
	},
});