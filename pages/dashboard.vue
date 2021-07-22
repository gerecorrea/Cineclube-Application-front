<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<div class="uk-child-width-1-3@m uk-grid sc-padding uk-margin" style="padding-right: 15px" data-uk-grid>
				<v-row>
					<v-col cols="4">
						<v-card 
							width="50vh" 
							height="100px" 
							class="uk-text-large uk-text-warning uk-text-uppercase uk-text-center sc-padding md-color-white"
							color="#385F73"
							@click="redirectPage('/movies/all')"
						>
							<img src="~/assets/img/movie_1.png" width="80px" class="sc-padding-right">
							Filmes
						</v-card>
					</v-col>

					<v-col cols="4">
						<v-card 
							width="50vh" 
							height="100px" 
							class="uk-text-large uk-text-warning uk-text-uppercase uk-text-center sc-padding md-color-black"
							color="#22bbcc"
							@click="redirectPage('/person/all')"
						>
							<img src="~/assets/img/man.png" width="80px" class="sc-padding-right">
							Estrelas
						</v-card>
					</v-col>
					<v-col cols="4">
						<v-card 
							width="50vh" 
							height="100px" 
							class="uk-text-large uk-text-warning uk-text-uppercase uk-text-center sc-padding md-color-white"
							color="green darken-2"
							@click="redirectPage('/profile/all')"
						>
							<img src="~/assets/img/user.png" width="80px" class="sc-padding-right">
							Usuários da aplicação
						</v-card>
					</v-col>

					<v-col cols="4">
						<v-card 
							width="50vh" 
							height="100px" 
							class="uk-text-large uk-text-warning uk-text-uppercase uk-text-center sc-padding md-bg-deep-orange-a700 md-color-black"
							color="#2AAFC3"
							@click="redirectPage('/movies/all')"
						>
							<img src="~/assets/img/rating.png" width="80px" class="sc-padding-right">
							Notas do usuário
						</v-card>
					</v-col>

					<v-col cols="4">
						<v-card 
							width="50vh" 
							height="100px" 
							class="uk-text-large uk-text-warning uk-text-uppercase uk-text-center sc-padding md-color-black"
							color="#DDCCDD"
							@click="redirectPage('/profile/favorites')"
						>
							<img src="~/assets/img/movie_2.png" width="80px" class="sc-padding-right">
							Favoritos do usuário
						</v-card>
					</v-col>
					<v-col cols="4">
						<v-card 
							width="50vh" 
							height="100px" 
							class="uk-text-large uk-text-warning uk-text-uppercase uk-text-center sc-padding md-bg-deep-purple-400 md-color-white"
							@click="openTab('http://www.gnccinemas.com.br/index.php/home')"
						>
							<img src="~/assets/img/movie-tickets.png" width="80px" class="sc-padding-right">
							GNC Cinemas
						</v-card>
					</v-col>
				</v-row>
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
			MovieService.findAllMovie()
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
		openTab (url) {
			window.open(url, '_blank').focus();
		}
	}
}
</script>

