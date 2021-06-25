<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			HEYYYYY

			<div class="uk-child-width-1-2@m uk-grid sc-padding" data-uk-grid>
				<v-card 
					width="50vh" 
					height="100px" 
					class="uk-text-large uk-text-warning uk-text-uppercase uk-text-center sc-padding"
					color="#2AAFC3"
					@click="redirectPage('/movies/all')"
				>
					Listar filmes poarrrr!
				</v-card>
				<v-spacer />

				<v-card 
					width="50vh" 
					height="100px" 
					class="uk-text-large uk-text-warning uk-text-uppercase uk-text-center sc-padding"
					color="#385F73"
					@click="redirectPage('/profile/all')"
				>
					Listar usuários poarrrr!
				</v-card>
				<v-spacer />

				<v-card 
					width="50vh" 
					height="100px" 
					class="uk-text-large uk-text-warning uk-text-uppercase uk-text-center sc-padding"
					color="green darken-2"
					@click="redirectPage('/person/all')"
				>
					Listar estrelas poarrrr!
				</v-card>
				<v-spacer />
			</div>

			<div>
			</div>
		</div>
	</div>
</template>

<script>
import 'vue-good-table/dist/vue-good-table.css'
import MovieService from '@/services/movieService'

export default {
	middleware: "authenticated",
	components: {
	},
	data: () => ({
	
	}),
	computed: {
	},
	mounted () {
		setTimeout(() => {
			this.appMounted = true;
			console.log(this);
		}, 200);
		this.findAllMovies();
	},
	methods: {
		showDetails (object){
			this.showObjectDetails = object;
			this.dialogShowDetails = true;
		},
		showNotification (text, pos, status, persistent) {
			var config = {};
			config.timeout = persistent ? !persistent : 3000;
			if(status) {
				config.status = status;
			}
			if(pos) {
				config.pos = pos;
			}
			UIkit.notification(text, config);
		},
		findAllMovies (){
			MovieService.findAll().then
			MovieService.findAll()
				.then(response => {
					console.log(response.data)
				})
				.catch(e => {
					var message = "Houve um erro inesperado.";
					if (e.response && e.response.status === 400) {
						message = e.response.data.message;
					}
				});
		},
		redirectPage (page) {
			console.log(page)
			this.$router.push({ path: page });
		},
	}
}
</script>

