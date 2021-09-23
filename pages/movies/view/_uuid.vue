<template>
	<div id="sc-page-wrapper" class="md-bg-black-0">
		<div 
			id="sc-page-top-bar"
			class="sc-top-bar"
			data-uk-sticky="offset:48; show-on-up: true; animation: uk-animation-slide-top-medium"
		>
			<div class="sc-top-bar-content uk-flex uk-flex-1">
				<div class="sc-top-bar-title uk-flex-1">
					<Title v-if="uuidMovie" :title="movie.title"></Title>
				</div>
			</div>
		</div>
        
		<div id="sc-page-content">
			<div data-uk-grid>
				<div class="uk-text-center">
					<div v-if="movie.imageLink" class="uk-width-1" style="border-style: solid; background-color: black">
						<img :src="movie.imageLink"
							class="img-custom"
							alt=""
						>
					</div>
				</div>

			
				<div class="uk-width-auto uk-text-left md-color-white-0 title-custom sc-padding">
					<div class="uk-width-1-1">
						{{ movie.title }}
					</div>
				</div>
				<v-spacer />
				<div class="uk-width-auto uk-text-right sc-padding sc-padding-remove-right" style="padding-top: 30px">
					<div>
						<button v-if="movieUser.watchlist"
							class="sc-padding-remove uk-button md-color-yellow-700 mdi mdi-bookmark-check md-color-black-0"
							style="margin-right: 0px"
							uk-tooltip="Retirar da watchlist"
							@click="movieUser.watchlist = false, changeWatchlist()"
						>
						</button>
						<button v-else
							class="sc-padding-remove uk-button md-color-white-0 mdi mdi-bookmark-plus-outline md-color-black-0"
							style="margin-right: 0px"
							uk-tooltip="Adicionar à watchlist"
							@click="movieUser.watchlist = true, changeWatchlist()"
						></button>
						<button v-if="movieUser.favorite"
							class="sc-padding-remove uk-button md-color-red-700 mdi mdi-heart md-color-black-0"
							uk-tooltip="Desfavoritar"
							@click="movieUser.favorite = false, saveUserMovie()"
						>
						</button>
						<button v-if="!movieUser.favorite"
							class="sc-padding-remove uk-button md-color-white-0 mdi mdi-heart-outline md-color-black-0"
							uk-tooltip="Favoritar"
							@click="movieUser.favorite = true, saveUserMovie()"
						>
						</button>
					</div>
				</div>
				
				<div class="uk-width-auto sc-padding md-color-white-0 title-custom4-5 uk-text-right">
					<button class="uk-button md-bg-yellow-800  md-color-black-0" style="margin-right: 15px">
						<button v-if="movieUser.rating == 0"
							class="mdi mdi-star-outline title-custom3"
							uk-tooltip="Sua avaliação"
							@click="dialogAvaliate = true"
						>
							Avaliar
						</button>
						<button v-if="movieUser.rating != 0"
							class="mdi mdi-star md-color-black-0 title-custom3-5"
							uk-tooltip="Sua avaliação"
							@click="dialogAvaliate = true"
						>
							{{ movieUser.rating }}
						</button>
					</button>
					<span class="uk-text-right" uk-tooltip="Nota média dos usuários">
						{{ movie.avgRating }} / 10
					</span>
					<span class="md-color-grey-400 subtitle-custom" uk-tooltip="Total de votos">
						({{ movie.numVotes }})
					</span>
				</div>

				<div class="uk-width-1-1">
					<span class="md-color-grey-400 subtitle-custom uk-text-left" style="margin-right: 30px" uk-tooltip="Ano - Duração - País">
						{{ movie.year }} - {{ movie.runtime }} minutos - {{ movie.country }}
					</span>
					<div v-for="index in movie.genresArray"
						:key="index"
						class="uk-label uk-label-warning md-color-black"
						style="margin-right: 5px;"
					>
						{{ index }}
					</div>
				</div>

				<div class="uk-width-1-1 sc-padding uk-height-small">
					<span class="md-color-grey-50 subtitle-custom uk-text-left" uk-tooltip="Sinopse">
						{{ movie.synopsis }}
					</span>
				</div>

				<div class="uk-width-1-1 sc-padding md-color-white-0">
					<div class="uk-width-1-1">
						<span>Direção: 
							<span v-for="i in directors"
								:key="i"
								class="md-color-blue-200"
								style="margin-right: 5px;"
							>
								<button @click="redirectPage('/person/view/' + i.personUuid)">
									{{ i.personName }}
								</button>
							</span>
						</span>
					</div>
					<div class="uk-width-1-1">
						<span>Roteiristas: 
							<span v-for="i in writers"
								:key="i"
								class="md-color-blue-200"
								style="margin-right: 5px;"
							>
								<button @click="redirectPage('/person/view/' + i.personUuid)">
									{{ i.personName }};
								</button>
							</span>
						</span>
					</div>
					<div class="uk-width-1-1">
						<span>Elenco: 
							<span v-for="i in actors"
								:key="i"
								class="md-color-blue-200"
								style="margin-right: 5px;"
							>
								<button @click="redirectPage('/person/view/' + i.personUuid)">
									{{ i.personName }};
								</button>
							</span>
						</span>
					</div>
					<div class="uk-width-1-1">
						<span>Produtores: 
							<span v-for="i in producers"
								:key="i"
								class="md-color-blue-200"
								style="margin-right: 5px;"
							>
								<button @click="redirectPage('/person/view/' + i.personUuid)">
									{{ i.personName }};
								</button>
							</span>
						</span>
					</div>
				</div>
			</div>
		</div>

		<v-dialog
			v-model="dialogAvaliate"
			width="45%"
			persistent
			scrollable
			style="z-index: 1500"
		>
			<v-card>
				<v-card-title class="uk-modal-title">
					Avalie o filme e contribua!
				</v-card-title>
				<v-spacer />
				<v-card-subtitle>
					{{ movie.title }}
				</v-card-subtitle>

				<v-card-text class="text--primary">
					<div>
						<StarRating v-model="ratingAux" :settings="{ number: 10 }"></StarRating>
					</div>
					<div v-if="ratingAux != 0" class="sc-padding-top md-color-blue-grey-600" style="font-size: 28px; padding-top: 25px">
						{{ ratingAux }}/10
					</div>
				</v-card-text>
                
				<v-card-actions class="sc-padding-top">
					<v-spacer></v-spacer>
					<div>
						<button class="sc-button sc-button-light sc-button-flat-danger" type="button" @click="dialogAvaliate = false">
							Voltar
						</button>
					</div>
					<div>
						<button :disabled="!movieUser.uuid || movieUser.rating == 0"
							class="sc-button sc-button-light sc-button-flat-primary"
							type="button"
							@click="ratingAux = 0, movieUser.isRated = false, checkRemoveRating()"
						>
							Remover avaliação
						</button>
					</div>
					<div class="" style="padding-left: 3px">
						<button class="sc-button sc-button-light sc-button-flat-success"
							type="button"
							@click="movieUser.rated = true, movieUser.rating = ratingAux, saveUserMovie()"
						>
							Salvar nota
						</button>
					</div>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import Title from '~/components/Title';

import LoginService from "@/services/loginService";
import UserService from "@/services/userService";
import MovieService from "@/services/movieService";
import UserMovieRelationService from "@/services/userMovieRelationService";
import MoviePersonRelationService from "@/services/moviePersonService";

import {facade} from 'vue-input-facade'

import Vue from 'vue';

export default {
	middleware: "authenticated",
	components: {
		Title,
		StarRating: process.client ? () => import('~/components/Raty') : null
	},
	directives: {facade},
	data () {
		return {
			uuidMovie: '',
			ratingAux: 0,
			movie: {
				uuid: '',
				title: '', // OK
				runtime: 0, //OK
				year: 0, //OK por tabela
				genres: '', //OK
				genresArray: [], //OK
				movieTypeArray: [], //OK
				movieType: '', //OK
				country: '', //OK
				language: '', //OK
				isReleased: '', //OK por tabela
				synopsis: '', //OK
				dateReleasedUnformatted: '', //OK
				dateReleased: '', //OK
				imageLink: '', // OK
				// Aqui na equipe de produção será um array de objetos com cada uma das inserções, tendo movie_uuid, person_uuid e cargo.
				actors: '',
				actorsNames: '',
				directors: '',
				directorsNames: '',
				writes: '',
				writersNames: '',
				producers: '',
				producersNames: '',
				numVotes: 0,
				avgRating: 0,
			},
			okPrincipal: false,
			okSecundary: false,
			okProduction: false,
			dialogConfirmSave: false,
			enableSave: true,
			loggedUserObject: {},
			notification: {
				title: '',
				description: ''
			},
			directors: [],
			actors: [],
			writers: [],
			producers: [],
			selfs: [],
			genreTypes: [
				{value: "COMEDY", text: "Comédia"},
				{value: "SCI_FI", text: "Ficção Científica"},
				{value: "HORROR", text: "Terror"},
				{value: "ROMANCE", text: "Romance"},
				{value: "ACTION", text: "Ação"},
				{value: "THRILLER", text: "Thriller"},
				{value: "DRAMA", text: "Drama"},
				{value: "MYSTERY", text: "Mistério"},
				{value: "CRIME", text: "Crime"},
				{value: "ANIMATION", text: "Animação"},
				{value: "ADVENTURE", text: "Aventura"},
				{value: "FANTASY", text: "Fantasia"},
				{value: "SUPERHERO", text: "Super-herói"},
			],
			movieTypes: [
				{value: "MOVIE", text: "Filme"},
				{value: "SHORT", text: "Curta"},
				{value: "DOCUMENTARY", text: "Documentário"},
				{value: "VIDEO", text: "Vídeo"},
			],
			dialogAvaliate: false,
			movieUser: {
				uuid: '',
				movieUuid: '',
				userUuid: '',
				rating: 0,
				favorite: false,
				watchlist: false,
				isRated: false,
				movieType: '',
			}
		}
	},
	mounted () {
		this.uuidMovie = this.$route.params.uuid;
		this.findMovieByUuid(this.uuidMovie);
	},
	methods: {
		findMovieByUuid (uuid){
			if (uuid) {
				MovieService.findByUuid(uuid)
					.then(response => {
						this.movie = response.data;
						this.movie.dateReleasedUnformatted = new Date(response.data.dateReleased).toLocaleString().slice(0, 10);
						this.movieUser.movieUuid = this.movie.uuid;
						this.movieUser.movieType = this.movie.movieType;
						this.findMovieArtistsRelations(this.movie.uuid);
						this.loggedUser();
					})
					.catch(e => {
						var message = "Houve um erro inesperado.";
						if (e.response && e.response.status === 400) {
							message = e.response.data.message;
						}
						this.showNotification(message, 'bottom-right', 'danger')
					});
			}
		},
		findMovieArtistsRelations (uuid){
			MoviePersonRelationService.findByMovieUuid(uuid)
				.then(response => {
					console.log(response.data)
					if (response.data && response.data.length > 0){
						response.data.forEach(obj => {
							if (obj.job == "DIRECTOR")
								this.directors.push(obj);
							else if (obj.job == "WRITER")
								this.writers.push(obj);
							else if (obj.job == "ACTOR")
								this.actors.push(obj);
							else if (obj.job == "PRODUCER")
								this.producers.push(obj);
							else if (obj.job == "SELF")
								this.selfs.push(obj);
						});
					}
					
				})
				.catch(e => {
					var message = "Houve um erro inesperado.";
					if (e.response && e.response.status === 400) {
						message = e.response.data.message;
					}
					this.showNotification(message, 'bottom-right', 'danger')
				});
			
		},
		loggedUser (){
			LoginService.getActualLogin()
				.then(response => {
					UserService.findByLoginUuid(response.data.uuid)
						.then(response => {
							this.loggedUserObject = response.data;
							this.movieUser.userUuid = this.loggedUserObject.uuid;
							this.findMovieUserRelation(); 
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
		formatDate (date){
			let dateAux = new Array;
			dateAux[0] = date.slice(0, 2); // Dia
			dateAux[1] = date.slice(3, 5); // Mês
			dateAux[2] = date.slice(6, 10); // Ano
			return dateAux[2] + '-' + dateAux[1] + '-' + dateAux[0];
		},
		alreadyRelased (todayDate, dataReleased){
			let todayArr = new Array;
			todayArr[0] = todayDate.slice(0, 4);
			todayArr[1] = todayDate.slice(5, 7);
			todayArr[2] = todayDate.slice(8, 10);
			
			let releasedArr = new Array;
			releasedArr[0] = dataReleased.slice(0, 4);
			releasedArr[1] = dataReleased.slice(5, 7);
			releasedArr[2] = dataReleased.slice(8, 10);

			if (parseInt(todayArr[0], 10) >= parseInt(releasedArr[0], 10)){
				if (parseInt(todayArr[0], 10) > parseInt(releasedArr[0], 10)) return true;
				else if (parseInt(todayArr[0], 10) == parseInt(releasedArr[0], 10) && parseInt(todayArr[1], 10 >= parseInt(releasedArr[1], 10))){
					if (parseInt(todayArr[1], 10) > parseInt(releasedArr[1], 10))return true;
					else if (parseInt(todayArr[1], 10) == parseInt(releasedArr[1], 10) && parseInt(todayArr[2], 10) >= parseInt(releasedArr[2], 10))return true;
					else return false;
				} else return false;
			}else return false;
		},
		redirectPage (page) {
			this.$router.push({ path: page });
		},
		findMovieUserRelation (){
			UserMovieRelationService.findByUserUuidAndMovieUuid(this.movieUser.userUuid, this.movieUser.movieUuid)
				.then(response => {
					if (response.data != null){
						this.movieUser = response.data;
						this.ratingAux = this.movieUser.rating;
					}
				})
				.catch(e => {
					var message = "Não foi possível obter a relação do usuário com este filme.";
					if (e.response && e.response.status === 400) {
						message = e.response.data.message;
					}
					this.showNotification(message, 'bottom-right', 'danger')
				});
		},
		saveUserMovie (){
			UserMovieRelationService.save(this.movieUser)
				.then(response => {
					this.dialogAvaliate = false;
					this.movieUser = response.data;
					this.ratingAux = this.movieUser.rating;
					this.showNotification("Salvo com sucesso!", 'bottom-right', 'success');
					this.findMovieByUuid(this.uuidMovie);
				})
				.catch(e => {
					var message = "Não foi possível salvar os dados do filme para este usuário.";
					if (e.response && e.response.status === 400) {
						message = e.response.data.message;
					}
					this.showNotification(message, 'bottom-right', 'danger')
				});
		},
		changeFavorite (){
			if (this.movieUser.uuid){
				UserMovieRelationService.changeFavorite(this.movieUser.uuid)
					.then(response => {
						let message;
						if (response.data == false) message = "Ocorreu um erro na operação!";
						else if (this.movieUser.favorite) message = "Filme adicionado aos favoritos!";
						else if (!this.movieUser.favorite) message = "Filme retirado dos favoritos!";
						this.showNotification(message, 'bottom-right', 'success');
						this.findMovieByUuid(this.uuidMovie);
					})
					.catch(e => {
						var message = "Não foi possível realizar a operação.";
						if (e.response && e.response.status === 400) {
							message = e.response.data.message;
						}
						this.showNotification(message, 'bottom-right', 'danger')
					});
			}else{
				this.saveUserMovie();
			}
		},
		changeWatchlist (){
			if (this.movieUser.uuid){
				UserMovieRelationService.changeWatchlist(this.movieUser.uuid)
					.then(response => {
						let message;
						if (response.data == false) message = "Ocorreu um erro na operação.";
						else if (this.movieUser.watchlist) message = "Filme adicionado à watchlist!";
						else if (!this.movieUser.watchlist) message = "Filme retirado da watchlist!";
						this.showNotification(message, 'bottom-right', 'success');
						this.findMovieByUuid(this.uuidMovie);
					})
					.catch(e => {
						var message = "Não foi possível realizar a operação.";
						if (e.response && e.response.status === 400) {
							message = e.response.data.message;
						}
						this.showNotification(message, 'bottom-right', 'danger')
					});
			}else{
				this.saveUserMovie();
			}
		},
		changeRating (rating){
			if (this.movieUser.uuid){
				UserMovieRelationService.changeRating(this.movieUser.uuid, rating)
					.then(response => {
						this.dialogAvaliate = false;
						this.ratingAux = rating;
						let message;
						if (response.data == false) message = "Ocorreu um erro na operação.";
						else if (this.movieUser.rating != 0) message = "Nota Atribuída!";
						else if (this.movieUser.rating == 0) message = "Nota retirada!";
						this.showNotification(message, 'bottom-right', 'success')
						this.findMovieByUuid(this.uuidMovie);
					})
					.catch(e => {
						var message = "Não foi possível realizar a operação.";
						if (e.response && e.response.status === 400) {
							message = e.response.data.message;
						}
						this.showNotification(message, 'bottom-right', 'danger')
					});
			}else{
				this.saveUserMovie();
			}
		},
		checkRemoveRating (){
			if (this.movieUser.rating != 0 && this.ratingAux == 0){
				this.movieUser.rating = this.ratingAux;
				this.saveUserMovie();
			}
		}
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

    .title-custom{
        font-size: 6.5vh;
    }

	.title-custom4-5{
        font-size: 4.5vh;
    }

	.title-custom3-5{
        font-size: 3.5vh;
    }

	.title-custom3{
        font-size: 3.0vh;
    }

    .subtitle-custom2-5{
        font-size: 2.5vh;
    }
</style>

