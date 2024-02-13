import { defineArrayMember, defineField, defineType } from "sanity";
import { BlockElementIcon, InlineElementIcon } from "@sanity/icons";
import { PageBuilderColumnItem, PageBuilderRowItem } from "../../components";
import { portableTextConfig } from "../../util";

export default defineType({
	name: "complexPageBuilder",
	type: "object",
	title: "Complex Page Builder",
	fields: [
		defineField({
			name: "body",
			type: "array",
			title: "Body",
			description: "An array representing the body of the page. Allows for the creation of complex page layouts consisting of multiple rows, each containing one or more columns of differing width ratios. Each row can be enabled or disabled, and breakout (full-width) rows can be specified. This field is required. At least one row is required, and at least one title placeholder must be included.",
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
							description: "An array representing the columns within this row, each with a defined width ratio and vertical alignment. The content within each column can include various elements such as text, images, and other components. This field is required. At least one column must be added.",
							of: [
								defineArrayMember({
									name: "column",
									type: "object",
									title: "Column",
									icon: InlineElementIcon,
									fields: [
										defineField({
											name: "ratio",
											type: "ratio",
											title: "Ratio",
											description: "Specifies the width ratio of this column relative to others in the same row. This field is required and has a minimum value of 1. Fraction values are allowed.",
										}),
										defineField({
											name: "content",
											type: "complexPortableText",
											title: "Content",
											description: "The content of this column. This can include text, images, code objects (such as video embeds), callouts, buttons, vertical spacers, and title and blurb placeholders. This field is optional.",
										}),
										defineField({
											name: "verticalAlignment",
											type: "verticalAlignment",
											title: "Vertical Alignment",
											description: "Specifies the vertical alignment of this column relative to others in the same row. This field is required. Default value: Top",
										}),
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
							initialValue: [{ _type: "column", }],
							validation: (Rule) => Rule.required().min(1),
						}),
						defineField({
							name: "doesBreakout",
							type: "boolean",
							title: "Breakout row?",
							description: "Specifies whether this row should break out of the regular layout constraints and occupy the full width of the page. This field is required. Default state: False.",
							options: {
								layout: "checkbox",
							},
							initialValue: false,
						}),
						defineField({
							name: "isEnabled",
							type: "boolean",
							title: "Enable row?",
							description: "Specifies whether this row should be enabled or disabled. Disabled rows will not appear on the page. This field is required. Default state: True.",
							options: {
								layout: "checkbox",
							},
							initialValue: true,
						}),
					],
					validation: (Rule) => Rule.custom((value) => value.isEnabled ? true : "This row will not be rendered").warning(),
					preview: {
						select: {
							columns: "columns",
							isEnabled: "isEnabled",
						},
						prepare(selection) {
							const {
								columns = [],
								isEnabled,
							} = selection;
							const firstColumnWithContent = columns.find((column) => column.content && column.content.length !== 0);
							return {
								title: firstColumnWithContent ? portableTextConfig.renderAsPlainText(firstColumnWithContent.content) : null,
								subtitle: `${isEnabled ? "Row" : "Hidden row"} with ${columns.length} ${columns.length === 1 ? "column" : "columns"}`,
							};
						},
					},
					components: {
						item: PageBuilderRowItem,
					},
				}),
			],
			validation: (Rule) => Rule.custom((value) => {
				if (!value || value.length === 0) { return "Required"; };
				const rowsWithTitles = (value || [])?.find((row) => row._type === "row" && row.columns?.find((column) => column._type === "column" && column.content && column.content.find((item) => item._type === "title")));
				if (!rowsWithTitles) { return "Must include at least one title placeholder"; };
				return true;
			}),
		}),
		defineField({
			name: "doesIncludeCredits",
			type: "boolean",
			title: "Include credits?",
			description: "Specifies whether to include credits in the page layout. This field is required. Default state: True.",
			options: {
				layout: "checkbox",
			},
			initialValue: true,
		}),
		defineField({
			name: "doesIncludeRelatedProjects",
			type: "boolean",
			title: "Include related projects?",
			description: "Specifies whether to include this Project's related Projects in the page layout. This field is required. Default state: True.",
			options: {
				layout: "checkbox",
			},
			initialValue: true,
		}),
		defineField({
			name: "doesIncludeRelatedPublications",
			type: "boolean",
			title: "Include related publications?",
			description: "Specifies whether to include this Project's related Publications in the page layout. This field is required. Default state: True.",
			options: {
				layout: "checkbox",
			},
			initialValue: true,
		}),
		defineField({
			name: "doesIncludeRelatedNews",
			type: "boolean",
			title: "Include related news?",
			description: "Specifies whether to include this Project's related News items in the page layout. This field is required. Default state: True.",
			options: {
				layout: "checkbox",
			},
			hidden: true,
			initialValue: true,
		}),
		defineField({
			name: "doesIncludeRelatedPress",
			type: "boolean",
			title: "Include related press?",
			description: "Specifies whether to include this Project's related Press items in the page layout. This field is required. Default state: True.",
			options: {
				layout: "checkbox",
			},
			hidden: true,
			initialValue: true,
		}),
	],
});