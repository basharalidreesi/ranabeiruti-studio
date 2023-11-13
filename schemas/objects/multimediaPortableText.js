import { defineArrayMember, defineField, defineType } from "sanity";
import { embedConfig, imageConfig, portableTextConfig } from "../../util";
import { CubeIcon, HeartFilledIcon, ImageIcon } from "@sanity/icons";
import { EmbedPreview } from "../../components";

const styles = [
	portableTextConfig.styles.normal,
	portableTextConfig.styles.h2,
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
			name: "image",
			type: "image",
			title: "Image",
			icon: ImageIcon,
			fieldsets: [
				{
					name: "caption",
					title: "Caption",
					hidden: ({ parent }) => !parent?.asset && !parent?.isUsedAsPlaceholder,
				},
			],
			fields: [
				defineField({
					name: "caption",
					type: "simplePortableText",
					title: "Text",
					description: "",
					hidden: ({ parent }) => parent?.isUsedAsPlaceholder,
					readOnly: ({ parent }) => parent?.isUsedAsPlaceholder,
					fieldset: "caption",
				}),
				defineField({
					name: "captionPlacement",
					type: "placement",
					title: "Placement",
					description: "",
					fieldset: "caption",
				}),
				defineField({
					name: "imageRatio",
					type: "ratio",
					title: "Image Ratio",
					description: "",
					hidden: ({ parent }) => !["left", "right"].includes(parent?.captionPlacement),
					fieldset: "caption",
				}),
				defineField({
					name: "captionRatio",
					type: "ratio",
					title: "Caption Ratio",
					description: "",
					hidden: ({ parent }) => !["left", "right"].includes(parent?.captionPlacement),
					fieldset: "caption",
				}),
				defineField({
					name: "captionVerticalAlignment",
					type: "verticalAlignment",
					title: "Vertical Alignment",
					description: "",
					hidden: ({ parent }) => !["left", "right"].includes(parent?.captionPlacement),
					fieldset: "caption",
				}),
				defineField({
					name: "isUsedAsPlaceholder",
					type: "boolean",
					title: "Use document main image and caption?",
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
					asset: "asset",
					caption: "caption",
					isUsedAsPlaceholder: "isUsedAsPlaceholder",
				},
				// `prepare()` removed for `components.preview`
			},
			components: {
				input: (props) => {
					const isUsedAsPlaceholder = props.value?.isUsedAsPlaceholder || false;
					return props.renderDefault({
						...props,
						readOnly: isUsedAsPlaceholder ? true : props.readOnly,
						members: isUsedAsPlaceholder ? [...props.members?.filter((member) => member.name !== "asset")] : props.members,
					});
				},
				preview: (props) => {
					const {
						asset,
						caption,
						isUsedAsPlaceholder = false,
					} = props;
					return props.renderDefault({
						...props,
						title: isUsedAsPlaceholder ? "[Document Image]" : portableTextConfig.renderAsPlainText(caption),
						subtitle: isUsedAsPlaceholder ? "Placeholder" : "Image",
						media: isUsedAsPlaceholder ? HeartFilledIcon : (asset ? asset : ImageIcon),
						layout: "block",
					});
				},
			},
		}),
		defineArrayMember({
			name: "embed",
			type: "object",
			title: "Object",
			icon: CubeIcon,
			fields: [
				defineField({
					name: "type",
					type: "string",
					title: "Type",
					description: "",
					options: {
						list: [
							{
								value: "url",
								title: "URL",
							},
							{
								value: "code",
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
					name: "url",
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
					name: "code",
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