import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { media } from "sanity-plugin-media";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";
import { dataDeskstructure, projectsDeskStructure } from "./structure";
import { defaultDocumentNode } from "./defaultDocumentNode";
import { DatabaseIcon, PackageIcon } from "@sanity/icons";

export default defineConfig({
	name: "default",
	title: "Rana Beiruti",
	projectId: "rtlbcvty",
	dataset: "production",
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
		}),
		media(),
		visionTool(),
	],
	schema: {
		types: schemaTypes,
	},
});
