const stringConfig = {
	requireString: function(string) {
		if (!string || string?.trim()?.length === 0) { return "Required"; };
		return true;
	},
};

export default stringConfig;