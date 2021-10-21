<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<div style="vertical-align: middle">
				<v-row v-if="user && user.login">
					<v-col cols="4" class="uk-text-left" style="padding-top: 25px">
						{{ user.name }} <span style="font-weight: 300">({{ user.login.username }})</span>
					</v-col>
					<!-- OS LINKS PARA VISITAÇÃO DEVEM SER FEITO EM UMA LISTAGEM PARA VISITAÇÃO!! --> 
					<v-col cols="2" class="uk-text-right" style="padding-top: 25px">
						<div>
							<!-- v-if="uuidUser != loggedUserObject.uuid" -->
							<button v-if="!ownUser && notFollowed" class="sc-button sc-button-small sc-button-primary mdi mdi-account-multiple-plus" @click="follow(user)">
								Seguir
							</button>
							<button v-if="!ownUser && !notFollowed" class="sc-button sc-button-small sc-button-primary mdi mdi-account-multiple-minus" @click="unfollow(user)">
								Desseguir
							</button>
						</div>
					</v-col>
					<v-col cols="1" style="text-align: center;">
						<button
							:class="classMoviesHover"
							style="padding-left: 5px; padding-right: 5px; padding-top: 5px; padding-bottom: 5px"
							uk-tooltip="Ver filmes com notas atribuídas"
							@click="redirectPage('/profile/ratings')"
							@mouseover="classMoviesHover = 'md-bg-blue-grey-50 border-radius: 20px'"
							@mouseout="classMoviesHover = ''"
						>
							<span class="mdi mdi-check-circle-outline md-color-green-700"> {{ moviesQtd }}</span><br><span style="color: grey; font-weight: 300">Notas</span>
						</button>
					</v-col>
					<v-col cols="1" style="text-align: center;">
						<button
							:class="classWatchlistHover"
							style="padding-left: 5px; padding-right: 5px; padding-top: 5px; padding-bottom: 5px"
							uk-tooltip="Ver filmes do usuário adicionados à watchlist"
							@click="redirectPage('/profile/watchlist')"
							@mouseover="classWatchlistHover = 'md-bg-blue-grey-50 border-radius: 20px'"
							@mouseout="classWatchlistHover = ''"
						>
							<span class="mdi mdi-bookmark-plus md-color-yellow-900"> {{ watchlistQtd }}</span> <br><span style="color: grey; font-weight: 300">Watchlist</span>
						</button>
					</v-col>
					<v-col cols="1" style="text-align: center;">
						<button
							:class="classFavoriteMoviesHover"
							style="padding-left: 5px; padding-right: 5px; padding-top: 5px; padding-bottom: 5px"
							uk-tooltip="Ver filmes do usuário favoritados"
							@click="redirectPage('/profile/favoritesMovies')"
							@mouseover="classFavoriteMoviesHover = 'md-bg-blue-grey-50 border-radius: 20px'"
							@mouseout="classFavoriteMoviesHover = ''"
						>
							<span class="mdi mdi-heart-half-full md-color-red-700"> {{ favoriteMoviesQtd }} </span>  <br><span style="color: grey; font-weight: 300">Filmes</span>
						</button>
					</v-col>
					<v-col cols="1" style="text-align: center;">
						<button
							:class="classFavoriteArtistsHover"
							style="padding-left: 5px; padding-right: 5px; padding-top: 5px; padding-bottom: 5px"
							uk-tooltip="Ver artistas do usuário favoritados"
							@click="redirectPage('/profile/favoritesPersons')"
							@mouseover="classFavoriteArtistsHover = 'md-bg-blue-grey-50 border-radius: 20px'"
							@mouseout="classFavoriteArtistsHover = ''"
						>
							<span class="mdi mdi-heart-half-full md-color-blue-700"> {{ favoriteArtistsQtd }} </span> <br><span style="color: grey; font-weight: 300">Artistas</span>
						</button>
					</v-col>
					<v-col cols="1" style="text-align: center;">
						<button
							:class="classFollowedsHover"
							style="padding-left: 5px; padding-right: 5px; padding-top: 5px; padding-bottom: 5px"
							uk-tooltip="Ver quem este usuário segue"
							@click="redirectPage('profile/following')"
							@mouseover="classFollowedsHover = 'md-bg-blue-grey-50 border-radius: 20px'"
							@mouseout="classFollowedsHover = ''"
						>
							<span class="mdi mdi-arrow-up-bold-circle-outline"> {{ followedsQtd }} </span>  <br><span style="color: grey; font-weight: 300">Seguindo</span>
						</button>
					</v-col>
					<v-col cols="1" style="text-align: center;">
						<button
							:class="classFollowersHover"
							style="padding-left: 5px; padding-right: 5px; padding-top: 5px; padding-bottom: 5px"
							uk-tooltip="Ver quem segue este usuário"
							@click="redirectPage('/profile/following')"
							@mouseover="classFollowersHover = 'md-bg-blue-grey-50 border-radius: 20px'"
							@mouseout="classFollowersHover = ''"
						>
							<span class="mdi mdi-arrow-down-bold-circle-outline"> {{ followersQtd }} </span> <br><span style="color: grey; font-weight: 300">Seguidores</span>
						</button>
					</v-col>
				</v-row>
			</div>

			<div class="md-bg-blue-grey-50 uk-margin-top">
				<v-row class="sc-padding-left sc-padding-top sc-padding-right">
					<v-col cols="6">
						Últimas avaliações
					</v-col>
					<v-col cols="6" class="uk-text-right">
						<button class="mdi mdi-playlist-plus" style="vertical-align:middle" @click="verifyIfOwnUserToAllRatings()">
							Ver todas as avaliações
						</button>
					</v-col>
				</v-row>
				<div class="uk-child-width-1-5@l sc-padding" data-uk-grid style="">
					<div v-for="index in 5" :key="index" class="tag">
						<v-card 
							v-if="rowsMovies[index] && rowsMovies[index].movie" 
							:uk-tooltip="rowsMovies[index].movie.title" 
							@click="redirectPage('/movies/view/' + rowsMovies[index].movie.uuid)"
						>
							<v-img
								v-if="rowsMovies[index] && rowsMovies[index].movie && rowsMovies[index].movie.imageLink && rowsMovies[index].imageLink != ''"
								height="125px" 
								:src="rowsMovies[index].movie.imageLink"
							>
							</v-img>
							<v-img v-else
								height="100px"
								src="~/assets/img/question.png"
							>
							</v-img>
							<v-card-text v-if="rowsMovies[index] && rowsMovies[index].movie">
								<v-list-item class="grow">
									<v-list-item-content>
										<v-list-item-title>{{ rowsMovies[index].movie.title }}</v-list-item-title>
									</v-list-item-content>
									<v-row
										align="center"
										justify="end"
									>
										{{ rowsMovies[index].rating }}/10
									</v-row>
								</v-list-item>
							</v-card-text>
						</v-card>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import 'vue-good-table/dist/vue-good-table.css'
import LoginService from '@/services/loginService';
import UserMovieRelationService from '@/services/userMovieRelationService';
import UserPersonRelationService from '@/services/userPersonRelationService';
import UserUserRelationService from '@/services/userUserRelationService';
import UserService from '@/services/userService';

export default {
	middleware: "authenticated",
	components: {
	},
	data: () => ({
		ownUser: false,
		user: {},
		userLoaded: false,
		loggedUserObject: {},
		userUserRelation: {},
		rowsFollowers: [],
		waitingFollowersList: false,
		rowsFolloweds: [],
		waitingFollowedsList: false,
		rowsMovies: [],
		waitingMoviesList: false,
		rowsWatchlist: [],
		waitingWatchlist: false,
		rowsFavoriteMovies: [],
		waitingFavoritesMoviesList: false,
		rowsFavoritePersons: [],
		waitingFavoritePersonsList: false,
		moviesQtd: 0,
		watchlistQtd: 0,
		favoriteMoviesQtd: 0,
		favoriteArtistsQtd: 0,
		followersQtd: 0,
		followedsQtd: 0,
		notFollowed: true,
		classMoviesHover: '',
		classWatchlistHover: '',
		classFavoriteMoviesHover: '',
		classFavoriteArtistsHover: '',
		classFollowersHover: '',
		classFollowedsHover: '',
	}),
	computed: {
	},
	mounted () {
		this.uuidUser = this.$route.params.uuid;
		if (this.uuidUser){
			this.findUserByUuid(this.uuidUser);
		} else {
			this.ownUser = true;
		}
		this.loggedUser();
	},
	methods: {
		findUserByUuid (uuid) {
			if (uuid) {
				UserService.findByUuid(uuid)
					.then(response => {
						this.user = response.data;
						if (this.user)
						    this.callEverythingAfterTakeUser();
						if (this.loggedUserObject){
							this.searchUserUserRelation(this.loggedUserObject.uuid, this.uuidUser);
						}
					})
					.catch(e => {
						var message = "Não foi possível encontrar o usuário específico.";
						if (e.response && e.response.status === 400) {
							message = e.response.data.message;
						}
						this.showNotification(message, 'bottom-right', 'danger')
					});
			} 
		},
		loggedUser (){
			LoginService.getActualLogin()
				.then(response => {
					UserService.findByLoginUuid(response.data.uuid)
						.then(response => {
							this.loggedUserObject = response.data;
							if (this.ownUser){
							    this.user = response.data;
								if (this.user)
						            this.callEverythingAfterTakeUser();
							} else {
								if (this.user && this.loggedUserObject.uuid){
									this.searchUserUserRelation(this.loggedUserObject.uuid, this.uuidUser);
								}
							}
						})
						.catch(e => {
							var message = "Não foi possível buscar o usuário logado.";
							if (e.response && e.response.status === 400) {
								message = e.response.data.message;
							}
							this.showNotification(message, 'bottom-right', 'danger')
						});
				})
				.catch(e => {
					var message = "Não foi possível buscar o usuário logado.";
					if (e.response && e.response.status === 400) {
						message = e.response.data.message;
					}
					this.showNotification(message, 'bottom-right', 'danger')
				});
		},
		callEverythingAfterTakeUser (){
			this.userLoaded = true;
			this.listRatings(this.user.uuid);
			this.listWatchlist(this.user.uuid);
			this.listFollowedsByFollower(this.user.uuid);
			this.listFollowersByFollowed(this.user.uuid);
			this.listFavoriteMovies(this.user.uuid);
			this.listFavoritePersons(this.user.uuid);
		},
		listRatings (uuid) {
			this.waitingMoviesList = true ; 
			UserMovieRelationService.findRatingsUser(uuid)
				.then(response => {
					this.rowsMovies = response.data;
					this.moviesQtd = this.rowsMovies.length;
					this.waitingMoviesList = false ; 
				})
				.catch(e => {
					var message = "Não foi possível listar os filmes do usuário.";
					if (e.response && e.response.status === 400) {
						message = e.response.data.message;
					}
					this.waitingMoviesList = false ; 
					this.showNotification(message, 'bottom-right', 'danger');
				});
		},
		listWatchlist (uuid) {
			this.waitingWatchlist = true ; 
			UserMovieRelationService.findWatchlistUser(uuid)
				.then(response => {
					this.rowsWatchlist = response.data; 
					this.watchlistQtd = this.rowsWatchlist.length;
					this.waitingWatchlist = false;
				})
				.catch(e => {
					var message = "Não foi possível listar a watchlist do usuário.";
					if (e.response && e.response.status === 400) {
						message = e.response.data.message;
					}
					this.waitingWatchlist = false ; 
					this.showNotification(message, 'bottom-right', 'danger');
				});
		},
		listFollowedsByFollower (uuid) {
			this.waitingFollowedsList = true;
			UserUserRelationService.findFollowedsByFollower(uuid)
				.then(response => {
					this.rowsFolloweds = response.data;
					this.waitingFollowedsList = false;
					this.followedsQtd = this.rowsFolloweds.length;
				})
				.catch(e => {
					var message = "Não foi possível realizar a busca dos usuários que você segue.";
					if (e.response && e.response.status === 400) {
						message = e.response.data.message;
					}
					this.waitingFollowedsList = false ; 
					this.showNotification(message, 'bottom-right', 'danger');
				});
		},
		listFollowersByFollowed (uuid) {
			this.waitingFollowersList = true;
			UserUserRelationService.findFollowersByFollowed(uuid)
				.then(response => {
					this.rowsFollowers = response.data;
					this.followersQtd = this.rowsFollowers.length;
				})
				.catch(e => {
					var message = "Não foi possível realizar a buscado dos usuários que seguem você.";
					if (e.response && e.response.status === 400) {
						message = e.response.data.message;
					}
					this.waitingFollowersList = false ; 
					this.showNotification(message, 'bottom-right', 'danger');
				});
		},
		listFavoriteMovies (uuid) {
			this.waitingFavoritesMoviesList = true; 
			UserMovieRelationService.findFavoritesUserByMovieType(uuid, 'MOVIE')
				.then(response => {
					this.rowsFavoriteMovies = response.data; 
					this.favoriteMoviesQtd = this.rowsFavoriteMovies.length;
					this.waitingFavoritesMoviesList = false ; 
				})
				.catch(e => {
					var message = "Não foi possível listar os filmes favoritos do usuário.";
					if (e.response && e.response.status === 400) {
						message = e.response.data.message;
					}
					this.waitingFavoritesMoviesList = false ; 
					this.showNotification(message, 'bottom-right', 'danger');
				});
		},
		listFavoritePersons (uuid) {
			this.waitingFavoritePersonsList = true; 
			UserPersonRelationService.findFavoritesUser(uuid)
				.then(response => {
					this.rowsFavoritePersons = response.data; 
					this.favoriteArtistsQtd = this.rowsFavoritePersons.length;
					this.waitingFavoritePersonsList = false;
				})
				.catch(e => {
					var message = "Não foi possível listar os artistas favoritos do usuário.";
					if (e.response && e.response.status === 400) {
						message = e.response.data.message;
					}
					this.waitingFavoritePersonsList = false;
					this.showNotification(message, 'bottom-right', 'danger');
				});
		},
		searchUserUserRelation (follower, followed){
			console.log(follwer, followed);
			UserUserRelationService.findFollowersByFollowedUuid(follower, followed)
				.then(response => {
					if (response.data == [] || response.data.length == 0){
						this.notFollowed = true;
						this.userUserRelation = {};
					} else {
						this.notFollowed = false;
						this.userUserRelation = response.data[0];
					}
				})
				.catch(e => {
					var message = "Não foi possível obter a relação entre os usuários.";
					if (e.response && e.response.status === 400) {
						message = e.response.data.message;
					}
					this.showNotification(message, 'bottom-right', 'danger');
				});
		},
		follow (){
			if (this.loggedUserObject && this.user){
				this.userUserRelation.followerUuid = this.loggedUserObject.uuid;
				this.userUserRelation.followerName = this.loggedUserObject.name;
				this.userUserRelation.followedUuid = this.user.uuid;
				this.userUserRelation.followedName = this.user.name;
				UserUserRelationService.save(this.userUserRelation)
					.then(response => {
						if (response.data && response.data.uuid){
							this.notFollowed = false;
							this.userUserRelation = response.data;
						}
					})
					.catch(e => {
						var message = "Não foi possível seguir o usuário";
						if (e.response && e.response.status === 400) {
							message = e.response.data.message;
						}
						this.showNotification(message, 'bottom-right', 'danger');
					});
			}
		},
		unfollow (){
			if (this.user && this.loggedUserObject){
				UserUserRelationService.removeByUuid(this.loggedUserObject.uuid, this.user.uuid)
					.then(response => {
						this.showNotification("Você deixou de seguir o usuário", 'bottom-right', 'success');
						this.listFollowedsByFollower(this.uuidUser);
						this.listFollowersByFollowed(this.uuidUser);
					})
					.catch(e => {
						var message = "Não foi possível parar de seguir o usuário";
						if (e.response && e.response.status === 400) {
							message = e.response.data.message;
						}
						this.showNotification(message, 'bottom-right', 'danger');
					});
			}
		},
		verifyIfOwnUserToAllRatings (){
			if (this.ownUser){
				this.redirectPage('/profile/ratings/');
			} else {
				this.redirectPage('/visitor/ratings/' + this.uuidUser);
			}
		},
		redirectPage (page) {
			this.$router.push({ path: page });
		},
		openTab (url) {
			window.open(url, '_blank').focus();
		},
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
	}
}
</script>

<style lang="scss">
    .img-custom{
        border-radius: 8px;
        display: block;
        margin-left: auto;
        margin-right: auto;
    }

    img:hover {
        box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);
    }

	.border-style{
		border-style: groove;
		width: 100%;
		margin-left: 5px;
		padding-left: 5px;
	}
</style>