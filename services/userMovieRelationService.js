let client
export default {
	setClient: (newClient) => {
		client = newClient;
	},

	save: (userMovie) => {
		return client.post('userMovie', userMovie);
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
	}
}


