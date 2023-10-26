import { defineArrayMember, defineField, defineType } from "sanity";
import { customSlugify, dateConfig, portableTextConfig, requireSlug, requireString } from "../../util";
import { DatabaseIcon } from "@sanity/icons";
import { ExposedArrayFunctions, ReferenceMultiSelect } from "../../components";

export default defineType({
	name: "project",
	type: "document",
	title: "Project",
	icon: DatabaseIcon,
	fieldsets: [
		// {
		// 	name: "tags",
		// 	title: "Tags",
		// 	options: {
		// 		collapsible: true,
		// 		collapsed: true,
		// 	},
		// },
		// {
		// 	name: "collections",
		// 	title: "Collections",
		// 	options: {
		// 		collapsible: true,
		// 		collapsed: false,
		// 	},
		// },
		// {
		// 	name: "relations",
		// 	title: "Relations",
		// 	options: {
		// 		collapsible: true,
		// 		collapsed: false,
		// 	},
		// },
	],
	fields: [
		defineField({
			name: "title",
			type: "string",
			title: "Title",
			description: "",
			validation: (Rule) => Rule.custom(requireString),
		}),
		defineField({
			name: "subtitle",
			type: "string",
			title: "Subtitle",
			description: "",
		}),
		defineField({
			name: "slug",
			type: "slug",
			title: "Slug",
			description: "",
			options: {
				source: "title",
				slugify: customSlugify,
			},
			validation: (Rule) => Rule.custom(requireSlug),
		}),
		defineField({
			name: "profiles",
			type: "array",
			title: "Profiles",
			description: "",
			of: [
				defineArrayMember({
					type: "reference",
					title: "Profile",
					description: "",
					to: [{ type: "profile", }],
					options: {
						disableNew: true,
					},
				}),
			],
			validation: (Rule) => Rule.required().min(1).error("Required"),
			// components: {
			// 	input: (props) => <ReferenceMultiSelect options={{
			// 		query: `*[_type == "profile"] | order(lower(name) asc) { _id }._id`,
			// 	}} {...props} />,
			// },
		}),
		defineField({
			name: "date",
			type: "complexDate",
			title: "Date",
			description: "",
		}),
		defineField({
			name: "locations",
			type: "array",
			title: "Locations",
			description: "",
			of: [
				defineArrayMember({
					type: "reference",
					title: "Location",
					description: "",
					to: [{ type: "location", }],
				}),
			],
			// components: {
			// 	input: ExposedArrayFunctions,
			// },
		}),
		defineField({
			name: "clients",
			type: "array",
			title: "Clients",
			description: "",
			of: [
				defineArrayMember({
					type: "reference",
					title: "Client",
					description: "",
					to: [{ type: "client", }],
				}),
			],
			// components: {
			// 	input: ExposedArrayFunctions,
			// },
		}),
		defineField({
			name: "types",
			type: "array",
			title: "Types",
			description: "",
			of: [
				defineArrayMember({
					type: "reference",
					title: "Type",
					description: "",
					to: [{ type: "type_", }],
					options: {
						// disableNew: true,
					},
				}),
			],
			validation: (Rule) => Rule.required().min(1).error("Required"),
			// components: {
			// 	input: (props) => <ReferenceMultiSelect options={{
			// 		query: `*[_type == "type_"] | order(lower(name) asc) { _id }._id`,
			// 	}} {...props} />,
			// },
			// fieldset: "tags",
		}),
		defineField({
			name: "subjects",
			type: "array",
			title: "Subjects",
			description: "",
			of: [
				defineArrayMember({
					type: "reference",
					title: "Subject",
					description: "",
					to: [{ type: "subject", }],
					options: {
						// disableNew: true,
					},
				}),
			],
			validation: (Rule) => Rule.required().min(1).error("Required"),
			// components: {
			// 	input: (props) => <ReferenceMultiSelect options={{
			// 		query: `*[_type == "subject"] | order(lower(name) asc) { _id }._id`,
			// 	}} {...props} />,
			// },
			// fieldset: "tags",
		}),
		defineField({
			name: "collections",
			type: "array",
			title: "Collections",
			description: "",
			of: [
				defineArrayMember({
					type: "reference",
					title: "Collection",
					description: "",
					to: [{ type: "collection", }],
					options: {
						// disableNew: true,
					},
				}),
			],
			// components: {
			// 	input: (props) => <ReferenceMultiSelect options={{
			// 		query: `*[_type == "collection"] | order(lower(name) asc) { _id }._id`,
			// 	}} {...props} />,
			// },
			// fieldset: "collections",
		}),
		defineField({
			name: "news",
			type: "array",
			title: "News",
			description: "",
			of: [
				defineArrayMember({
					type: "reference",
					title: "News",
					description: "",
					to: [{ type: "news", }],
				}),
			],
			// components: {
			// 	input: ExposedArrayFunctions,
			// },
			// fieldset: "relations",
		}),
		defineField({
			name: "press",
			type: "array",
			title: "Press",
			description: "",
			of: [
				defineArrayMember({
					type: "reference",
					title: "Press",
					description: "",
					to: [{ type: "press", }],
				}),
			],
			// components: {
			// 	input: ExposedArrayFunctions,
			// },
			// fieldset: "relations",
		}),
		defineField({
			name: "image",
			type: "mainImage",
			title: "Main Image",
			description: "",
		}),
		defineField({
			name: "description",
			type: "simplePortableText",
			title: "Blurb",
			description: "",
		}),
		defineField({
			name: "body",
			type: "pageBuilder",
			title: "Body",
			description: "",
			// components: {
			// 	input: ExposedArrayFunctions,
			// },
		}),
		defineField({
			name: "credits",
			type: "simplePortableText",
			title: "Credits",
			description: "",
		}),
	],
	// components: {
	// 	input: (props) => {
	// 		return (
	// 			<>
	// 				{/* <style>{`
	// 					fieldset[data-testid="fieldset-tags"] > *:last-child,
	// 					fieldset[data-testid="fieldset-relations"] > *:last-child {
	// 						border: 1px solid var(--card-border-color);
	// 						padding: 0.75rem !important;
	// 						padding-top: 0.25rem !important;
	// 					}
	// 					fieldset[data-testid="fieldset-collections"] > *:last-child {
	// 						margin: 0 !important;
	// 						padding: 0 !important;
	// 						border: none !important;
	// 					}
	// 					fieldset[data-testid="field-collections"] > *:first-child {
	// 						display: none !important;
	// 					}
	// 				`}</style> */}
	// 				{props.renderDefault(props)}
	// 			</>
	// 		);
	// 	},
	// },
	// orderings config
	preview: {
		select: {
			title: "title",
			description: "description",
			date: "date",
			image: "image",
		},
		prepare(selection) {
			const {
				title,
				description,
				date,
				image,
			} = selection;
			return {
				title: title,
				subtitle: dateConfig.renderComplexDate(date, "short"),
				description: portableTextConfig.renderAsPlainText(description),
				media: image,
			};
		},
	},
});