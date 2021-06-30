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
			<div>
				<div>
					<div v-if="movie.imageLink" style="border-style: solid; background-color: black">
						<img :src="movie.imageLink"
							class="img-custom"
							height="100px"
							alt=""
						>
					</div>
					<div>
						<div class="sc-padding md-color-white-0 title-custom sc-padding-remove-bottom uk-text-left">
							{{ movie.title }}
							<span style="float: right">
								<button v-if="true"
									class="sc-padding-remove uk-button md-color-yellow-700 mdi mdi-bookmark-check md-color-black-0"
									style="margin-right: 0px"
									uk-tooltip="Retirar da watchlist"
								>
								</button>
								<button v-else
									class="uk-button md-color-white-0 mdi mdi-bookmark-plus md-color-black-0"
									style="margin-right: 0px"
									uk-tooltip="Adicionar à watchlist"
								></button>
								<button v-if="false"
									class="uk-button md-color-red-700 mdi mdi-heart md-color-black-0"
									style="margin-right: 5px"
									uk-tooltip="Desfavoritar"
								>
								</button>
								<button v-if="true"
									class="uk-button md-color-white-0 mdi mdi-heart-outline md-color-black-0"
									style="margin-right: 5px"
									uk-tooltip="Favoritar"
								>
								</button>
								<button class="uk-button md-bg-yellow-800 mdi mdi-star-outline md-color-black-0" style="margin-right: 25px">
									<span class="md-color-black-0" style="padding-left: 10px; float: right">Avaliar</span>
								</button>
								<span class="uk-text-right">
									{{ movie.avgRating }} / 10
								</span>
							</span>
						</div>
					</div>
				</div>
				<div>
					<span class="sc-padding-left md-color-grey-400 subtitle-custom uk-text-left">
						{{ movie.year }} - {{ movie.runtime }} minutos - {{ movie.country }}
					</span>
					<span class="sc-padding-right md-color-grey-50 subtitle-custom uk-text-center" style="float: right">
						{{ movie.numVotes }} votos
					</span>
				</div>
				<div>
					<span class="sc-padding">
						<div v-for="index in movie.genresArray"
							:key="index"
							class="uk-label uk-label-warning md-color-black"
							style="margin-right: 5px;"
						>
							{{ index }}
						</div>
					</span>
				</div>
				<div class="sc-padding">
					<span class="md-color-grey-50 subtitle-custom uk-text-left">
						{{ movie.synopsis }}
					</span>
				</div>
				<div class="sc-padding md-color-white-0">
					<div>
						<span>Direção: </span>
						<!-- <span v-for="(index, i) in movie.genresArray"
							:key="index"
							class="md-color-white-0"
							style="margin-right: 5px;"
						>
							<span v-if="i != movie.genresArray.length">
								{{ index }},
							</span>
							<span v-else>
								{{ index }}
							</span>
						</span> -->
					</div>
					<div>
						<span>Roteiristas: </span>
					</div>
					<div>
						<span>Atores e atrizes: </span>
					</div>
					<div>
						<span>Direção: </span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Title from '~/components/Title';

import LoginService from "@/services/loginService";
import UserService from "@/services/userService";
import MovieService from "@/services/movieService"

import {facade} from 'vue-input-facade'

import Vue from 'vue';

export default {
	middleware: "authenticated",
	components: {
		Title
	},
	directives: {facade},
	data () {
		return {
			uuidMovie: '',
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
		}
	},
	mounted () {
		this.uuidMovie = this.$route.params.uuid;
		this.findMovieByUuid(this.uuidMovie);
		this.loggedUser();
	},
	methods: {
		findMovieByUuid (uuid){
			if (uuid) {
				MovieService.findByUuid(uuid)
					.then(response => {
						this.movie = response.data;
						this.movie.dateReleasedUnformatted = new Date(response.data.dateReleased).toLocaleString().slice(0, 10);
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
		save (movie){
			if (this.validationToSave(movie)){
				let todayDate = new Date().toLocaleString().slice(0, 10);
				movie.dateReleased = this.formatDate(movie.dateReleasedUnformatted);
				movie.year = parseInt(movie.dateReleased.slice(0, 4), 10);
				//movie.genres = movie.genresArray.split("")
				MovieService.save(movie)
					.then(response => {
				    	this.notification.title = "Sucesso ao salvar filme!";
						this.showNotification(this.notification.title, 'bottom-right', 'success');
						this.$router.push("/movies/all");
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
		validationToSave (movie){
			console.log(this.movie)
			console.log(movie)
			if (movie.title.length == 0) this.notification.title = "Você deve preencher o título.";
			else if (movie.runtime.length == 0) this.notification.title = "Você deve preencher a duração.";
			else if (movie.dateReleasedUnformatted.length != 10) this.notification.title = "Você deve preencher a data de lançamento.";
			else if (movie.country.length == 0) this.notification.title = "Você deve preencher o país de origem.";
			else if (movie.genresArray.length == 0) this.notification.title = "Você deve selecionar ao menos um gênero.";
			else return true;
			this.showNotification(this.notification.title, 'bottom-right', 'danger')
		},
		loggedUser (){
			LoginService.getActualLogin()
				.then(response => {
					UserService.findByLoginUuid(response.data.uuid)
						.then(response => {
							this.loggedUserObject = response.data;
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
		advanceTab (tabRef){
			this.$refs[tabRef].click()
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
			console.log(todayArr)
			
			let releasedArr = new Array;
			releasedArr[0] = dataReleased.slice(0, 4);
			releasedArr[1] = dataReleased.slice(5, 7);
			releasedArr[2] = dataReleased.slice(8, 10);
			console.log(releasedArr)

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
        font-size: 8vh;
    }

    .subtitle-custom{
        font-size: 2.5vh;
    }
</style>

