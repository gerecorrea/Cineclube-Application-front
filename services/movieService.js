let client
export default {
	setClient: (newClient) => {
		client = newClient;
	},

	findAll: () => {
		return client.get('movie/findAll');
	}
}