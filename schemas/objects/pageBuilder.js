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
											type: "complexPortableText",
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
							columns: "columns",
						},
						prepare(selection) {
							const {
								columns = [],
							} = selection;
							const firstColumnWithContent = columns.find((column) => column.content && column.content.length !== 0);
							return {
								title: firstColumnWithContent ? portableTextConfig.renderAsPlainText(firstColumnWithContent.content) : null,
								subtitle: `Row with ${columns.length} ${columns.length === 1 ? "column" : "columns"}`,
							};
						},
					},
				}),
			],
			validation: (Rule) => Rule.custom((value, context) => {
				if (!value || value.length === 0) { return "Required"; };
				const rowsWithTitles = (value || [])?.find((row) => row._type === "row" && row.columns?.find((column) => column._type === "column" && column.content && column.content.find((item) => item._type === "title")));
				if (!rowsWithTitles && ["project", "publication"].includes(context.document._type)) { return "Must include at least one title placeholder"; };
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
			hidden: ({ document }) => !["project", "publication"].includes(document._type),
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
			hidden: ({ document }) => !["project", "publication"].includes(document._type),
			initialValue: true,
		}),
		defineField({
			name: "doesIncludeRelatedPublications",
			type: "boolean",
			title: "Include related publications?",
			description: "",
			options: {
				layout: "checkbox",
			},
			hidden: ({ document }) => !["project", "publication"].includes(document._type),
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
			hidden: true,
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
			hidden: true,
			initialValue: true,
		}),
	],
});