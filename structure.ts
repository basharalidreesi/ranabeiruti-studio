import { FolderIcon } from "@sanity/icons";
import { PROJECT_ICON } from "./schemas/documents/project";
import { NEWS_ICON } from "./schemas/documents/news";
import { PRESS_ICON } from "./schemas/documents/press";
import { CLIENT_ICON } from "./schemas/documents/client";
import { PROFILE_ICON } from "./schemas/documents/profile";
import { LOCATION_ICON } from "./schemas/documents/location";
import { TYPE_ICON } from "./schemas/documents/type";
import { SUBJECT_ICON } from "./schemas/documents/subject";
import { COLLECTION_ICON } from "./schemas/documents/collection";
import { PUBLICATION_ICON } from "./schemas/documents/publication";
import { STORY_ICON } from "./schemas/documents/story";

const hiddenTypes = new Set([
	"client",
	"collection",
	"listing",
	"location",
	"news",
	"press",
	"profile",
	"project",
	"publication",
	"settings",
	"story",
	"subject",
	"type_",
	"media.tag",
]);

const hiddenSortItems = new Set([
	"Sort by Created",
	"Sort by Last edited",
]);

export const singletonTypes = new Set([
	"listing",
	"settings",
	"media.tag",
]);

export const singletonActions = new Set([
	"publish",
	"discardChanges",
	"restore",
]);

export const structure = (S) => {
	return S.list()
		.title("Content")
		.items([
			S.divider(),
			S.listItem()
				.title("Projects")
				.icon(PROJECT_ICON)
				.child(
					S.documentTypeList("project")
						.title("Projects")
						.menuItems(S.documentTypeList("project").getMenuItems().filter((menuItem) => !hiddenSortItems.has(menuItem.spec.title)))
						.defaultOrdering([{ field: "date.startDate", direction: "desc" }])
				),
			S.listItem()
				.title("Publications")
				.icon(PUBLICATION_ICON)
				.child(
					S.documentTypeList("publication")
						.title("Publications")
						.menuItems(S.documentTypeList("publication").getMenuItems().filter((menuItem) => !hiddenSortItems.has(menuItem.spec.title)))
						.defaultOrdering([{ field: "date", direction: "desc" }])
				),
			S.listItem()
				.title("Stories")
				.icon(STORY_ICON)
				.child(
					S.documentTypeList("story")
						.title("Stories")
						.menuItems(S.documentTypeList("story").getMenuItems().filter((menuItem) => !hiddenSortItems.has(menuItem.spec.title)))
						.defaultOrdering([{ field: "date.startDate", direction: "desc" }])
				),
			S.divider(),
			S.listItem()
				.title("News")
				.icon(NEWS_ICON)
				.child(
					S.documentTypeList("news")
						.title("News")
						.menuItems(S.documentTypeList("news").getMenuItems().filter((menuItem) => !hiddenSortItems.has(menuItem.spec.title)))
						.defaultOrdering([{ field: "date", direction: "desc" }])
				),
			S.listItem()
				.title("Press")
				.icon(PRESS_ICON)
				.child(
					S.documentTypeList("press")
						.title("Press")
						.menuItems(S.documentTypeList("press").getMenuItems().filter((menuItem) => !hiddenSortItems.has(menuItem.spec.title)))
						.defaultOrdering([{ field: "date", direction: "desc" }])
				),
			S.divider(),
			S.listItem()
				.title("Clients")
				.icon(CLIENT_ICON)
				.child(
					S.documentTypeList("client")
						.title("Clients")
						.menuItems(S.documentTypeList("client").getMenuItems().filter((menuItem) => !hiddenSortItems.has(menuItem.spec.title)))
						.defaultOrdering([{ field: "name", direction: "asc" }])
				),
			S.listItem()
				.title("Profiles")
				.icon(PROFILE_ICON)
				.child(
					S.documentTypeList("profile")
						.title("Profiles")
						.menuItems(S.documentTypeList("profile").getMenuItems().filter((menuItem) => !hiddenSortItems.has(menuItem.spec.title)))
						.defaultOrdering([{ field: "name", direction: "asc" }])
				),
			S.listItem()
				.title("Locations")
				.icon(LOCATION_ICON)
				.child(
					S.documentTypeList("location")
						.title("Locations")
						.menuItems(S.documentTypeList("location").getMenuItems().filter((menuItem) => !hiddenSortItems.has(menuItem.spec.title)))
						.defaultOrdering([{ field: "locale", direction: "asc" }, { field: "name", direction: "asc" }])
				),
			S.divider(),
			S.listItem()
				.title("Types")
				.icon(TYPE_ICON)
				.child(
					S.documentTypeList("type_")
						.title("Types")
						.menuItems(S.documentTypeList("type_").getMenuItems().filter((menuItem) => !hiddenSortItems.has(menuItem.spec.title)))
						.defaultOrdering([{ field: "name", direction: "asc" }])
				),
			S.listItem()
				.title("Subjects")
				.icon(SUBJECT_ICON)
				.child(
					S.documentTypeList("subject")
						.title("Subjects")
						.menuItems(S.documentTypeList("subject").getMenuItems().filter((menuItem) => !hiddenSortItems.has(menuItem.spec.title)))
						.defaultOrdering([{ field: "name", direction: "asc" }])
				),
			S.listItem()
				.title("Collections")
				.icon(COLLECTION_ICON)
				.child(
					S.documentTypeList("collection")
						.title("Collections")
						.menuItems(S.documentTypeList("collection").getMenuItems().filter((menuItem) => !hiddenSortItems.has(menuItem.spec.title)))
						.defaultOrdering([{ field: "name", direction: "asc" }])
				),
			S.divider(),
			S.listItem()
				.title("Website")
				.icon(FolderIcon)
				.child(
					S.list()
						.title("Website")
						.items([
							S.documentListItem().schemaType("listing").id("homepage"),
							S.documentListItem().schemaType("listing").id("projectsListing"),
							S.documentListItem().schemaType("listing").id("publicationsListing"),
							S.documentListItem().schemaType("listing").id("pressListing"),
							S.documentListItem().title("Settings").schemaType("settings").id("settings"),
						]),
				),
			S.divider(),
			...S.documentTypeListItems().filter((type) => !hiddenTypes.has(type.spec.id)),
		]);
};