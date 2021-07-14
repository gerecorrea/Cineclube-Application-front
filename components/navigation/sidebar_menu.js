import { scHelpers } from "~/assets/js/utils";
const { uniqueID } = scHelpers;

export const menuEntries = [
	{
		id: uniqueID(),
		title: "Dashboard",
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
		title: "Favoritos do usuário",
		page: "/profile/favorites",
		icon: "mdi mdi-heart-half-full md-color-red-700"
	},
	{
		id: uniqueID(),
		title: "Top 10",
		icon: "mdi mdi-certificate md-color-red-700",
	},
	{
		id: uniqueID(),
		title: "My ratings",
		icon: "mdi mdi-script md-color-blue-800"
	},
	{
		id: uniqueID(),
		title: "Watchlist",
		icon: "mdi mdi-bookmark-plus md-color-yellow-800"
	},
	{
		id: uniqueID(),
		title: "Estrelas Favoritas",
		icon: "mdi mdi-account-star md-color-green-600"
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
				icon: "mdi mdi-movie",
			},
		]
	},
];
