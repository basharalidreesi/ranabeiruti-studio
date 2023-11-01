// documents
import client from "./documents/client";
import collection from "./documents/collection";
import homepage from "./documents/homepage";
import location from "./documents/location";
import news from "./documents/news";
import press from "./documents/press";
import pressListing from "./documents/pressListing";
import profile from "./documents/profile";
import project from "./documents/project";
import projectsListing from "./documents/projectsListing";
import simplePage from "./documents/simplePage";
import subject from "./documents/subject";
import type_ from "./documents/type";

// objects
import complexDate from "./objects/complexDate";
import link from "./objects/link";
import mainImage from "./objects/mainImage";
import multimediaPortableText from "./objects/multimediaPortableText";
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
		subject,
		type_,
		// pages
		homepage,
		projectsListing,
		pressListing,
		simplePage,
	// objects
	complexDate,
	link,
	mainImage,
	multimediaPortableText,
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