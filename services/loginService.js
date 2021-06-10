let client
export default {
	setClient: (newClient) => {
		client = newClient;
	},

	getActualLogin: () => {
		return client.get('login/loggedUser');
	}
}
