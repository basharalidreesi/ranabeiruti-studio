import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { media } from "sanity-plugin-media";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";
import { structure } from "./structure";
import { defaultDocumentNode } from "./defaultDocumentNode";
import { MoonIcon, SunIcon } from "@sanity/icons";
import "./style.css";

export default defineConfig([
	{
		name: "production",
		projectId: "rtlbcvty",
		dataset: "production",
		basePath: "/production",
		title: "Rana Beiruti",
		subtitle: "Production",
		icon: SunIcon, 
		plugins: [
			deskTool({
				title: "Data",
				structure: structure,
				defaultDocumentNode: defaultDocumentNode,
			}),
			media(),
			visionTool(),
		],
		schema: {
			types: schemaTypes,
		},
	},
	{
		name: "staging",
		projectId: "rtlbcvty",
		dataset: "staging",
		basePath: "/staging",
		title: "Rana Beiruti",
		subtitle: "Staging",
		icon: MoonIcon, 
		plugins: [
			deskTool({
				title: "Data",
				structure: structure,
				defaultDocumentNode: defaultDocumentNode,
			}),
			media(),
			visionTool(),
		],
		schema: {
			types: schemaTypes,
		},
	}
]);
