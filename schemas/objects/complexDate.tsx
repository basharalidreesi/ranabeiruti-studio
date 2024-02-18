import { InfoOutlineIcon } from "@sanity/icons";
import { Card, Flex, Text } from "@sanity/ui";
import { ValidationContext, defineField, defineType, useFormValue } from "sanity";
import { dateConfig } from "../../util";
import React from "react";

export default defineType({
	name: "complexDate",
	type: "object",
	title: "Complex Date",
	fields: [
		defineField({
			name: "startDate",
			type: "date",
			title: "Start Date",
			options: {
				dateFormat: dateConfig.dateFormat,
			},
			validation: (Rule) => Rule.required(),
			components: {
				field: (props) => {
					const hasDuration = useFormValue([...props.path?.slice(0, -1), "hasDuration"]) || false;
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
			name: "endDate",
			type: "date",
			title: "End Date",
			options: {
				dateFormat: dateConfig.dateFormat,
			},
			hidden: ({ parent }) => !parent?.hasDuration,
			readOnly: ({ parent }) => parent?.isOngoing,
			validation: (Rule) => Rule.custom((value, context: ValidationContext & { parent? : any; }) => {
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
					const isOngoing = useFormValue([...props.path?.slice(0, -1), "isOngoing"]) || false;
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
			description: "Marks this field as representing a duration.",
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
			description: "Marks the end date as being ongoing.",
			options: {
				layout: "checkbox",
			},
			initialValue: false,
			hidden: ({ parent }) => !parent?.hasDuration,
			validation: (Rule) => Rule.required().custom((value, context: ValidationContext & { parent?: any; }) => {
				if (!context.parent?.startDate) { return true; };
				const startDate = new Date(context.parent?.startDate).setHours(0, 0, 0, 0);
				const today = new Date().setHours(0, 0, 0, 0);
				return startDate > today && value === true ? `A ${context.document?._type} cannot be ongoing if it starts in the future` : true; 
			}),
		}),
		defineField({
			name: "dateFormat",
			type: "string",
			title: "Format",
			description: "The desired presentation format for this date.",
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
			hidden: ({ document }) => document?._type === "story",
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
							marginTop: "0.75rem",
							marginBottom: "-1rem",
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