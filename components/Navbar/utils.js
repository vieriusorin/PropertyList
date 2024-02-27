export const links = [
	{
		href: "/",
		label: "Home",
	},
	{
		href: "/properties",
		label: "Properties",
	},
	{
		href: "/properties/add",
		label: "Add Property",
	},
];

export const customLinks = (isLoggedIn) => {
	if (!isLoggedIn) {
		return links.filter((link) => link.href !== "/properties/add");
	} else {
		return links;
	}
};
