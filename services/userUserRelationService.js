let client
export default {
	setClient: (newClient) => {
		client = newClient;
	},

	save: (userUserRelation) => {
		return client.post('userUserRelation', userUserRelation);
	},

	removeByUuid: (follower, followed) => {
		return client.delete('userUserRelation/' + follower + '/' + followed);
	},

	removeByEntity: (userUserRelation) => {
		return client.delete('userUserRelation/removeByRelation', userUserRelation);
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


