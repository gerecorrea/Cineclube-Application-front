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

	remove: (uuid) => {
		return client.delete('user/' + uuid)
	},
	
	findAll: () => {
		return client.get('user/findAll');
	},

	findByUuid: (uuid) => {
		return client.get('user/' + uuid);
	},

	findByLoginUuid: (uuid) => {
		return client.get('user/login/' + uuid);
	},


	activate: (uuid) => {
		return client.put('user/activateInactivate/' + uuid)
	},

	changeAdmin: (uuid) => {
		return client.put('user/admin/' + uuid);
	},

	saveUnauthenticated: (user) => {
		return client.post('user/register', user);
	},
}
