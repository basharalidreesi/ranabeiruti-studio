import { defineField, defineType } from "sanity";
import { imageConfig } from "../../util";
import { LimitedFileInput } from "../../components";

export default defineType({
	name: "mainImage",
	type: "image",
	title: "Main Image",
	description: "",
	fields: [
		defineField({
			name: "isUsedAsHero",
			type: "boolean",
			title: "Use as Hero?",
			options: {
				layout: "checkbox",
			},
			initialValue: false,
			hidden: ({ parent }) => !parent?.asset,
			validation: (Rule) => Rule.custom((value, context) => {
				if (!context?.parent?.asset) { return true; };
				if (context?.parent?.asset && typeof value !== "boolean") { return "Required"; };
				return true;
			}),
		}),
		defineField({
			name: "displaySize",
			type: "string",
			title: "Display Size",
			options: {
				list: [
					{
						value: "small",
						title: "Small",
					},
					{
						value: "medium",
						title: "Medium",
					},
					{
						value: "large",
						title: "Large",
					},
				],
				layout: "radio",
				direction: "horizontal",
			},
			initialValue: "medium",
			hidden: ({ parent }) => !parent?.asset || !parent?.isUsedAsHero,
			validation: (Rule) => Rule.custom((value, context) => {
				if (!context?.parent?.asset) { return true; };
				if (context?.parent?.asset && !value) { return "Required"; };
				return true;
			}),
		}),
		defineField({
			name: "caption",
			type: "simplePortableText",
			title: "Caption",
			hidden: ({ parent }) => !parent?.asset || !parent?.isUsedAsHero,
		}),
	],
	options: imageConfig.options,
	// validation: (Rule) => Rule.custom((value) => {
	// 	if (!value?.asset) { return "Required"; };
	// 	return true;
	// }),
	components: {
		field: (props) => {
			const StyleIfAssetExists = (
				<style>{`
						.rb-fieldset-image > fieldset[data-level="1"] > *:last-child {
							border: 1px solid var(--card-border-color);
							padding: 0.75rem !important;
						}
						.rb-fieldset-image > fieldset[data-level="1"] div[data-testid="image-input"] > *:first-child {
							width: calc(100% + 1.5rem + 2px);
							margin-left: calc(-0.75rem - 1px);
							margin-top: calc(-0.75rem - 1px);
							margin-bottom: -0.75rem;
						}
						.rb-fieldset-image > fieldset[data-level="1"] div[data-testid="image-input"] > *:first-child + div {
							margin-top: -0.5rem;
						}
						.rb-fieldset-image [data-testid="field-image.displaySize"] {
							margin-top: -1rem;
						}
						.rb-fieldset-image [data-testid="field-image.caption"] {
							margin-top: -1rem;
						}
				`}</style>
			);
			const StyleIfAssetDoesNotExist = (
				<style>{`
						.rb-fieldset-image > fieldset[data-level="1"] > *:last-child {
							border: none !important;
							padding: 0px !important;
						}
						.rb-fieldset-image #image,
						.rb-fieldset-image #image > *:first-child {
							padding: 0px !important;
						}
						.rb-fieldset-image #image > *:first-child > *:first-child {
							border-radius: 0.1875rem;
						}
				`}</style>
			);
			return (<>
				{props?.value?.asset ? StyleIfAssetExists : StyleIfAssetDoesNotExist}
				<div className="rb-fieldset-image">
					{props.renderDefault(props)}
				</div>
			</>);
		},
		input: LimitedFileInput,
	},
});