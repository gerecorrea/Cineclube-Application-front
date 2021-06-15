import { scHelpers } from "~/assets/js/utils";
const { uniqueID } = scHelpers;

export const menuEntries = [
	{
		id: uniqueID(),
		title: "Dashbaord",
		icon: "mdi mdi-view-dashboard",
		page: "/dashboard"
	},
	{
		id: uniqueID(),
		title: "Listar filmes",
		page: "/movies/listAll",
		icon: "mdi mdi-movie",
	},
	{
		id: uniqueID(),
		title: "Listar usuários",
		page: "/profile/listAllUsers",
		icon: "mdi mdi-face-profile",
	},
	{
		id: uniqueID(),
		title: "Top 250",
		page: "/movies/",
	},
	{
		id: uniqueID(),
		title: "Listar usuários",
		page: "/movies/",
	},
	{
		id: uniqueID(),
		title: "My ratings",
		page: "/movies/",
	},
	{
		id: uniqueID(),
		title: "Watchlist",
		page: "/movies/",
	},
	{
		id: uniqueID(),
		title: "Favoritos",
		page: "/movies/",
	},
	{
		id: uniqueID(),
		title: "FILMES",
		page: "/pages",
		icon: "mdi mdi-database",
		isOpen: false,
		level: 0,
		submenu: [
			{
				id: uniqueID(),
				title: "Listar todos",
				page: "/movies/listAll",
				icon: "mdi mdi-movie",
			},
		]
	},
];
