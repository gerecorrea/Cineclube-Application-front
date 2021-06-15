let client
export default {
	setClient: (newClient) => {
		client = newClient;
	},

	save: (user) => {
		return client.post('user', user);
	},
	update: (uuid, user) => {
		return client.put('user/' + uuid, user);
	},

	findAll: () => {
		return client.get('user/findAll');
	},

	findByUuid: (uuid) => {
		return client.get('user/' + uuid);
	},
}
