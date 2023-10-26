import { BellIcon, BillIcon, BottleIcon, BulbOutlineIcon, CaseIcon, DatabaseIcon, RocketIcon, TagIcon, UserIcon } from "@sanity/icons";

const hiddenTypes = new Set([
	"media.tag",
	"project",
	"client",
	"profile",
	"location",
	"news",
	"press",
	"type_",
	"subject",
	"collection",
]);

export const structure = (S) => {
	return S.list()
		.title("Data")
		.items([
			S.listItem()
				.title("Projects")
				.icon(DatabaseIcon)
				.child(
					S.documentTypeList("project")
						.title("Projects")
						// .menuItems([])
						// .defaultLayout("detail")
						// .defaultOrdering([{ field: "title", direction: "asc" }])
				),
			S.divider(),
			S.listItem()
				.title("Clients")
				.icon(CaseIcon)
				.child(
					S.documentTypeList("client")
						.title("Clients")
						// .menuItems([])
						// .defaultLayout("detail")
						// .defaultOrdering([{ field: "title", direction: "asc" }])
				),
			S.listItem()
				.title("Profiles")
				.icon(UserIcon)
				.child(
					S.documentTypeList("profile")
						.title("Profiles")
						// .menuItems([])
						// .defaultLayout("detail")
						// .defaultOrdering([{ field: "title", direction: "asc" }])
				),
			S.listItem()
				.title("Locations")
				.icon(RocketIcon)
				.child(
					S.documentTypeList("location")
						.title("Locations")
						// .menuItems([])
						// .defaultLayout("detail")
						// .defaultOrdering([{ field: "title", direction: "asc" }])
				),
			S.divider(),
			S.listItem()
				.title("News")
				.icon(BellIcon)
				.child(
					S.documentTypeList("news")
						.title("News")
						// .menuItems([])
						// .defaultLayout("detail")
						// .defaultOrdering([{ field: "title", direction: "asc" }])
				),
			S.listItem()
				.title("Press")
				.icon(BillIcon)
				.child(
					S.documentTypeList("press")
						.title("Press")
						// .menuItems([])
						// .defaultLayout("detail")
						// .defaultOrdering([{ field: "title", direction: "asc" }])
				),
			S.divider(),
			S.listItem()
				.title("Types")
				.icon(TagIcon)
				.child(
					S.documentTypeList("type_")
						.title("Types")
						// .menuItems([])
						// .defaultLayout("detail")
						// .defaultOrdering([{ field: "title", direction: "asc" }])
				),
			S.listItem()
				.title("Subjects")
				.icon(BulbOutlineIcon)
				.child(
					S.documentTypeList("subject")
						.title("Subjects")
						// .menuItems([])
						// .defaultLayout("detail")
						// .defaultOrdering([{ field: "title", direction: "asc" }])
				),
			S.listItem()
				.title("Collections")
				.icon(BottleIcon)
				.child(
					S.documentTypeList("collection")
						.title("Collections")
						// .menuItems([])
						// .defaultLayout("detail")
						// .defaultOrdering([{ field: "title", direction: "asc" }])
				),
			S.divider(),
			...S.documentTypeListItems().filter((type) => !hiddenTypes.has(type.spec.id)),
		]);
};

// export const projectsDeskStructure = (S) => {
// 	return S.documentTypeList("project").title("Projects");
// };