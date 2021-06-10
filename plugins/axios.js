const Cookie = process.client ? require("js-cookie") : undefined;
export default function ({ $axios, store, redirect  }) {
	$axios.onRequest((config) => {
		if (store.state.token) {
			config.headers.common['Authorization'] = `Bearer ${store.state.token}`
		}
	})
	$axios.onError(error => {
		if(error.response.status === 401 || error.response.status === 403) {
			store.commit("setToken", null);
			Cookie.remove("token");
			redirect('/login?'+ error.response.status)
		}
	})
}