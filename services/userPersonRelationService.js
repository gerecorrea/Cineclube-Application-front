let client
export default {
	setClient: (newClient) => {
		client = newClient;
	},

	save: (userPersonRelation) => {
		return client.post('userPerson/', userPersonRelation);
	},

	changeFavorite: (uuid) => {
		return client.post('userPerson/changeFavorite/' + uuid);
	}, 

	remove: (uuid) => {
		return client.delete('userPerson/' + uuid)
	},

	findByUuid: (uuid) => {
		return client.get('userPerson/findByUuid/' + uuid);
	},

	findByUuidResponseEntity: (uuid) => {
		return client.get('userPerson/findByUuid/ResponseEntity/' + uuid);
	},

	findByUserUuidAndPersonUuid: (userUuid, personUuid) => {
		return client.get('userPerson/findByUserAndPerson/' + userUuid + '/' + personUuid)
	},
	findFavoritesUser: (userUuid) => {
		return client.get('userPerson/findFavorites/' + userUuid);
	},
}


