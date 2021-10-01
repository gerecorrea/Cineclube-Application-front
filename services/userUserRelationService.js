let client
export default {
	setClient: (newClient) => {
		client = newClient;
	},

	save: (userUserRelation) => {
		return client.post('userUserRelation', userUserRelation);
	},

	removeByUuid: (uuid) => {
		return client.delete('userUserRelation/' + uuid)
	},

	removeByEntity: (userUserRelation) => {
		return client.delete('userUserRelation/', userUserRelation)
	},

	findFollowersByFollowed: (uuid) => {
		return client.get('userUserRelation/listFollowersByFollowed/' + uuid);
	},

	findFollowedsByFollower: (uuid) => {
		return client.get('userUserRelation/listFollowedsByFollower/' + uuid);
	},

	findFollowersByFollowedUuid: (follower, followed) => {
		return client.get('userUserRelation/listFollowerFollowed/' + follower + '/' + followed);
	},
}


