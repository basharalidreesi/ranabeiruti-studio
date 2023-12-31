// documents
import client from "./documents/client";
import collection from "./documents/collection";
import listing from "./documents/listing";
import location from "./documents/location";
import news from "./documents/news";
import page from "./documents/page";
import press from "./documents/press";
import profile from "./documents/profile";
import project from "./documents/project";
import publication from "./documents/publication";
import settings from "./documents/settings";
import subject from "./documents/subject";
import type_ from "./documents/type";

// objects
import complexDate from "./objects/complexDate";
import link from "./objects/link";
import mainImage from "./objects/mainImage";
import complexPortableText from "./objects/complexPortableText";
import pageBuilder from "./objects/pageBuilder";
import placement from "./objects/placement";
import ratio from "./objects/ratio";
import simplePortableText from "./objects/simplePortableText";
import verticalAlignment from "./objects/verticalAlignment";

export const schemaTypes = [
	// documents
		// data
		client,
		collection,
		location,
		news,
		press,
		profile,
		project,
		publication,
		subject,
		type_,
		// pages
		listing,
		page,
		settings,
	// objects
	complexDate,
	link,
	mainImage,
	complexPortableText,
	pageBuilder,
	placement,
	ratio,
	simplePortableText,
	verticalAlignment,
	// {
	// 	name: "temp",
	// 	type: "document",
	// 	fields: [{
	// 		name: "temp",
	// 		type: "string",
	// 	}],
	// },
];

// template:
// name config
// type config
// title config
// icon config
// description config
// fieldsets config
// groups config
// fields config
// to config
// of config
// weak config
// styles config
// lists config
// marks config
// placeholder config
// options config
// initialValue config
// hidden config
// readOnly config
// validation config
// orderings config
// preview config
// components config
// fieldset config
// group config