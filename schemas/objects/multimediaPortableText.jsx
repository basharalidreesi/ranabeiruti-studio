import { defineArrayMember, defineField, defineType } from "sanity";
import { embedObjectConfig, imageConfig, portableTextConfig } from "../../util";
import { ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, ArrowUpIcon, ChevronDownIcon, ChevronUpIcon, CubeIcon, DoubleChevronDownIcon, DoubleChevronLeftIcon, DoubleChevronRightIcon, DoubleChevronUpIcon, ImageIcon, InsertAboveIcon, InsertBelowIcon, SelectIcon } from "@sanity/icons";
import { EmbedObjectPreview, LimitedFileInput, StringSelect } from "../../components";

const styles = [
	portableTextConfig.styles.normal,
	portableTextConfig.styles.h3,
	portableTextConfig.styles.blockquote,
	portableTextConfig.styles.note,
	// portableTextConfig.styles.hidden,
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
			fields: [
				defineField({
					name: "caption",
					type: "simplePortableText",
					title: "Caption",
					description: "",
				}),
				defineField({
					name: "captionPlacement",
					type: "string",
					title: "Caption Placement",
					description: "",
					options: {
						list: [
							{
								value: "left",
								title: "Place left",
								// icon: ArrowLeftIcon,
							},
							{
								value: "top",
								title: "Place above",
								// icon: ArrowUpIcon,
							},
							{
								value: "right",
								title: "Place right",
								// icon: ArrowRightIcon,
							},
							{
								value: "bottom",
								title: "Place below",
								// icon: ArrowDownIcon,
							},
						],
						layout: "radio",
						direction: "horizontal",
					},
					initialValue: "bottom",
					validation: (Rule) => Rule.required(),
					components: {
						field: (props) => {
							return (<>
								<div style={{
									marginTop: "-1.5rem",
								}}>
									{props.renderDefault({
										...props,
										title: "",
									})}
								</div>
							</>);
						},
						// input: StringSelect,
					},
				}),
				defineField({
					name: "captionVerticalAlignment",
					type: "string",
					title: "Caption Vertical Alignment",
					description: "",
					options: {
						list: [
							{
								value: "top",
								title: "Align to top",
								// icon: ChevronUpIcon,
							},
							{
								value: "middle",
								title: "Align with middle",
								// icon: SelectIcon,
							},
							{
								value: "bottom",
								title: "Align to bottom",
								// icon: ChevronDownIcon,
							},
						],
						layout: "radio",
						direction: "horizontal",
					},
					initialValue: "top",
					readOnly: ({ parent }) => !["left", "right"].includes(parent?.captionPlacement),
					validation: (Rule) => Rule.required(),
					components: {
						field: (props) => {
							return (<>
								<div style={{
									marginTop: "-1.5rem",
								}}>
									{props.renderDefault({
										...props,
										title: "",
									})}
								</div>
							</>);
						},
						// input: StringSelect,
					},
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
				// input: LimitedFileInput,
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
					hidden: true,
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					name: "url",
					type: "url",
					title: "URL",
					description: "",
					placeholder: `Valid ${embedObjectConfig.listOfSupportedHosts()} link`,
					hidden: ({ parent }) => parent?.type !== "url",
					validation: (Rule) => Rule.custom((value, context) => {
						if (!value && context?.parent?.type === "url") { return "Required"; };
						// return embedObjectConfig.validateOEmbed(value);
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
				preview: EmbedObjectPreview,
			},
		}),
	],
	// components: {
	// 	field: portableTextConfig.components.field,
	// },
});