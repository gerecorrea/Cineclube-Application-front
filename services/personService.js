let client
export default {
	setClient: (newClient) => {
		client = newClient;
	},

	save: (person) => {
		return client.post('person', person);
	},

	update: (uuid, person) => {
		return client.put('person/' + uuid, person);
	},

	remove: (uuid) => {
		return client.delete('person/' + uuid)
	},

	findAll: () => {
		return client.get('person/findAll');
	},

	findByUuid: (uuid) => {
		return client.get('person/findByUuid/' +uuid);
	},

	findById: (uuid) => {
		return client.get('person/findById/' +uuid);
	},
}
