let client
export default {
	setClient: (newClient) => {
		client = newClient;
	},

	save: (userMovie) => {
		return client.post('userMovie', userMovie);
	},

	changeRating: (uuid, rating) => {
		return client.put('userMovie/changeRating/' + uuid + "/" + rating);
	}, 

	changeFavorite: (uuid) => {
		return client.put('userMovie/changeFavorite/' + uuid);
	}, 

	changeWatchlist: (uuid) => {
		return client.put('userMovie/changeWatchlist/' + uuid);
	}, 

	remove: (uuid) => {
		return client.delete('userMovie/' + uuid)
	},

	findByUuid: (uuid) => {
		return client.get('userMovie/findByUuid/' + uuid);
	},

	findByUuidResponseEntity: (uuid) => {
		return client.get('userMovie/findByUuid/ResponseEntity/' + uuid);
	},

	findByUserUuidAndMovieUuid: (userUuid, movieUuid) => {
		return client.get('userMovie/findByUserAndMovie/' + userUuid + '/' + movieUuid)
	},
	findFavoritesUser: (userUuid) => {
		return client.get('userMovie/findFavorites/' + userUuid);
	},
	findFavoritesUserByMovieType: (userUuid, movieType) => {
		return client.get('userMovie/findFavoritesByMovieType/' + movieType + '/' + userUuid);
	},
	findWatchlistUser: (userUuid) => {
		return client.get('userMovie/findWatchlist/' + userUuid);
	},
	findFirst25WatchlistUser: (userUuid) => {
		return client.get('userMovie/findFirst25Watchlist/' + userUuid);
	},
	findRatingsUser: (userUuid) => {
		return client.get('userMovie/findRatings/' + userUuid);
	}
}


