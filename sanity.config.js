import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { media } from "sanity-plugin-media";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";
import { dataDeskStructure, pageDeskStructure, singletonActions, singletonTypes } from "./structure";
import { defaultDocumentNode } from "./defaultDocumentNode";
import { DatabaseIcon, MasterDetailIcon, MoonIcon, SunIcon } from "@sanity/icons";
import "./style.css";

const PROJECT_ID = "rtlbcvty";
const PROJECT_TITLE = "Rana Beiruti";

function createConfig(params = {}) {
	const {
		name,
		projectId,
		dataset,
		basePath,
		title,
		subtitle,
		icon,
	} = params;
	return {
		name: name,
		projectId: projectId,
		dataset: dataset,
		basePath: basePath,
		title: title,
		subtitle: subtitle,
		icon: icon, 
		plugins: [
			deskTool({
				name: "data",
				title: "Data",
				icon: DatabaseIcon,
				structure: dataDeskStructure,
				defaultDocumentNode: defaultDocumentNode,
			}),
			deskTool({
				name: "pages",
				title: "Pages",
				icon: MasterDetailIcon,
				structure: pageDeskStructure,
				defaultDocumentNode: defaultDocumentNode,
			}),
			media(),
			visionTool(),
		],
		schema: {
			types: schemaTypes,
			templates: (prev) => prev.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
		},
		document: {
			actions: (prev, context) => singletonTypes.has(context.schemaType) ? prev.filter(({ action }) => action && singletonActions.has(action)) : prev,
		},
	};
};

export default defineConfig([
	createConfig({
		name: "production",
		projectId: PROJECT_ID,
		dataset: "production",
		basePath: "/production",
		title: PROJECT_TITLE,
		subtitle: "Production",
		icon: SunIcon, 
	}),
	// createConfig({
	// 	name: "staging",
	// 	projectId: PROJECT_ID,
	// 	dataset: "staging",
	// 	basePath: "/staging",
	// 	title: PROJECT_TITLE,
	// 	subtitle: "Staging",
	// 	icon: MoonIcon, 
	// }),
]);
