import { Button, Card, Flex, Text } from "@sanity/ui";
import { useEffect, useState } from "react";
import useSanityClient from "../sanity.client";
import { renderComplexDate } from "../util";

export default function ProjectPreview({document}) {
	const [data, setData] = useState([]);
	const [isFetching, setIsFetching] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [renderRequests, createRenderRequest] = useState(0);
	const client = useSanityClient()
	const documentId = document.displayed._id;
	const query = (`
		*[_id == $documentId][0] {
			// metadata
			slug,
			profiles[]->{
				name,
			},
			// data
			title,
			subtitle,
			date {
				startDate,
				endDate,
				hasDuration,
				isOngoing,
				dateFormat,
			},
			locations[]->{
				name,
				locale
			},
			clients[]->{
				name,
			},
		}`
	);
	const params = {
		documentId: documentId,
	};
	useEffect(() => {
		async function getData() {
			try {
				setIsFetching(true);
				setHasError(false);
				client.fetch(query, params).then((result) => setData(result));
				console.info(`Fetching for project preview`);
				setIsFetching(false);
				setHasError(false);
			} catch(error) {
				console.error(error);
				setIsFetching(false);
				setHasError(true);
			};
		};
		getData();
	}, [renderRequests]);
	return (
		<>
			<div className="rb-projectPreview-wrapper">
				<Card paddingX={3} paddingY={2} borderBottom={1} style={{ position: "sticky", top: "0", zIndex: "10", textAlign: "right" }}>
					<Flex direction={"row"} align={"center"} justify={"space-between"} space={2}>
						<Text muted={true} size={1}>{
							data?.profiles && data?.profiles?.length !== 0
								? (data?.profiles?.filter(Boolean)?.map((profile) => `${profile?.name}`)?.join(" • "))
								: (`No profiles`)
						}</Text>
						<Text muted={true} size={1}>{
							data?.slug?.current
								? (`/projects/${data?.slug?.current}/`)
								: (`No slug`)
						}</Text>
						<Button id="rb-projectPreview-generateButton" mode="ghost" text="Generate" onClick={() => createRenderRequest((prev) => prev + 1)} />
					</Flex>
				</Card>
				<div className="rb-projectPreview-container" id="rb-projectPreview-container">
					{Title(data)}
					{Subtitle(data)}
					{DateAndLocations(data)}
				</div>
			</div>
		</>
	);
};

const Title = (data) => {
	if (!data?.title) { return; };
	return (
		<h1>
			{data?.title}
		</h1>
	);
};

const Subtitle = (data) => {
	if (!data?.subtitle) { return; };
	return (
		<p>
			{data?.subtitle}
		</p>
	);
};

const DateAndLocations = (data) => {
	if (!data?.date && (!data?.locations || data?.locations?.length === 0)) { return; }
	const Date = renderComplexDate(data?.date);
	const Locations = data?.locations?.filter(Boolean)?.map((location) => [location?.name, location?.locale]?.filter(Boolean)?.join(", "))?.join(" • ");
	return (
		<p>
			{[Date, Locations]?.filter(Boolean)?.join(" • ")}
		</p>
	);
};