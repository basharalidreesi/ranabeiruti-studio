import { defineField, defineType, useFormValue } from "sanity";

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
				// dateFormat: "D MMMM YYYY",
			},
			validation: (Rule) => Rule.required(),
			components: {
				field: (props) => {
					const hasDuration = useFormValue(["date", "hasDuration"]);
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
				// dateFormat: "D MMMM YYYY",
			},
			hidden: ({ parent }) => !parent?.hasDuration,
			readOnly: ({ parent }) => parent?.isOngoing,
			validation: (Rule) => Rule.custom((value, context) => {
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
					const isOngoing = useFormValue(["date", "isOngoing"]);
					return props.renderDefault({
						...props,
						value: isOngoing ? "Present" : props?.value,
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
			validation: (Rule) => Rule.required(),
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
		field: (props) => {
			return (
				<>
					<style>{`
						fieldset[data-testid="field-date"] > *:first-child {
							display: none !important;
						}
						fieldset[data-testid="field-date"] > *:last-child {
							border: 1px solid var(--card-border-color);
							padding: 0.75rem !important;
							padding-top: 0.25rem !important;
						}
					`}</style>
					{props.renderDefault(props)}
				</>
			);
		},
	},
});