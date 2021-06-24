let client
export default {
	setClient: (newClient) => {
		client = newClient;
	},

	save: (movie) => {
		return client.post('movie', movie);
	},

	update: (uuid, movir) => {
		return client.put('movie/' + uuid, movie);
	},

	remove: (uuid) => {
		return client.delete('movie/' + uuid)
	},

	findAll: () => {
		return client.get('movie/findAll');
	}
}
