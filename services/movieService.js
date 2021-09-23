let client
export default {
	setClient: (newClient) => {
		client = newClient;
	},

	save: (movie) => {
		return client.post('movie', movie);
	},

	findByUuid: (uuid) => {
		return client.get('movie/findByUuid/' +uuid);
	},

	update: (uuid, movir) => {
		return client.put('movie/' + uuid, movie);
	},

	remove: (uuid) => {
		return client.delete('movie/' + uuid)
	},

	findAllMovie: () => {
		return client.get('movie/findAllMovies');
	},

	findAllMovieByFilter: (title, country,
		yearMin, yearMax, durationMin, durationMax, 
		numVotesMin, numVotesMax, avgRatingMin, avgRatingMax
	) => {
		return client.get('movie/findAllByFilter?title=' + title + "&country=" + country
		+ "&yearMin=" + yearMin + "&yearMax=" + yearMax + "&durationMin=" + durationMin + "&durationMax=" + durationMax
		+ "&numVotesMin=" + numVotesMin + "&numVotesMax=" + numVotesMax + "&avgRatingMin=" + avgRatingMin + "&avgRatingMax=" + avgRatingMax);
	},

	findTop10: () => {
		return client.get('movie/findTop10');
	},

	findTopFavoriteAll: () => {
		return client.get('/movie/findTopFavoriteAll');
	},

	findTopRatingAll: () => {
		return client.get('/movie/findTopRatingAll');
	},

	findAllDocumentary: () => {
		return client.get('movie/findAllDocumentary');
	},

	findAllShort: () => {
		return client.get('movie/findAllShort');
	},
}
