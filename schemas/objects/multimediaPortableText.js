import { defineArrayMember, defineField, defineType, useFormValue } from "sanity";
import { embedConfig, imageConfig, portableTextConfig, stringConfig } from "../../util";
import { CubeIcon, ImageIcon, StarIcon } from "@sanity/icons";
import { EmbedPreview } from "../../components";

const styles = [
	portableTextConfig.styles.normal,
	portableTextConfig.styles.h3,
	portableTextConfig.styles.blockquote,
	portableTextConfig.styles.note,
];

const lists = [
	portableTextConfig.lists.bullets,
	portableTextConfig.lists.numbers,
];

const decorators = [
	portableTextConfig.decorators.strong,
	portableTextConfig.decorators.em,
	portableTextConfig.decorators.underline,
	portableTextConfig.decorators.strikeThrough,
	portableTextConfig.decorators.sup,
];

const annotations = [
	portableTextConfig.annotations.link,
];

export default defineType({
	name: "multimediaPortableText",
	type: "array",
	title: "Multimedia Portable Text",
	description: "",
	of: [
		defineArrayMember({
			type: "block",
			styles: styles,
			lists: lists,
			marks: {
				decorators: decorators,
				annotations: annotations,
			},
		}),
		defineArrayMember({
			name: "title", // `portableTextConfig.renderAsPlainText` will break if `name` is changed
			type: "object",
			title: "Title",
			icon: StarIcon,
			fields: [
				defineField({
					name: "title", // `portableTextConfig.renderAsPlainText` will break if `name` is changed
					type: "string",
					title: "Title",
					description: "",
					readOnly: ({ parent }) => parent?.isUsedAsPlaceholder,
					validation: (Rule) => Rule.custom((value, context) => {
						if (context?.parent?.isUsedAsPlaceholder === true) { return true; };
						return stringConfig.requireString(value);
					}),
					components: {
						input: (props) => {
							const title = useFormValue(["title"]) || "";
							const isUsedAsPlaceholder = useFormValue([...props.path.slice(0, -1), "isUsedAsPlaceholder"]) || false;
							return props.renderDefault({
								...props,
								elementProps: {
									...props.elementProps,
									value: isUsedAsPlaceholder ? title : props.elementProps.value,
									placeholder: isUsedAsPlaceholder ? "Document title" : props.elementProps.placeholder,
								},
							});
						},
					},
				}),
				defineField({
					name: "subtitle", // `portableTextConfig.renderAsPlainText` will break if `name` is changed
					type: "string",
					title: "Subtitle",
					description: "",
					readOnly: ({ parent }) => parent?.isUsedAsPlaceholder,
					components: {
						input: (props) => {
							const subtitle = useFormValue(["subtitle"]) || "";
							const isUsedAsPlaceholder = useFormValue([...props.path.slice(0, -1), "isUsedAsPlaceholder"]) || false;
							return props.renderDefault({
								...props,
								elementProps: {
									...props.elementProps,
									value: isUsedAsPlaceholder ? subtitle : props.elementProps.value,
									placeholder: isUsedAsPlaceholder ? "Document subtitle" : props.elementProps.placeholder,
								},
							});
						},
					},
				}),
				defineField({
					name: "isUsedAsPlaceholder", // `portableTextConfig.renderAsPlainText` will break if `name` is changed
					type: "boolean",
					title: "Use document title and subtitle?",
					description: "",
					options: {
						layout: "checkbox",
					},
					initialValue: false,
				}),
			],
			preview: {
				select: {
					itemTitle: "title",
					itemSubtitle: "subtitle",
					isUsedAsPlaceholder: "isUsedAsPlaceholder",
				},
			},
			components: {
				preview: (props) => {
					const {
						itemTitle,
						itemSubtitle,
						isUsedAsPlaceholder,
					} = props;
					const documentTitle = useFormValue(["title"]) || "";
					const documentSubtitle = useFormValue(["subtitle"]) || "";
					const resolvedTitle = isUsedAsPlaceholder ? documentTitle : itemTitle;
					const resolvedSubtitle = isUsedAsPlaceholder ? documentSubtitle : itemSubtitle;
					return props.renderDefault({
						...props,
						title: resolvedTitle ? `${resolvedTitle}${resolvedSubtitle ? `: ${resolvedSubtitle}` : ""}` : "",
						subtitle: isUsedAsPlaceholder ? "Document Title" : "Title",
					});
				},
			},
		}),
		defineArrayMember({
			name: "image", // `portableTextConfig.renderAsPlainText` will break if `name` is changed
			type: "image",
			title: "Image",
			icon: ImageIcon,
			fieldsets: [
				{
					name: "caption",
					title: "Caption",
				},
			],
			fields: [
				defineField({
					name: "caption", // `portableTextConfig.renderAsPlainText` will break if `name` is changed
					type: "simplePortableText",
					title: "Text",
					description: "",
					hidden: ({ parent }) => parent?.isUsedAsPlaceholder,
					readOnly: ({ parent }) => parent?.isUsedAsPlaceholder,
					fieldset: "caption",
				}),
				defineField({
					name: "captionPlacement",
					type: "string",
					title: "Placement",
					description: "",
					options: {
						list: [
							{
								value: "left",
								title: "Place left",
							},
							{
								value: "top",
								title: "Place above",
							},
							{
								value: "right",
								title: "Place right",
							},
							{
								value: "bottom",
								title: "Place below",
							},
						],
						layout: "radio",
						direction: "horizontal",
					},
					initialValue: "bottom",
					validation: (Rule) => Rule.required(),
					fieldset: "caption",
				}),
				defineField({
					name: "captionVerticalAlignment",
					type: "verticalAlignment",
					title: "Vertical Alignment",
					description: "",
					readOnly: ({ parent }) => !["left", "right"].includes(parent?.captionPlacement),
					fieldset: "caption",
				}),
				defineField({
					name: "isUsedAsPlaceholder", // `portableTextConfig.renderAsPlainText` will break if `name` is changed
					type: "boolean",
					title: "Use document main image?",
					description: "",
					options: {
						layout: "checkbox",
					},
					initialValue: false,
				}),
			],
			options: imageConfig.options,
			validation: (Rule) => Rule.custom((value) => {
				if (value?.isUsedAsPlaceholder === true) { return true; };
				if (!value?.asset) { return "Required"; };
				return true;
			}),
			preview: {
				select: {
					itemAsset: "asset",
					itemCaption: "caption",
					isUsedAsPlaceholder: "isUsedAsPlaceholder",
				},
			},
			components: {
				input: (props) => {
					const isUsedAsPlaceholder = props.value?.isUsedAsPlaceholder || false;
					return props.renderDefault({
						...props,
						readOnly: isUsedAsPlaceholder ? true : props.readOnly,
						members: isUsedAsPlaceholder ? [...props.members?.filter((member) => member.name !== "asset")] : [...props.members],
					});
				},
				preview: (props) => {
					const documentImage = useFormValue(["image"]) || null;
					const {
						itemAsset,
						itemCaption,
						isUsedAsPlaceholder = false,
					} = props;
					return props.renderDefault({
						...props,
						title: isUsedAsPlaceholder
							? (documentImage?.caption ? portableTextConfig.renderAsPlainText(documentImage?.caption) : "")
							: (itemCaption ? portableTextConfig.renderAsPlainText(itemCaption) : ""),
						subtitle: isUsedAsPlaceholder ? "Document Image" : "Image",
						media: isUsedAsPlaceholder
							? (documentImage?.asset ? documentImage?.asset : ImageIcon)
							: (itemAsset ? itemAsset : ImageIcon),
						layout: "block",
					});
				},
			},
		}),
		defineArrayMember({
			name: "embed", // `portableTextConfig.renderAsPlainText` will break if `name` is changed
			type: "object",
			title: "Object",
			icon: CubeIcon,
			fields: [
				defineField({
					name: "type", // `portableTextConfig.renderAsPlainText` will break if `name` is changed
					type: "string",
					title: "Type",
					description: "",
					options: {
						list: [
							{
								value: "url", // `portableTextConfig.renderAsPlainText` will break if `value` is changed
								title: "URL",
							},
							{
								value: "code", // `portableTextConfig.renderAsPlainText` will break if `value` is changed
								title: "Code",
							},
						],
						layout: "radio",
						direction: "horizontal",
					},
					initialValue: "url",
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					name: "url", // `portableTextConfig.renderAsPlainText` will break if `name` is changed
					type: "url",
					title: "URL",
					description: "",
					placeholder: `Valid ${embedConfig.listOfSupportedHosts()} link`,
					hidden: ({ parent }) => parent?.type !== "url",
					validation: (Rule) => Rule.custom((value, context) => {
						if (!value && context?.parent?.type === "url") { return "Required"; };
						// return embedConfig.validateOEmbed(value);
						return true;
					}),
					// components config
				}),
				defineField({
					name: "code", // `portableTextConfig.renderAsPlainText` will break if `name` is changed
					type: "text",
					title: "Code",
					description: "",
					hidden: ({ parent }) => parent?.type !== "code",
					// components config
				}),
			],
			preview: {
				select: {
					type: "type",
					url: "url",
					code: "code",
				},
			},
			components: {
				preview: EmbedPreview,
			},
		}),
	],
});