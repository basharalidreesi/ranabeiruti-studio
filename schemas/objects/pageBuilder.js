import { defineArrayMember, defineField, defineType } from "sanity";
import { BlockElementIcon, HeartFilledIcon, InlineElementIcon } from "@sanity/icons";
import { PageBuilderColumnItem, StarFilledIcon } from "../../components";
import { portableTextConfig } from "../../util";

const RATIO_AND_VERTICAL_ALIGNMENT = [
	defineField({
		name: "ratio",
		type: "ratio",
		title: "Ratio",
		description: "",
	}),
	defineField({
		name: "verticalAlignment",
		type: "verticalAlignment",
		title: "Vertical Alignment",
		description: "",
	}),
];
const SPACER = [
	defineArrayMember({
		name: "column",
		type: "object",
		title: "Spacer",
		icon: InlineElementIcon,
		fields: [
			...RATIO_AND_VERTICAL_ALIGNMENT,
		],
		preview: {
			prepare() {
				return {
					title: "Spacer",
					subtitle: "Column",
				};
			},
		},
		components: {
			item: PageBuilderColumnItem,
		},
	}),
];
const DEFAULT_COLUMN_COUNT = 1;
const HOW_MANY_COLUMNS = (prefix = "") => ({
	select: {
		col0: "columns.[0]",
		col1: "columns.[1]",
		col2: "columns.[2]",
		col3: "columns.[3]",
		col4: "columns.[4]",
		col5: "columns.[5]",
	},
	prepare(selection) {
		const {
			col0,
			col1,
			col2,
			col3,
			col4,
			col5,
		} = selection;
		const colCount = [col0, col1, col2, col3, col4]?.filter(Boolean)?.length;
		return {
			title: colCount + (col5 ? "+" : "") + " " + (colCount === 1 ? "Column" : "Columns"),
			subtitle: `${prefix ? prefix + " " : ""}Row`,
		};
	},
});

export default defineType({
	name: "pageBuilder",
	type: "object",
	title: "Page Builder",
	description: "",
	fields: [
		defineField({
			name: "header",
			type: "array",
			title: "Header",
			description: "",
			of: [
				defineArrayMember({
					name: "row",
					type: "object",
					title: "Row",
					icon: BlockElementIcon,
					fields: [
						defineField({
							name: "columns",
							type: "array",
							title: "Columns",
							description: "",
							of: [
								...SPACER,
								defineArrayMember({
									name: "title",
									type: "object",
									title: "Title Placeholder",
									icon: StarFilledIcon,
									fields: [
										...RATIO_AND_VERTICAL_ALIGNMENT,
									],
									preview: {
										prepare() {
											return {
												title: "[Title]",
												subtitle: "Placeholder",
											};
										},
									},
									components: {
										item: PageBuilderColumnItem,
									},
								}),
								defineArrayMember({
									name: "image_",
									type: "object",
									title: "Main Image Placeholder",
									icon: HeartFilledIcon,
									fieldsets: [
										{
											name: "caption",
											title: "Caption",
										},
									],
									fields: [
										...RATIO_AND_VERTICAL_ALIGNMENT,
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
									],
									preview: {
										prepare() {
											return {
												title: "[Main Image]",
												subtitle: "Placeholder",
											};
										},
									},
									components: {
										item: PageBuilderColumnItem,
									},
								}),
							],
							// initialValue: Array.from({length: DEFAULT_COLUMN_COUNT}, () => ({
							// 	_type: "column",
							// })),
							validation: (Rule) => Rule.required().min(1),
							// components config
						}),
						defineField({
							name: "doesBreakout",
							type: "boolean",
							title: "Breakout row?",
							description: "",
							options: {
								layout: "checkbox",
							},
							initialValue: false,
						}),
					],
					preview: HOW_MANY_COLUMNS("Header"),
				}),
			],
			validation: (Rule) => Rule.custom((value) => {
				const rowsWithTitles = (value || [])?.find((item) => item._type === "row" && item.columns?.find((subitem) => subitem._type === "title"));
				if (!rowsWithTitles) { return "Must include at least one title placeholder"; };
				return true;
			}),
		}),
		defineField({
			name: "doesIncludeDescription",
			type: "boolean",
			title: "Include project blurb?",
			description: "",
			options: {
				layout: "checkbox",
			},
			initialValue: true,
		}),
		defineField({
			name: "doesIncludeCollections",
			type: "boolean",
			title: "Include collection blurbs (if applicable)?",
			description: "",
			options: {
				layout: "checkbox",
			},
			initialValue: true,
		}),
		defineField({
			name: "body",
			type: "array",
			title: "Body",
			description: "",
			of: [
				defineArrayMember({
					name: "row",
					type: "object",
					title: "Row",
					icon: BlockElementIcon,
					fields: [
						defineField({
							name: "columns",
							type: "array",
							title: "Columns",
							description: "",
							of: [
								defineArrayMember({
									name: "column",
									type: "object",
									title: "Column",
									icon: InlineElementIcon,
									fields: [
										RATIO_AND_VERTICAL_ALIGNMENT[0],
										defineField({
											name: "content",
											type: "multimediaPortableText",
											title: "Content",
											description: "",
										}),
										RATIO_AND_VERTICAL_ALIGNMENT[1],
									],
									preview: {
										select: {
											content: "content",
										},
										prepare(selection) {
											const { content } = selection;
											return {
												title: portableTextConfig.renderAsPlainText(content),
												subtitle: "Column",
											};
										},
									},
									components: {
										item: PageBuilderColumnItem,
									},
								}),
							],
							initialValue: Array.from({length: DEFAULT_COLUMN_COUNT}, () => ({
								_type: "column",
							})),
							validation: (Rule) => Rule.required().min(1),
							// components config
						}),
						defineField({
							name: "doesBreakout",
							type: "boolean",
							title: "Breakout row?",
							description: "",
							options: {
								layout: "checkbox",
							},
							initialValue: false,
						}),
					],
					preview: HOW_MANY_COLUMNS("Body"),
				}),
			],
			validation: (Rule) => Rule.required().min(1),
		}),
		defineField({
			name: "doesIncludeCredits",
			type: "boolean",
			title: "Include credits?",
			description: "",
			options: {
				layout: "checkbox",
			},
			initialValue: true,
		}),
		defineField({
			name: "doesIncludeRelatedProjects",
			type: "boolean",
			title: "Include related projects?",
			description: "",
			options: {
				layout: "checkbox",
			},
			initialValue: true,
		}),
		defineField({
			name: "doesIncludeRelatedNews",
			type: "boolean",
			title: "Include related news?",
			description: "",
			options: {
				layout: "checkbox",
			},
			initialValue: true,
		}),
		defineField({
			name: "doesIncludeRelatedPress",
			type: "boolean",
			title: "Include related press?",
			description: "",
			options: {
				layout: "checkbox",
			},
			initialValue: true,
		}),
	],
	// components config
});