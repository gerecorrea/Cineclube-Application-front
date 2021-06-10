let client
export default {
	setClient: (newClient) => {
		client = newClient;
	},
	save: (tenant) => {
		return client.post('tenant', tenant);
	},
	update: (uuid, tenant) => {
		return client.put('tenant/' + uuid, tenant);
	},
	list: (currentPage, perPage, field, type) => {
		return client.get('tenant?page-index=' + currentPage + '&result-size=' + perPage + '&field=' + field + '&type=' + type);
	},
	listTenantLoggedUser: () => {
		return client.get('tenant/loggeduser');
	},
	findByUuid: (uuid) => {
		return client.get('tenant/' + uuid);
	},
	saveUnauthenticated: (unregisteredTenant) => {
		return client.post('register-tenant/tenant', unregisteredTenant);
	},
}
