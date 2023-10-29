import { InfoOutlineIcon } from "@sanity/icons";
import { Card, Flex, Text } from "@sanity/ui";
import { defineField, defineType, useFormValue } from "sanity";
import { dateConfig } from "../../util";

// when used, a complexDate object should be named as `date` in order for everything to work properly

export default defineType({
	name: "complexDate",
	type: "object",
	title: "Complex Date",
	description: "",
	fields: [
		defineField({
			name: "startDate",
			type: "date",
			title: "Start Date",
			description: "",
			options: {
				dateFormat: dateConfig.dateFormat,
			},
			validation: (Rule) => Rule.required(),
			components: {
				field: (props) => {
					const hasDuration = useFormValue(["date", "hasDuration"]) || false;
					return (
						<div style={{
							gridColumn: hasDuration ? "auto" : "1/-1",
						}}>
							{props.renderDefault({
								...props,
								title: hasDuration ? props?.title : "Date",
							})}
						</div>
					);
				},
			},
		}),
		defineField({
			name: "endDate",
			type: "date",
			title: "End Date",
			description: "",
			options: {
				dateFormat: dateConfig.dateFormat,
			},
			hidden: ({ parent }) => !parent?.hasDuration,
			readOnly: ({ parent }) => parent?.isOngoing,
			validation: (Rule) => Rule.custom((value, context) => {
				if (!value) { return true; };
				const startDate = new Date(context?.parent?.startDate) || null;
				const hasDuration = context?.parent?.hasDuration;
				const isOngoing = context?.parent?.isOngoing;
				if (!startDate) { return true; };
				if (!hasDuration || (hasDuration && isOngoing)) { return true; };
				if (startDate <= new Date(value)) { return true };
				return "The end date cannot be earlier than the start date";
			}),
			components: {
				input: (props) => {
					const isOngoing = useFormValue(["date", "isOngoing"]) || false;
					return props.renderDefault({
						...props,
						value: isOngoing ? "Present" : props?.value || "",
					});
				},
			},
		}),
		defineField({
			name: "hasDuration",
			type: "boolean",
			title: "Duration?",
			description: "",
			options: {
				layout: "checkbox",
			},
			initialValue: false,
			validation: (Rule) => Rule.required(),
			components: {
				field: (props) => {
					const hasDuration = props.value;
					return (
						<div style={{
							gridColumn: hasDuration ? "auto" : "1/-1",
						}}>
							{props.renderDefault(props)}
						</div>
					);
				},
			},
		}),
		defineField({
			name: "isOngoing",
			type: "boolean",
			title: "Ongoing?",
			description: "",
			options: {
				layout: "checkbox",
			},
			initialValue: false,
			hidden: ({ parent }) => !parent?.hasDuration,
			validation: (Rule) => Rule.required().custom((value, context) => {
				if (!context.parent?.startDate) { return true; };
				const startDate = new Date(context.parent?.startDate).setHours(0, 0, 0, 0);
				const today = new Date().setHours(0, 0, 0, 0);
				return startDate > today && value === true ? "A project cannot be ongoing if it starts in the future" : true; 
			}),
		}),
		defineField({
			name: "dateFormat",
			type: "string",
			title: "Format",
			description: "",
			options: {
				list: [
					{
						value: "fullDate",
						title: "Full date",
					},
					{
						value: "yearWithMonth",
						title: "Year with month",
					},
					{
						value: "yearOnly",
						title: "Year only",
					},
				],
				layout: "radio",
				direction: "horizontal",
			},
			initialValue: "fullDate",
			validation: (Rule) => Rule.required(),
			components: {
				field: (props) => {
					return (
						<div style={{
							gridColumn: "1/-1",
						}}>
							{props.renderDefault(props)}
						</div>
					);
				},
			},
		}),
	],
	options: {
		columns: 2,
	},
	components: {
		input: (props) => {
			if (!props.value?.startDate) { return props.renderDefault(props); };
			const startDate = new Date(props.value?.startDate).setHours(0, 0, 0, 0);
			const today = new Date().setHours(0, 0, 0, 0);
			const hasDuration = props.value?.hasDuration;
			return startDate > today
				? (<>
					<Card
						padding={3}
						radius={2}
						shadow={1}
						tone={"caution"}
						style={{
							marginTop: "0.5rem",
							marginBottom: "-1.75rem",
						}}
					>
						<Flex gap={2} align={"center"} justify={"center"}>
							<Text align={"center"} size={2} muted>
								<InfoOutlineIcon />
							</Text>
							<Text align={"center"} size={2} muted>
								{hasDuration ? "This start date is in the future." : "This date is in the future."}
							</Text>
						</Flex>
					</Card>
					{props.renderDefault(props)}
				</>)
				: props.renderDefault(props);
		},
	},
});