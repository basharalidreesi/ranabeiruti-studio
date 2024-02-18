import { defineArrayMember, defineField, defineType } from "sanity";
import { PageBuilderColumnItem, PageBuilderRowItem } from "../../components";
import { portableTextConfig } from "../../util";
import { BODY_DESCRIPTION, COLUMNS_DESCRIPTION, COLUMN_ICON, DOES_BREAKOUT_DESCRIPTION, IS_ENABLED_DESCRIPTION, RATIO_DESCRIPTION, ROW_ICON, VERTICAL_ALIGNMENT_DESCRIPTION } from "./complexPageBuilder";

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
			description: BODY_DESCRIPTION,
			of: [
				defineArrayMember({
					name: "row",
					type: "object",
					title: "Row",
					icon: ROW_ICON,
					fields: [
						defineField({
							name: "columns",
							type: "array",
							title: "Columns",
							description: COLUMNS_DESCRIPTION,
							of: [
								defineArrayMember({
									name: "column",
									type: "object",
									title: "Column",
									icon: COLUMN_ICON,
									fields: [
										defineField({
											name: "ratio",
											type: "ratio",
											title: "Ratio",
											description: RATIO_DESCRIPTION,
										}),
										defineField({
											name: "content",
											type: "lessComplexPortableText",
											title: "Content",
											description: "The content of this column. This can include text, images, code objects (such as video embeds), callouts, buttons, and vertical spacers. This field is optional.",
										}),
										defineField({
											name: "verticalAlignment",
											type: "verticalAlignment",
											title: "Vertical Alignment",
											description: VERTICAL_ALIGNMENT_DESCRIPTION,
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
							/** @ts-ignore */
							validation: (Rule) => Rule.required().min(1),
						}),
						defineField({
							name: "doesBreakout",
							type: "boolean",
							title: "Breakout row?",
							description: DOES_BREAKOUT_DESCRIPTION,
							options: {
								layout: "checkbox",
							},
							initialValue: false,
						}),
						defineField({
							name: "isEnabled",
							type: "boolean",
							title: "Enable row?",
							description: IS_ENABLED_DESCRIPTION,
							options: {
								layout: "checkbox",
							},
							initialValue: true,
						}),
					],
					validation: (Rule) => Rule.custom((value) => value?.isEnabled ? true : "This row will not be rendered").warning(),
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
			/** @ts-ignore */
			validation: (Rule) => Rule.custom((value) => {
				if (!value || value.length === 0) { return "Required"; };
				return true;
			}),
		}),
	],
});