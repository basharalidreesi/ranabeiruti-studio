import { defineArrayMember, defineField, defineType } from "sanity";
import { embedConfig, imageConfig, portableTextConfig } from "../../util";
import { CubeIcon, ImageIcon } from "@sanity/icons";
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
					type: "string",
					title: "Vertical Alignment",
					description: "",
					options: {
						list: [
							{
								value: "top",
								title: "Align to top",
							},
							{
								value: "middle",
								title: "Align with middle",
							},
							{
								value: "bottom",
								title: "Align to bottom",
							},
						],
						layout: "radio",
						direction: "horizontal",
					},
					initialValue: "top",
					readOnly: ({ parent }) => !["left", "right"].includes(parent?.captionPlacement),
					validation: (Rule) => Rule.required(),
					fieldset: "caption",
				}),
			],
			options: imageConfig.options,
			validation: (Rule) => Rule.custom((value) => {
				if (!value?.asset) { return "Required"; };
				return true;
			}),
			preview: {
				select: {
					asset: "asset",
					caption: "caption",
				},
				prepare(selection) {
					const {
						asset,
						caption
					} = selection;
					return {
						title: portableTextConfig.renderAsPlainText(caption) || null,
						subtitle: "Image",
						media: asset || null,
					};
				},
			},
			components: {
				preview: (props) => props.renderDefault({
					...props,
					layout: "block",
				}),
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