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
							<div class="uk-child-width-1-5@l sc-padding" data-uk-grid style="">
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
						<button class="sc-button sc-button-primary sc-button-large sc-button-block waves-effect waves-button waves-light" @click="redirectPage('/profile/dashboard/')">
							Watchlist
						</button>
						<button class="sc-button sc-button-primary sc-button-large sc-button-block waves-effect waves-button waves-light" @click="redirectPage('/profile/dashboard/')">
							Avaliações
						</button>
						<button class="sc-button sc-button-primary sc-button-large sc-button-block waves-effect waves-button waves-light" @click="redirectPage('/profile/dashboard/')">
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
					<div class="uk-child-width-1-5@l sc-padding" data-uk-grid style="">
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
			</div>
		</div>
	</div>
</template>

<script>
import 'vue-good-table/dist/vue-good-table.css'
import LoginService from "@/services/loginService"
import MovieService from '@/services/movieService';
import UserMovieRelationService from "@/services/userMovieRelationService";

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
	}),
	computed: {
	},
	mounted () {
		this.loggedUser();
		this.findFirst25MoviesByDateReleasedDesc();
	},
	methods: {
		loggedUser (){
			LoginService.getActualLogin()
				.then(response => {
					console.log(response.data);
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
			console.log(this.last25moviesEnd, this.last25movies.length)
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
		findFirst25WatchlistByDateReleasedDesc (uuid){
			UserMovieRelationService.findFirst25WatchlistUser(uuid)
				.then(response => {
					console.log(response.data);
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
			console.log(this.last25WatchlistEnd, this.last25Watchlist.length)
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
			console.log(this.actual5WatchlistShowed);
			this.changingWatchlistPage = false;
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
