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
	list: (currentPage, perPage, field, type, name, numberDoc) => {
		return client.get('user?page-index=' + currentPage + '&result-size=' + perPage + '&field=' + field 
        +'&type=' + type + '&name=' + name + '&numberDoc=' +numberDoc);
	},

	findByTenant: () => {
		return client.get('user/findByTenant');
	},

	findByUuid: (uuid) => {
		return client.get('user/' + uuid);
	},

	findByLoginUuid: (uuid) => {
		return client.get('user/login/' + uuid);
	},

	inactivate: (uuid) => {
		return client.delete('user/' + uuid)
	},

	activate: (uuid) => {
		return client.put('user/activate/' + uuid)
	},

	changeAdmin: (uuid) => {
		return client.put('user/admin/' + uuid);
	},

	saveUnauthenticated: (user) => {
		return client.post('user/register', user);
	},
}
