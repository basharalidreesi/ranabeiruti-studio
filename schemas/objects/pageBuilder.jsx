import { Badge, Box, Card, Flex, Text } from "@sanity/ui"
import { defineArrayMember, defineField, defineType } from "sanity";
import { NumberSelect, StringSelect } from "../../components";
import { ChevronUpIcon } from "@sanity/icons";
import { ChevronDownIcon } from "@sanity/icons";
import { SelectIcon } from "@sanity/icons";
import { portableTextConfig } from "../../util";

const minColumnCount = 1;
const maxColumnCount = 3;
const columnArray = Array.from({ length: maxColumnCount - minColumnCount + 1 }, (_, index) => minColumnCount + index);

export default defineType({
	name: "pageBuilder",
	type: "array",
	title: "Page Builder",
	description: "",
	of: [
		defineArrayMember({
			name: "segment",
			type: "object",
			title: "Body Segment",
			fieldsets: [
				{
					name: "columnSetup",
					title: "Setup",
					options: {
						collapsible: true,
						collapsed: true,
					},
				},
				...columnArray.map((column) => {
					return {
						name: `col${column}`,
						title: `Column ${column}`,
						options: {
							collapsible: true,
							collapsed: true,
						},
					};
				}),
			],
			fields: [
				defineField({
					name: "columnCount",
					type: "number",
					title: "Count",
					description: "",
					options: {
						list: columnArray,
						layout: "radio",
						direction: "horizontal",
					},
					initialValue: 1,
					validation: (Rule) => Rule.required().min(minColumnCount).max(maxColumnCount),
					components: {
						input: NumberSelect,
					},
					fieldset: "columnSetup",
				}),
				...columnArray.map((column) => {
					return defineField({
						name: `col${column}Ratio`,
						type: "number",
						title: `Column ${column} Ratio`,
						description: "",
						initialValue: 1,
						hidden: column === minColumnCount ? (({ parent }) => parent?.columnCount === minColumnCount) : ({ parent }) => parent?.columnCount < column,
						validation: (Rule) => Rule.custom((value, context) => {
							if (context?.parent?.columnCount && context?.parent?.columnCount === minColumnCount) { return true; };
							if (context?.parent?.columnCount && context?.parent?.columnCount < column) { return true; };
							if (value && value <= 0) { return "Must be a positive number"; };
							if (!value) { return "Required"; };
							return true;
						}),
						components: {
							field: (props) => {
								const Title = (
									<Text size={1} weight={"semibold"} style={{
										width: "100%",
										marginBottom: "-0.25rem",
									}}>
										Ratios
									</Text>
								);
								const Field = (
									<Card className={`rb-pageBuilder-columnRatioInput`} flex={Math.max(props?.value, 1) || 1}>
										{props.renderDefault({
											...props,
											title: "",
										})}
									</Card>
								);
								return column === minColumnCount
									? (<>
										{Title}
										{Field}
									</>)
									: (<>
										{Field}
									</>);
							},
						},
						fieldset: "columnSetup",
					});
				}),
				...columnArray.flatMap((column) => {
					return [
						defineField({
							name: `col${column}Body`,
							type: "multimediaPortableText",
							title: `Column ${column}`,
							description: "",
							hidden: ({ parent }) => parent?.columnCount < column,
							fieldset: `col${column}`,
						}),
						defineField({
							name: `col${column}VerticalAlignment`,
							type: "string",
							title: `Column ${column} Vertical Alignment`,
							description: "",
							options: {
								list: [
									{
										value: "top",
										title: "Align to top",
										icon: ChevronUpIcon,
									},
									{
										value: "middle",
										title: "Align with middle",
										icon: SelectIcon,
									},
									{
										value: "bottom",
										title: "Align to bottom",
										icon: ChevronDownIcon,
									},
								],
								layout: "radio",
								direction: "horizontal",
							},
							initialValue: "top",
							hidden: ({ parent }) => (column === minColumnCount && parent?.columnCount === minColumnCount) || parent?.columnCount < column,
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
								input: StringSelect,
							},
							fieldset: `col${column}`,
						}),
					];
				}),
			],
			preview: {
				select: {
					columnCount: "columnCount",
					col1Ratio: "col1Ratio",
					col2Ratio: "col2Ratio",
					col3Ratio: "col3Ratio",
					col1Body: "col1Body",
					col2Body: "col2Body",
					col3Body: "col3Body",
				},
			},
			components: {
				preview: (props) => {
					const {
						columnCount,
						col1Ratio,
						col2Ratio,
						col3Ratio,
						col1Body,
						col2Body,
						col3Body,
					} = props;
					const title =
						col1Body && columnCount >= 1 ? portableTextConfig.renderAsPlainText(col1Body) : null
						|| col2Body && columnCount >= 2 ? portableTextConfig.renderAsPlainText(col2Body) : null
						|| col3Body && columnCount >= 3 ? portableTextConfig.renderAsPlainText(col3Body) : null;
					const ratio = columnCount === minColumnCount ? "Full Span" : [col1Ratio, col2Ratio, col3Ratio]?.slice(0, columnCount)?.join(":");
					return (<>
						<style>{`
							.rb-pageBuilder-segmentPreview div[data-testid="default-preview"] span[data-testid="Media"] {
								display: none !important;
							}
						`}</style>
						<Flex className={"rb-pageBuilder-segmentPreview"} align={"center"}>
							<Box flex={1}>
								{props.renderDefault({
									...props,
									title,
								})}
							</Box>
							<Badge
								fontSize={1}
								marginRight={1}
								mode={"outline"}
								tone={"primary"}
							>
								{ratio}
							</Badge>
						</Flex>
					</>);
				},
				item: (props) => {
					const selectedColumnArray = Array.from({ length: props.value?.columnCount - minColumnCount + 1 }, (_, index) => minColumnCount + index);
					return (<>
						<Flex align={"center"}>
							<Card
								tone={"default"}
								padding={"0"}
								radius={"1"}
								marginLeft={1}
								border={true}
								style={{
									width: "2.75rem",
									height: "calc(3.25rem - 1px)",
									display: "flex",
									position: "relative",
								}}
							>
								{selectedColumnArray.map((column) => {
									const correspondingRatio = props.value?.[`col${column}Ratio`];
									const correspondingBody = props.value?.[`col${column}Body`];
									const hasError = (!correspondingRatio || correspondingRatio <= 0);
									const isHighlighted = (correspondingBody && correspondingBody.length !== 0) || hasError;
									return (
										<Card
											key={column}
											flex={correspondingRatio > 0 ? correspondingRatio : 1}
											tone={isHighlighted ? (!correspondingRatio || correspondingRatio <= 0 ? "critical" : "primary") : "default"}
											shadow={1}
											style={{
												zIndex: !isHighlighted ? "-1" : (isHighlighted && column%2 === 0 ? "1" : null),
											}}
										></Card>
									);
								})}
								<Badge
									fontSize={1}
									tone={"default"}
									mode={"outline"}
									padding={2}
									radius={6}
									style={{
										position: "absolute",
										top: "50%",
										left: "50%",
										transform: "translate(-50%, -50%)",
										zIndex: "1",
									}}
								>
									{props.index + 1}
								</Badge>
							</Card>
							<Box flex={1}>
								{props.renderDefault({
									...props,
									// onRemove: (event) => {
									// 	return props.onRemove();
									// },
								})}
							</Box>
						</Flex>
					</>);
				},
				input: (props) => {
					return (<>
						<style>{`
							fieldset[data-testid="fieldset-columnSetup"] > *:last-child {
								border: 1px solid var(--card-border-color);
								padding: 0.75rem !important;
								padding-top: 0.25rem !important;
							}
							fieldset[data-testid="fieldset-columnSetup"] > *:last-child > *:first-child {
								display: flex !important;
								flex-flow: row wrap !important;
								grid-row-gap: 1rem !important;
								grid-column-gap: 0.25rem !important;
							}
							fieldset[data-testid="fieldset-columnSetup"] > *:last-child > *:first-child > *:first-child {
								width: 100% !important;
							}
							fieldset[data-testid="fieldset-columnSetup"] input[type="number"]::-webkit-outer-spin-button,
							fieldset[data-testid="fieldset-columnSetup"] input[type="number"]::-webkit-inner-spin-button {
								-webkit-appearance: none !important;
								margin: 0 !important;
							}
							fieldset[data-testid="fieldset-columnSetup"] input[type=number] {
								-moz-appearance: textfield !important;
								text-align: center !important;
							}
							.rb-pageBuilder-columnRatioInput:not(:last-child) div[data-testid="change-bar"] {
								--change-bar-offset: 1px !important;
							}
							${columnArray.map((column) => `fieldset[data-testid="fieldset-col${column}"] > *:last-child`).join(", ")} {
								border: none !important;
								padding: 0 !important;
								margin: 0 !important;
							}
							${columnArray.map((column) => `fieldset[data-testid="fieldset-col${column}"] > *:last-child fieldset > *:first-child`).join(", ")} {
								display: none !important;
							}
						`}</style>
						{props.renderDefault(props)}
					</>);
				},
			},
		}),
	],
});