const dateConfig = {
	dateFormat: "YYYY-MM-DD",
	renderAsString: (date, length = "long") => {
		return new Date(date).toLocaleDateString("en-gb", {
			day: "numeric",
			month: length,
			year: "numeric",
		});
	},
	renderComplexDate: (complexDate, length = "long") => {
		if (!complexDate || !complexDate?.startDate || !complexDate?.dateFormat) { return null; };
		const startDate = complexDate.startDate;
		const endDate = complexDate.endDate;
		const hasDuration = complexDate.hasDuration;
		const isOngoing = complexDate.isOngoing;
		const dateFormat = complexDate.dateFormat;
		const getDateComponents = (isoDate) => {
			const date = new Date(isoDate);
			return {
				day: date.getDate(),
				month: date.getMonth(),
				year: date.getFullYear(),
			};
		};
		const formatMonth = (monthIndex) => {
			const longMonthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
			const shortMonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
			return length === "short" ? shortMonthNames[monthIndex] : longMonthNames[monthIndex];
		};
		const startComponents = getDateComponents(startDate);
		const endComponents = endDate ? getDateComponents(endDate) : null;
		switch (dateFormat) {
			case "fullDate":
				if (hasDuration && endDate && !isOngoing) {
					if (
						startComponents.year === endComponents.year
						&& startComponents.month === endComponents.month
						&& startComponents.day === endComponents.day
					) {
						return `${startComponents.day} ${formatMonth(startComponents.month)} ${startComponents.year}`;
					};
					if (
						startComponents.year === endComponents.year
						&& startComponents.month === endComponents.month
						&& startComponents.day !== endComponents.day
					) {
						return `${startComponents.day}–${endComponents.day} ${formatMonth(startComponents.month)} ${startComponents.year}`;
					};
					if (
						startComponents.year === endComponents.year
						&& startComponents.month !== endComponents.month
						&& startComponents.day !== endComponents.day
					) {
						return `${startComponents.day} ${formatMonth(startComponents.month)} – ${endComponents.day} ${formatMonth(endComponents.month)} ${startComponents.year}`;
					};
					return `${startComponents.day} ${formatMonth(startComponents.month)} ${startComponents.year} – ${endComponents.day} ${formatMonth(endComponents.month)} ${endComponents.year}`;
				};
				if (hasDuration && isOngoing) {
					return `${startComponents.day} ${formatMonth(startComponents.month)} ${startComponents.year} – Present`;
				};
				return `${startComponents.day} ${formatMonth(startComponents.month)} ${startComponents.year}`;
			case "yearWithMonth":
				if (hasDuration && endDate && !isOngoing) {
					if (startComponents.year === endComponents.year && startComponents.month === endComponents.month) {
						return `${formatMonth(startComponents.month)} ${startComponents.year}`;
					};
					if (startComponents.year === endComponents.year) {
						return `${formatMonth(startComponents.month)} – ${formatMonth(endComponents.month)} ${startComponents.year}`;
					};
					return `${formatMonth(startComponents.month)} ${startComponents.year} – ${formatMonth(endComponents.month)} ${endComponents.year}`;
				};
				if (hasDuration && isOngoing) {
					return `${formatMonth(startComponents.month)} ${startComponents.year} – Present`;
				};
				return `${formatMonth(startComponents.month)} ${startComponents.year}`;
			case "yearOnly":
				if (hasDuration && endDate && !isOngoing) {
					if (startComponents.year === endComponents.year) {
						return `${startComponents.year}`;
					};
					return `${startComponents.year} – ${endComponents.year}`;
				};
				if (hasDuration && isOngoing) {
					return `${startComponents.year} – Present`;
				};
				return `${startComponents.year}`;
			default:
				return null;
		};
	},
};

export default dateConfig;