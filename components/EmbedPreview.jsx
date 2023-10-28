import { useEffect, useState } from "react";
import { embedConfig } from "../util";
import { CodeBlockIcon } from "@sanity/icons";

export default function EmbedPreview(props) {
	const {
		type,
		url,
		code,
	} = props;
	const [oEmbed, setOEmbed] = useState(null);
	useEffect(() => {
		if (type === "url") {
			async function getData() {
				setOEmbed(await embedConfig.getOEmbed(url));
			};
			getData();
		};
	}, [type, url]);
	const title = () => {
		if (type === "url") {
			return oEmbed?.title || url || props.title;
		};
		if (type === "code") {
			return code || props.title;
		};
	};
	const subtitle = () => {
		if (type === "url") {
			return oEmbed?.provider_name || props.subtitle;
		};
		if (type === "code") {
			return props.subtitle;
		};
	};
	const media = () => {
		if (type === "url") {
			return oEmbed?.thumbnail_url ? (<img src={oEmbed?.thumbnail_url} />) : props.media;
		};
		if (type === "code") {
			return CodeBlockIcon || props.media;
		};
	};
	return (<>
		{props.renderDefault({
			...props,
			title: title(),
			subtitle: subtitle(),
			media: media(),
		})}
	</>);
};