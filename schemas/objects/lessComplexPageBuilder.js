import { defineArrayMember, defineField, defineType } from "sanity";
import { BlockElementIcon, InlineElementIcon } from "@sanity/icons";
import { PageBuilderColumnItem, PageBuilderRowItem } from "../../components";
import { portableTextConfig } from "../../util";

export default defineType({
	name: "lessComplexPageBuilder",
	type: "object",
	title: "Less Complex Page Builder",
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
											type: "lessComplexPortableText",
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
							initialValue: false,
						}),
						defineField({
							name: "isEnabled",
							type: "boolean",
							title: "Enable row?",
							description: "",
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
				return true;
			}),
		}),
	],
});