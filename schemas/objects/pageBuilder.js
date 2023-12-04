import { defineArrayMember, defineField, defineType } from "sanity";
import { BlockElementIcon, InlineElementIcon } from "@sanity/icons";
import { PageBuilderColumnItem } from "../../components";
import { portableTextConfig } from "../../util";

export default defineType({
	name: "pageBuilder",
	type: "object",
	title: "Page Builder",
	description: "",
	fields: [
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
										defineField({
											name: "ratio",
											type: "ratio",
											title: "Ratio",
											description: "",
										}),
										defineField({
											name: "content",
											type: "multimediaPortableText",
											title: "Content",
											description: "",
										}),
										defineField({
											name: "verticalAlignment",
											type: "verticalAlignment",
											title: "Vertical Alignment",
											description: "",
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
							description: "",
							options: {
								layout: "checkbox",
							},
							validation: (Rule) => Rule.required(),
							initialValue: false,
						}),
					],
					preview: {
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
								subtitle: "Body Row",
							};
						},
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
			description: "",
			options: {
				layout: "checkbox",
			},
			validation: (Rule) => Rule.required(),
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
			validation: (Rule) => Rule.required(),
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
			validation: (Rule) => Rule.required(),
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
			validation: (Rule) => Rule.required(),
			initialValue: true,
		}),
	],
});