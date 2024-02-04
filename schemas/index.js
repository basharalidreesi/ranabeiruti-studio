// documents
import client from "./documents/client";
import collection from "./documents/collection";
import listing from "./documents/listing";
import location from "./documents/location";
import news from "./documents/news";
import press from "./documents/press";
import profile from "./documents/profile";
import project from "./documents/project";
import publication from "./documents/publication";
import settings from "./documents/settings";
import story from "./documents/story";
import subject from "./documents/subject";
import type_ from "./documents/type";

// objects
import complexDate from "./objects/complexDate";
import link from "./objects/link";
import mainImage from "./objects/mainImage";
import placement from "./objects/placement";
import ratio from "./objects/ratio";
import simplePortableText from "./objects/simplePortableText";
import verticalAlignment from "./objects/verticalAlignment";
import complexPortableText from "./objects/complexPortableText";
import complexPageBuilder from "./objects/complexPageBuilder";
import lessComplexPortableText from "./objects/lessComplexPortableText";
import lessComplexPageBuilder from "./objects/lessComplexPageBuilder";

export const schemaTypes = [
	// documents
	client,
	collection,
	listing,
	location,
	news,
	press,
	profile,
	project,
	publication,
	settings,
	story,
	subject,
	type_,
	// objects
	complexDate,
	link,
	mainImage,
	placement,
	ratio,
	simplePortableText,
	verticalAlignment,
	complexPortableText,
	complexPageBuilder,
	lessComplexPortableText,
	lessComplexPageBuilder,
	// {
	// 	name: "temp",
	// 	type: "document",
	// 	fields: [{
	// 		name: "temp",
	// 		type: "string",
	// 	}],
	// },
];