<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<div style="padding-right: 12px">
				<v-row style="vertical-align: middle">
					<v-col cols="9">
						<div class="md-bg-blue-grey-100 uk-margin-top">
							<v-row class="sc-padding-left sc-padding-top sc-padding-right">
								<v-col cols="6">
									<h4>
										Últimos filmes lançados
									</h4>
								</v-col>
								<v-col cols="6" class="uk-text-right">
									<button class="mdi mdi-playlist-plus" style="vertical-align:middle" @click="redirectPage('/movies/all')">
										Ver todos os filmes
									</button>
								</v-col>
							</v-row>
							<div class="uk-child-width-1-5@l uk-child-width-1-5@m uk-child-width-1-1@s sc-padding" data-uk-grid style="">
								<div v-for="(item, index) in actual5moviesShowed" :key="item" class="tag">
									<v-card 
										v-if="item" 
										:uk-tooltip="item.title" 
										type="button"
										@dblclick="redirectPage('/movies/view/' + item.uuid)"
									>	
										<v-img
											v-if="item && item.imageLink && item.imageLink != ''"
											height="125px" 
											:src="item.imageLink"
										>
											<div v-if="index == 0 && last25moviesBegin > 0" style="padding-top: 55px">
												<button 
													class="uk-text-left mdi mdi-arrow-left-drop-circle-outline mdi-48px md-color-black" 
													style="opacity: 0.55" 
													uk-tooltip="Filmes mais novos"
													@click="moviesByDateReleasedDescToLeft()"
												>
												</button>
											</div>
											<div v-if="index == 4 && last25moviesEnd < last25movies.length" style="padding-top: 55px" class="uk-text-right">
												<button 
													class="mdi mdi-arrow-right-drop-circle-outline mdi-48px md-color-black" 
													style="opacity: 0.55" 
													uk-tooltip="Filmes mais antigos"
													@click="moviesByDateReleasedDescToRight()"
												>
												</button>
											</div>
										</v-img>
										<v-img v-else
											height="100px"
											src="~/assets/img/question.png"
										>
											<div v-if="index == 0 && last25moviesBegin > 0" style="padding-top: 55px">
												<button 
													class="uk-text-left mdi mdi-arrow-left-drop-circle-outline mdi-48px md-color-black" 
													style="opacity: 0.55" 
													uk-tooltip="Filmes mais novos"
													@click="moviesByDateReleasedDescToLeft()"
												>
												</button>
											</div>
											<div v-if="index == 4 && last25moviesEnd < last25movies.length" style="padding-top: 55px" class="uk-text-right">
												<button 
													class="mdi mdi-arrow-right-drop-circle-outline mdi-48px md-color-black" 
													style="opacity: 0.55" 
													uk-tooltip="Filmes mais antigos"
													@click="moviesByDateReleasedDescToRight()"
												>
												</button>
											</div>
										</v-img>
										<v-card-text>
											<v-list-item class="grow">
												<v-list-item-content>
													<v-list-item-title>{{ item.title }}</v-list-item-title>
												</v-list-item-content>
												<v-row
													v-if="item.avgRating"
													align="center"
													justify="end"
												>
													{{ item.avgRating }}/10
												</v-row>
											</v-list-item>
										</v-card-text>
									</v-card>
								</div>
							</div>
						</div>
					</v-col>
					<v-col cols="3" class="uk-margin-top md-bg-blue-grey-100 sc-padding" style="margin-bottom: 12px">
						<h5 class="uk-text-center uk-text-bold">
							USUÁRIO
						</h5>
						<button class="sc-button sc-button-primary sc-button-large sc-button-block waves-effect waves-button waves-light" @click="redirectPage('/profile/dashboard/')">
							Perfil
						</button>
						<button class="sc-button sc-button-primary sc-button-large sc-button-block waves-effect waves-button waves-light" @click="redirectPage('/profile/watchlist/')">
							Watchlist
						</button>
						<button class="sc-button sc-button-primary sc-button-large sc-button-block waves-effect waves-button waves-light" @click="redirectPage('/profile/ratings/')">
							Avaliações
						</button>
						<button class="sc-button sc-button-primary sc-button-large sc-button-block waves-effect waves-button waves-light" @click="redirectPage('/profile/following/')">
							Seguidores
						</button>
					</v-col>
				</v-row>
			</div>

			<div>
				<div class="md-bg-blue-grey-100 uk-margin-top">
					<v-row class="sc-padding-left sc-padding-top sc-padding-right">
						<v-col cols="6">
							<h4>
								Mais recentes da sua lista de desejos
							</h4>
						</v-col>
						<v-col cols="6" class="uk-text-right">
							<button class="mdi mdi-playlist-plus" style="vertical-align:middle" @click="redirectPage('/profile/watchlist')">
								Ver toda a lista de desejos
							</button>
						</v-col>
					</v-row>
					<div class="uk-child-width-1-5@l uk-child-width-1-5@m uk-child-width-1-1@s sc-padding" data-uk-grid style="">
						<div v-for="(item, index) in actual5WatchlistShowed" :key="item" class="tag">
							<v-card 
								v-if="item && item.movie" 
								:uk-tooltip="item.movie.title" 
								type="button"
								@dblclick="redirectPage('/movies/view/' + item.movie.uuid)"
							>	
								<v-img
									v-if="item && item.movie && item.movie.imageLink && item.movie.imageLink != ''"
									height="125px" 
									:src="item.movie.imageLink"
								>
									<div v-if="index == 0 && last25WatchlistBegin > 0" style="padding-top: 55px">
										<button 
											class="uk-text-left mdi mdi-arrow-left-drop-circle-outline mdi-48px md-color-black" 
											style="opacity: 0.55" 
											uk-tooltip="Voltar"
											@click="watchlistByDateReleasedDescToLeft()"
										>
										</button>
									</div>
									<div v-if="index == 4 && last25WatchlistEnd < last25Watchlist.length" style="padding-top: 55px" class="uk-text-right">
										<button 
											class="mdi mdi-arrow-right-drop-circle-outline mdi-48px md-color-black" 
											style="opacity: 0.55" 
											uk-tooltip="Avançar"
											@click="watchlistByDateReleasedDescToRight()"
										>
										</button>
									</div>
								</v-img>
								<v-img v-else
									height="100px"
									src="~/assets/img/question.png"
								>
									<div v-if="index == 0 && last25WatchlistBegin > 0" style="padding-top: 55px">
										<button 
											class="uk-text-left mdi mdi-arrow-left-drop-circle-outline mdi-48px md-color-black" 
											style="opacity: 0.55" 
											uk-tooltip="Voltar"
											@click="changingWatchlistPage = true, watchlistByDateReleasedDescToLeft()"
										>
										</button>
									</div>
									<div v-if="index == 4 && last25WatchlistEnd < last25Watchlist.length" style="padding-top: 55px" class="uk-text-right">
										<button 
											class="mdi mdi-arrow-right-drop-circle-outline mdi-48px md-color-black" 
											style="opacity: 0.55" 
											uk-tooltip="Avançar"
											:disabled="changingWatchlistPage"
											@click="changingWatchlistPage = true, watchlistByDateReleasedDescToRight()"
										>
										</button>
									</div>
								</v-img>
								<v-card-text>
									<v-list-item class="grow">
										<v-list-item-content>
											<v-list-item-title>{{ item.movie.title }}</v-list-item-title>
										</v-list-item-content>
										<v-row
											v-if="item.movie.avgRating"
											align="center"
											justify="end"
										>
											{{ item.movie.avgRating }}/10
										</v-row>
									</v-list-item>
								</v-card-text>
							</v-card>
						</div>
					</div>
				</div>
			</div>

			<div>
				<div class="md-bg-blue-grey-100 uk-margin-top">
					<v-row class="sc-padding-left sc-padding-top sc-padding-right">
						<v-col cols="6">
							<h4>
								Filmes com melhores notas
							</h4>
						</v-col>
						<v-col cols="6" class="uk-text-right">
							<button class="mdi mdi-playlist-plus" style="vertical-align:middle" @click="redirectPage('/movies/topRatingMovie')">
								Ver todos os filmes com melhores notas
							</button>
						</v-col>
					</v-row>
					<div class="uk-child-width-1-5@l uk-child-width-1-5@m uk-child-width-1-1@s sc-padding" data-uk-grid style="">
						<div v-for="(item, index) in actual5bestMoviesShowed" :key="item" class="tag">
							<v-card 
								v-if="item && item.title" 
								:uk-tooltip="item.title" 
								type="button"
								@dblclick="redirectPage('/movies/view/' + item.movie.uuid)"
							>	
								<v-img
									v-if="item && item.imageLink && item.imageLink != ''"
									height="125px" 
									:src="item.imageLink"
								>
									<div v-if="index == 0 && best25moviesRatingBegin > 0" style="padding-top: 55px">
										<button 
											class="uk-text-left mdi mdi-arrow-left-drop-circle-outline mdi-48px md-color-black" 
											style="opacity: 0.55" 
											uk-tooltip="Voltar"
											@click="moviesByBestRatingDescToLeft()"
										>
										</button>
									</div>
									<div v-if="index == 4 && best25moviesRatingEnd < best25moviesRating.length" style="padding-top: 55px" class="uk-text-right">
										<button 
											class="mdi mdi-arrow-right-drop-circle-outline mdi-48px md-color-black" 
											style="opacity: 0.55" 
											uk-tooltip="Avançar"
											@click="moviesByBestRatingDescToRight()"
										>
										</button>
									</div>
								</v-img>
								<v-img v-else
									height="125px"
									src="~/assets/img/question.png"
								>
									<div v-if="index == 0 && best25moviesRatingBegin > 0" style="padding-top: 55px">
										<button 
											class="uk-text-left mdi mdi-arrow-left-drop-circle-outline mdi-48px md-color-black" 
											style="opacity: 0.55" 
											uk-tooltip="Voltar"
											@click="moviesByBestRatingDescToLeft()"
										>
										</button>
									</div>
									<div v-if="index == 4 && best25moviesRatingEnd < best25moviesRating.length" style="padding-top: 55px" class="uk-text-right">
										<button 
											class="mdi mdi-arrow-right-drop-circle-outline mdi-48px md-color-black" 
											style="opacity: 0.55" 
											uk-tooltip="Avançar"
											@click="moviesByBestRatingDescToRight()"
										>
										</button>
									</div>
								</v-img>
								<v-card-text>
									<v-list-item class="grow">
										<v-list-item-content>
											<v-list-item-title>{{ item.title }}</v-list-item-title>
										</v-list-item-content>
										<v-row
											v-if="item.avgRating"
											align="center"
											justify="end"
										>
											{{ item.avgRating }}/10
										</v-row>
									</v-list-item>
								</v-card-text>
							</v-card>
						</div>
					</div>
				</div>
			</div>

			<div>
				<div class="md-bg-blue-grey-100 uk-margin-top">
					<v-row class="sc-padding-left sc-padding-top sc-padding-right">
						<v-col cols="6">
							<h4>
								Artistas mais favoritados
							</h4>
						</v-col>
						<v-col cols="6" class="uk-text-right">
							<button class="mdi mdi-playlist-plus" style="vertical-align:middle" @click="redirectPage('/person/topFavorites')">
								Ver todos os artistas mais favoritados
							</button>
						</v-col>
					</v-row>
					<div class="uk-child-width-1-5@l uk-child-width-1-5@m uk-child-width-1-1@s sc-padding" data-uk-grid style="">
						<div v-for="(item, index) in actual5BestArtistsShowed" :key="item" class="tag">
							<v-card 
								v-if="item && item.name" 
								:uk-tooltip="item.name" 
								type="button"
								@dblclick="redirectPage('/person/view/' + item.uuid)"
							>	
								<v-img
									v-if="item && item.imageLink && item.imageLink != ''"
									height="125px" 
									:src="item.imageLink"
								>
									<div v-if="index == 0 && best25ArtistsRatingBegin > 0" style="padding-top: 55px">
										<button 
											class="uk-text-left mdi mdi-arrow-left-drop-circle-outline mdi-48px md-color-black" 
											style="opacity: 0.55" 
											uk-tooltip="Voltar"
											@click="artistsByFavoritationsDescToLeft()"
										>
										</button>
									</div>
									<div v-if="index == 4 && best25ArtistsRatingEnd < best25ArtistsRating.length" style="padding-top: 55px" class="uk-text-right">
										<button 
											class="mdi mdi-arrow-right-drop-circle-outline mdi-48px md-color-black" 
											style="opacity: 0.55" 
											uk-tooltip="Avançar"
											@click="artistsByFavoritationsDescToRight()"
										>
										</button>
									</div>
								</v-img>
								<v-img v-else
									height="100px"
									src="~/assets/img/question.png"
								>
									<div v-if="index == 0 && best25ArtistsRatingBegin > 0" style="padding-top: 55px">
										<button 
											class="uk-text-left mdi mdi-arrow-left-drop-circle-outline mdi-48px md-color-black" 
											style="opacity: 0.55" 
											uk-tooltip="Voltar"
											@click="artistsByFavoritationsDescToLeft()"
										>
										</button>
									</div>
									<div v-if="index == 4 && best25ArtistsRatingEnd < best25ArtistsRating.length" style="padding-top: 55px" class="uk-text-right">
										<button 
											class="mdi mdi-arrow-right-drop-circle-outline mdi-48px md-color-black" 
											style="opacity: 0.55" 
											uk-tooltip="Avançar"
											@click="artistsByFavoritationsDescToRight()"
										>
										</button>
									</div>
								</v-img>
								<v-card-text>
									<v-list-item class="grow">
										<v-list-item-content>
											<v-list-item-title>{{ item.name }}</v-list-item-title>
										</v-list-item-content>
										<v-row
											v-if="item.numFavorites"
											align="center"
											justify="end"
										>
											{{ item.numFavorites }}
										</v-row>
									</v-list-item>
								</v-card-text>
							</v-card>
						</div>
					</div>
				</div>
			</div>

			<div>
				<div class="md-bg-blue-grey-100 uk-margin-top">
					<v-row class="sc-padding-left sc-padding-top sc-padding-right">
						<v-col cols="6">
							<h4>
								Parcerias e divulgações
							</h4>
						</v-col>
					</v-row>
					<div class="uk-child-width-1-4@l uk-child-width-1-4@m uk-child-width-1-4@s sc-padding uk-text-center" data-uk-grid style="">
						<div v-for="(item) in specialAccess" :key="item" class="tag">
							<button 
								v-if="item && item.name" 
								:uk-tooltip="item.name" 
								type="button"
								@click="openTab(item.link)"
							>	
								<v-img
									height="100px"
									width="100px"
									:src="require(`@/assets/img/${item.src}`)"
								>
								</v-img>
							</button>
						</div>
					</div>
				</div>
			</div>
					

			<div>
			</div>
		</div>
	</div>
</template>

<script>
import 'vue-good-table/dist/vue-good-table.css'
import LoginService from "@/services/loginService"
import MovieService from '@/services/movieService';
import UserMovieRelationService from "@/services/userMovieRelationService";
import PersonService from '@/services/personService';

export default {
	middleware: "authenticated",
	components: {
	},
	data: () => ({
		loggedUserObject: {},
		userLoaded: false,
		last25movies: [],
		actual5moviesShowed: [],
		last25moviesBegin: 0,
		last25moviesEnd: 0,
		last25Watchlist: [],
		actual5WatchlistShowed: [],
		last25WatchlistBegin: 0,
		last25WatchlistEnd: 0,
		best25moviesRating: [],
		best25moviesRatingBegin: 0,
		best25moviesRatingEnd: 0,
		actual5bestMoviesShowed: [],
		best25ArtistsRating: [],
		best25ArtistsRatingBegin: 0,
		best25ArtistsRatingEnd: 0,
		actual5BestArtistsShowed: [],
		specialAccess: [
			{name: 'Github do criador', src: 'github.png', link: 'https://github.com/gerecorrea'},
			{name: 'Linkedin do criador', src: 'linkedin.png', link: 'https://www.linkedin.com/in/geremias-corr%C3%AAa-6474341bb/'},
			{name: 'Cineclube CCT', src: 'logoCine.png', link: 'https://www.instagram.com/cineclubecct/'},
			{name: 'UDESC', src: 'udesc.png', link: 'https://www.udesc.br/'},
		],
	}),
	computed: {
	},
	mounted () {
		this.loggedUser();
		this.findFirst25MoviesByDateReleasedDesc();
		this.best25MoviesByRating();
		this.most25ArtistsByFavoritations();
	},
	methods: {
		loggedUser (){
			LoginService.getActualLogin()
				.then(response => {
					this.loggedUserObject = response.data.user;
					this.userLoaded = true;
					if(this.loggedUserObject){
						this.findFirst25WatchlistByDateReleasedDesc(this.loggedUserObject.uuid);
					}
				})
				.catch(e => {
					var message = "Não foi possível buscar o usuário logado.";
					if (e.response && e.response.status === 400) {
						message = e.response.data.message;
					}
					this.showNotification(message, 'bottom-right', 'danger')
				});
		},
		findFirst25MoviesByDateReleasedDesc (){
			MovieService.findFirst25MoviesByDateReleasedDesc()
				.then(response => {
					this.last25movies = response.data;
					this.last25moviesBegin = 0;
					if (this.last25movies.length > 5)
						this.last25moviesEnd = 5;
					else
						this.last25moviesEnd = this.last25movies.length;
					this.actual5moviesShowed = [];
					this.updateVectorLast25Movies();
				})
				.catch(e => {
					var message = "Não foi possível obter os últimos lançamentos.";
					if (e.response && e.response.status === 400) {
						message = e.response.data.message;
					}
				});
		},
		moviesByDateReleasedDescToRight (){
			this.last25moviesBegin += 5;
			this.last25moviesEnd += 5;
			if (this.last25moviesEnd > this.last25movies.length){
				this.last25moviesEnd = this.last25movies.length;
				this.last25moviesBegin = this.last25moviesEnd - 5;
			}
			this.updateVectorLast25Movies();
		},
		moviesByDateReleasedDescToLeft (){
			this.last25moviesBegin -= 5;
			this.last25moviesEnd -= 5;
			if (this.last25moviesBegin < 0){
				this.last25moviesBegin = 0;
				this.last25moviesEnd = 5;
			}
			this.updateVectorLast25Movies();
			
		},
		updateVectorLast25Movies (){
			this.actual5moviesShowed = [];
			for(let i = this.last25moviesBegin; i < this.last25moviesEnd; i++){
				this.actual5moviesShowed.push(this.last25movies[i]);
			}
		},
		best25MoviesByRating () {
			MovieService.findTopBestRatedByLimit(25)
				.then(response => {
					this.best25moviesRating = response.data;
					this.best25moviesRatingBegin = 0;
					if (this.best25moviesRating.length > 5)
						this.best25moviesRatingEnd = 5;
					else
						this.best25moviesRatingEnd = this.best25moviesRating.length;
					this.actual5bestMoviesShowed = [];
					this.updateVectorBest25Movies();
				})
				.catch(e => {
					var message = "Não foi possível listar os 25 melhores filmes ranqueados.";
					if (e.response && e.response.status === 400) {
						message = e.response.data.message;
					}
					this.showNotification(message, 'bottom-right', 'danger');
				});
		},
		moviesByBestRatingDescToRight (){
			this.best25moviesRatingBegin += 5;
			this.best25moviesRatingEnd += 5;
			if (this.best25moviesRatingEnd > this.best25moviesRating.length){
				this.best25moviesRatingEnd = this.best25moviesRating.length;
				this.best25moviesRatingBegin = this.best25moviesRatingEnd - 5;
			}
			this.updateVectorBest25Movies();
		},
		moviesByBestRatingDescToLeft (){
			this.best25moviesRatingBegin -= 5;
			this.best25moviesRatingEnd -= 5;
			if (this.best25moviesRatingBegin < 0){
				this.best25moviesRatingBegin = 0;
				this.best25moviesRatingEnd = 5;
			}
			this.updateVectorBest25Movies();
			
		},
		updateVectorBest25Movies (){
			this.actual5bestMoviesShowed = [];
			for(let i = this.best25moviesRatingBegin; i < this.best25moviesRatingEnd; i++){
				this.actual5bestMoviesShowed.push(this.best25moviesRating[i]);
			}
		},
		findFirst25WatchlistByDateReleasedDesc (uuid){
			UserMovieRelationService.findFirst25WatchlistUser(uuid)
				.then(response => {
					this.last25Watchlist = response.data;
					this.last25WatchlistBegin = 0;
					if (this.last25Watchlist.length > 5)
						this.last25WatchlistEnd = 5;
					else
						this.last25WatchlistEnd = this.last25Watchlist.length;
					this.actual5WatchlistShowed = [];
					this.updateVectorLast25Watchlist();
				})
				.catch(e => {
					var message = "Houve um erro inesperado.";
					if (e.response && e.response.status === 400) {
						message = e.response.data.message;
					}
				});
		},
		watchlistByDateReleasedDescToRight (){
			this.last25WatchlistBegin += 5;
			this.last25WatchlistEnd += 5;
			if (this.last25WatchlistEnd > this.last25Watchlist.length){
				this.last25WatchlistEnd = this.last25Watchlist.length;
				this.last25WatchlistBegin = this.last25WatchlistEnd - 5;
			}
			this.updateVectorLast25Watchlist();
		},
		watchlistByDateReleasedDescToLeft (){
			this.last25WatchlistBegin -= 5;
			this.last25WatchlistEnd -= 5;
			if (this.last25WatchlistBegin < 0){
				this.last25WatchlistBegin = 0;
				this.last25WatchlistEnd = 5;
			}
			this.updateVectorLast25Watchlist();
			
		},
		updateVectorLast25Watchlist (){
			this.actual5WatchlistShowed = [];
			for(let i = this.last25WatchlistBegin; i < this.last25WatchlistEnd; i++){
				this.actual5WatchlistShowed.push(this.last25Watchlist[i]);
			}
			this.changingWatchlistPage = false;
		},
		most25ArtistsByFavoritations () {
			PersonService.findTopArtists(25)
				.then(response => {
					this.best25ArtistsRating = response.data;
					this.best25ArtistsRatingBegin = 0;
					if (this.best25ArtistsRating.length > 5)
						this.best25ArtistsRatingBegin = 5;
					else
						this.best25ArtistsRatingEnd = this.best25ArtistsRating.length;
					this.updateVector25Artists();
				})
				.catch(e => {
					var message = "Não foi possível listar os 25 artistas mais favoritados.";
					if (e.response && e.response.status === 400) {
						message = e.response.data.message;
					}
					this.showNotification(message, 'bottom-right', 'danger');
				});
		},
		artistsByFavoritationsDescToRight (){
			this.best25ArtistsRatingBegin += 5;
			this.best25ArtistsRatingEnd += 5;
			if (this.best25ArtistsRatingEnd > this.best25ArtistsRating.length){
				this.best25ArtistsRatingEnd = this.best25ArtistsRating.length;
				this.best25ArtistsRatingBegin = this.best25ArtistsRatingEnd - 5;
			}
			this.updateVector25Artists();
		},
		artistsByFavoritationsDescToLeft (){
			this.best25ArtistsRatingBegin -= 5;
			this.best25ArtistsRatingEnd -= 5;
			if (this.best25ArtistsRatingBegin < 0){
				this.best25ArtistsRatingBegin = 0;
				this.best25ArtistsRatingEnd = 5;
			}
			this.updateVector25Artists();
		},
		updateVector25Artists (){
			this.actual5BestArtistsShowed = [];
			for(let i = this.best25ArtistsRatingBegin; i < this.best25ArtistsRatingEnd; i++){
				this.actual5BestArtistsShowed.push(this.best25ArtistsRating[i]);
			}
		},
		redirectPage (page) {
			this.$router.push({ path: page });
		},
		openTab (url) {
			window.open(url, '_blank').focus();
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
	}
}
</script>
