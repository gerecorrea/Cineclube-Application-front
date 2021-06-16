import { scHelpers } from "~/assets/js/utils";
const { uniqueID } = scHelpers;

export const menuEntries = [
	{
		id: uniqueID(),
		title: "Dashbaord",
		icon: "mdi mdi-view-dashboard md-color-grey-900",
		page: "/dashboard"
	},
	{
		id: uniqueID(),
		title: "Listar filmes",
		page: "/movies/all",
		icon: "mdi mdi-movie md-color-grey-900",
	},
	{
		id: uniqueID(),
		title: "Listar usuários",
		page: "/profile/all",
		icon: "mdi mdi-face-profile md-color-brown-500",
	},
	{
		id: uniqueID(),
		title: "Listar estrelas",
		page: "/person/all",
		icon: "mdi mdi-star-circle md-color-yellow-900",
	},
	{
		id: uniqueID(),
		title: "Top 250",
		page: "/movies/",
		icon: "mdi mdi-certificate md-color-red-700",
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
		title: "Filmes Favoritos",
		page: "/movies/",
	},
	{
		id: uniqueID(),
		title: "Estrelas Favoritas",
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
