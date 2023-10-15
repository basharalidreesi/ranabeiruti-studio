import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { media } from "sanity-plugin-media";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";
import { dataDeskstructure, projectsDeskStructure } from "./structure";
import { defaultDocumentNode } from "./defaultDocumentNode";
import { DatabaseIcon, MoonIcon, PackageIcon, SunIcon } from "@sanity/icons";

const config = (dataset) => {
	return {
		name: dataset,
		projectId: "rtlbcvty",
		dataset: dataset,
		basePath: `/${dataset}`,
		title: "Rana Beiruti",
		subtitle: dataset,
		icon: dataset === "production" ? SunIcon : MoonIcon, 
		plugins: [
			deskTool({
				title: "Projects",
				name: "projects",
				icon: DatabaseIcon,
				structure: projectsDeskStructure,
				defaultDocumentNode: defaultDocumentNode,
			}),
			deskTool({
				title: "Data",
				name: "data",
				icon: PackageIcon,
				structure: dataDeskstructure,
				defaultDocumentNode: defaultDocumentNode,
			}),
			media(),
			visionTool(),
		],
		schema: {
			types: schemaTypes,
		},
	};
};

export default defineConfig([
	config("production"),
	config("staging"),
]);
