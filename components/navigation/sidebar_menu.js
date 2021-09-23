import { scHelpers } from "~/assets/js/utils";
const { uniqueID } = scHelpers;

export const menuEntries = [
	{
		id: uniqueID(),
		title: "Dashboard",
		icon: "mdi mdi-view-dashboard md-color-green-700",
		page: "/dashboard"
	},
	{
		id: uniqueID(),
		title: "USUÁRIO",
		page: "/pages",
		isOpen: false,
		level: 0,
		submenu: [
			{
				id: uniqueID(),
				title: "Watchlist",
				page: "/profile/watchlist",
				icon: "mdi mdi-bookmark-plus md-color-yellow-900"
			},
			{
				id: uniqueID(),
				title: "Suas Avaliações",
				page: "/profile/ratings",
				icon: "mdi mdi-star-half md-color-yellow-900"
			},
			{
				id: uniqueID(),
				title: "Filmes Favoritos",
				page: "/profile/favorites",
				icon: "mdi mdi-heart-half-full md-color-red-700"
			},
			{
				id: uniqueID(),
				title: "Documentários Favoritos",
				page: "/profile/favorites",
				icon: "mdi mdi-heart-half-full md-color-purple-700"
			},
			{
				id: uniqueID(),
				title: "Curtas Favoritos",
				page: "/profile/favorites",
				icon: "mdi mdi-heart-half-full md-color-green-700"
			},
			{
				id: uniqueID(),
				title: "Artistas Favoritos",
				page: "/profile/favoritesPersons",
				icon: "mdi mdi-heart-half-full md-color-blue-700"
			},
		]
	},
	{
		id: uniqueID(),
		title: "FILMES",
		page: "/pages",
		isOpen: false,
		level: 0,
		submenu: [
			{
				id: uniqueID(),
				title: "Filmes",
				page: "/movies/all",
				icon: "mdi mdi-movie md-color-grey-900",
			},
			{
				id: uniqueID(),
				title: "Documentários",
				page: "/movies/allDocumentary",
				icon: "mdi mdi-camcorder md-color-purple-700",
			},
			{
				id: uniqueID(),
				title: "Curta-Metragens",
				page: "/movies/allShort",
				icon: "mdi mdi-nature-people md-color-green-700",
			},
			{
				id: uniqueID(),
				title: "Top 10 Notas Geral",
				page: "/movies/topRatings",
				icon: "mdi mdi-filmstrip md-color-yellow-900",
			},
			{
				id: uniqueID(),
				title: "Top 10 Favoritos Geral",
				page: "/movies/topFavorites",
				icon: "mdi mdi-heart-box-outline md-color-yellow-900",
			},
			{
				id: uniqueID(),
				title: "Top 10 Notas Filmes",
				page: "/movies/topRatingMovie",
				icon: "mdi mdi-movie md-color-red-700",
			},
		]
	},
	{
		id: uniqueID(),
		title: "ARTISTAS",
		page: "/pages",
		isOpen: false,
		level: 0,
		submenu: [
			{
				id: uniqueID(),
				title: "Listar artistas",
				page: "/person/all",
				icon: "mdi mdi-star-circle md-color-blue-700",
			},
			{
				id: uniqueID(),
				title: "Top 10 Artistas",
				page: "/person/topFavorites",
				icon: "mdi mdi-heart-box md-color-blue-700",
			},
		]
	},
	{
		id: uniqueID(),
		title: "CONFIGURAÇÃO",
		page: "/pages",
		isOpen: false,
		level: 0,
		submenu: [
			{
				id: uniqueID(),
				title: "Listar usuários",
				page: "/profile/all",
				icon: "mdi mdi-face-profile md-color-brown-500",
			},
		]
	},

];
