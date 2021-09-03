let client
export default {
	setClient: (newClient) => {
		client = newClient;
	},

	save: (moviePerson) => {
		return client.post('moviePersonRelation', moviePerson);
	},

	findByUuid: (uuid) => {
		return client.get('moviePersonRelation/findByUuid/' +uuid);
	},

	findByMovieUuid: (uuid) => {
		return client.get('moviePersonRelation/findByMovieUuid/' + uuid);
	},
	
	findByPersonUuid: (uuid) => {
		return client.get('moviePersonRelation/findByPersonUuid/' + uuid);
	},

	findByMovieUuidAndJob: (uuid, job) => {
		return client.get('moviePersonRelation/findByMovieUuidAndJob?job=' + job + '&uuid=' + uuid );
	},

	findByPersonUuidAndJob: (uuid, job) => {
		return client.get('moviePersonRelation/findByPersonUuidAndJob' + uuid + "?job=" + job);
	},

	findByJob: () => {
		return client.get('moviePersonRelation/findByJob?job=' + job);
	}

}
