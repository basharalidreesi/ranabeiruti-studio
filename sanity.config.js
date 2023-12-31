import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { media } from "sanity-plugin-media";
import { visionTool } from "@sanity/vision";
import { dashboardTool } from "@sanity/dashboard";
import { netlifyWidget } from "sanity-plugin-dashboard-widget-netlify";
import { schemaTypes } from "./schemas";
import { dataDeskStructure, pagesDeskStructure, singletonActions, singletonTypes } from "./structure";
import { defaultDocumentNode } from "./defaultDocumentNode";
import { DatabaseIcon, DocumentsIcon, MoonIcon, SunIcon } from "@sanity/icons";
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
				icon: DocumentsIcon,
				structure: pagesDeskStructure,
				defaultDocumentNode: defaultDocumentNode,
			}),
			dashboardTool({ widgets: [
				netlifyWidget({
					title: "Netlify Deployments",
					sites: [
						{
							name: "illustrious-griffin-e3f8aa ",
							// title: "Rana Beiruti ",
							apiId: "9b8d59de-d075-40eb-9ceb-eefbc03fb51d",
							buildHookId: "658a0980e78d192d02c17dae",
							url: "https://illustrious-griffin-e3f8aa.netlify.app/",
						},
					],
				}),
			]}),
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
]);
