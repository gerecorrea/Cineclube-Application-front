<template>
	<div id="sc-page-wrapper" class="md-color-blue-grey-400">
		<div 
			id="sc-page-top-bar"
			class="sc-top-bar"
			data-uk-sticky="offset:48; show-on-up: true; animation: uk-animation-slide-top-medium"
		>
			<div class="sc-top-bar-content uk-flex uk-flex-1">
				<div class="sc-top-bar-title uk-flex-1">
					<Title v-if="!uuidMovie" title="Cadastro de Filme"></Title>
					<Title v-if="uuidMovie" title="Edição de Filme"></Title>
				</div>
			</div>
		</div>
        
		<div id="sc-page-content">
			<div>
				<ScCard>
					<ScCardBody>
						<ul data-uk-tab="animation: uk-animation-slide-left-small, uk-animation-fade">
							<li class="uk-active">
								<a ref="tab1" href="javascript:void(0)">
									Dados principais
								</a>
							</li>
							<li>
								<a ref="tab2" href="javascript:void(0)">
									Dados secundários
								</a>
							</li>
							<li>
								<a ref="tab3" href="javascript:void(0)">
									Dados de produção
								</a>
							</li>
						</ul>
						<ul class="uk-switcher">
							<li>
								<fieldset class="uk-fieldset md-bg-blue-grey-100 sc-padding">
									<p class="sc-text-semibold uk-text-large uk-margin-remove-top">
										Dados principais
									</p>
									<p class="sc-text-semibold uk-text-small">
										* Campos obrigatórios
									</p>
									<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
										<div class="uk-form-controls">
											<v-text-field
												v-model="movie.title" 
												name="movieTitle"
												label="Título*"
												hint="Campo obrigatório."
												filled
											>
											</v-text-field>
										</div>
										<div class="uk-form-controls">
											<v-text-field
												v-model="movie.runtime" 
												name="movieRuntime"
												label="Tempo de duração* (minutos)"
												hint="Campo obrigatório."
												filled
											>
											</v-text-field>
										</div>
										<div class="uk-form-controls">
											<v-row>
												<v-col class="col-6">
													<v-text-field 
														v-model="movie.dateReleasedUnformatted" 
														v-facade="['##/##/####']"
														name="movieDateReleased"
														label="Data de lançamento*"
														hint="Campo obrigatório composto por 8 dígitos."
														filled
													>
													</v-text-field>
												</v-col>
												<v-col class="col-6">
													<div style="float:right;">
														<v-checkbox 
															v-model="movie.isReleased"
															class="p-switch"
															style="float:right;"
															label="Já foi oficialmente lançado"
														/>
													</div>
												</v-col>
											</v-row>
										</div>
										<div class="uk-form-controls">
											<v-text-field 
												v-model="movie.country" 
												name="movieCountry"
												label="País*"
												hint="Campo obrigatório."
												filled
											>
											</v-text-field>
										</div>
										<div class="uk-form-controls">
											<v-text-field 
												v-model="movie.language" 
												name="movieLanguage"
												label="Idioma"
												filled
											>
											</v-text-field>
										</div>
										<div class="uk-form-controls">
											<v-textarea 
												v-model="movie.synopsis" 
												name="movieSynopsis"
												label="Sinopse"
												filled
												:hint="movie.synopsis.length +'/1000 caracteres preenchidos.'" 
											>
											</v-textarea>
										</div>
									</div>
									<div class="uk-margin-top uk-text-right" style="float: right">
										<button 
											class="sc-button sc-button-custom md-bg-grey-600" 
											type="button" 
											data-uk-tooltip="Avançar para a próxima aba"
											@click="advanceTab('tab2')"
										>
											Avançar
											<i class="mdi mdi-arrow-right"></i>
										</button>
									</div>
								</fieldset>
							</li>
							<li>
								<fieldset class="uk-fieldset md-bg-blue-grey-100 sc-padding">
									<p class="sc-text-semibold uk-text-large uk-margin-remove-top">
										Dados secundários
									</p>
									<p class="sc-text-semibold uk-text-small">
										* Campos obrigatórios
									</p>
									<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
										<div class="uk-form-controls">
											<v-autocomplete
												v-model="movie.genresArray"
												:items="genreTypes"
												name="movieGenres"
												item-value="value"
												item-text="text"
												label="Selecione os gêneros*"
												hint="Obrigatória seleção de ao menos um gênero."
												style="z-index:11;"
												multiple
												chips
												deletable-chips
												clearable
												filled
											>
											</v-autocomplete>
										</div>
										<div class="uk-form-controls">
											<v-autocomplete
												v-model="movie.movieType"
												:items="movieTypes"
												name="movieType"
												item-value="value"
												item-text="text"
												label="Selecione o tipo de filme"
												style="z-index:11;"
												chips
												deletable-chips
												clearable
												filled
											>
											</v-autocomplete>
										</div>
										<div class="uk-form-controls">
											<v-text-field 
												v-model="movie.imageLink" 
												name="movieImageLink"
												label="Link de imagem"
												:hint="movie.imageLink.length +'/1024 caracteres preenchidos.'" 
												filled
											>
											</v-text-field>
										</div>
									</div>
									<div class="uk-margin-top uk-text-right">
										<button 
											class="sc-button sc-button-custom md-bg-grey-600" 
											type="button" 
											data-uk-tooltip="Voltar para a aba anterior"
											@click="advanceTab('tab1')"
										>
											<i class="mdi mdi-arrow-left"></i>
											Voltar
										</button>
										<button 
											class="sc-button sc-button-custom md-bg-grey-600" 
											type="button" 
											data-uk-tooltip="Avançar para a próxima aba"
											@click="advanceTab('tab3')"
										>
											Avançar
											<i class="mdi mdi-arrow-right"></i>
										</button>
									</div>
								</fieldset>
							</li>
							<li>
								<fieldset class="uk-fieldset md-bg-blue-grey-100 sc-padding">
									<div>
										<p class="sc-text-semibold uk-text-large uk-margin-remove-top">
											Dados de produção
										</p>
										<p class="sc-text-semibold uk-text-small">
											* Campos obrigatórios
										</p>
									</div>
									<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
									</div>
									<div class="uk-margin-top  uk-text-right">
										<button 
											class="sc-button sc-button-custom md-bg-grey-600" 
											type="button" 
											data-uk-tooltip="Voltar para a aba anterior"
											@click="advanceTab('tab2')"
										>
											<i class="mdi mdi-arrow-left"></i>
											Voltar
										</button>
									</div>
								</fieldset>
							</li>
						</ul>
						<v-row>
							<v-col col="2">
								<div class="uk-margin-top uk-text-right">
									<button 
										class="sc-button sc-button-danger" 
										type="button" 
										data-uk-tooltip="Salvar as informações"
										@click="redirectPage('/movies/all')"
									>
										<i class="mdi mdi-close"></i>
										Cancelar
									</button>
									<button 
										class="sc-button sc-button-primary" 
										type="button" 
										:disabled="enableSave === false" 
										data-uk-tooltip="Salvar as informações"
										@click="save(movie)"
									>
										<i class="mdi mdi-content-save"></i>
										Salvar
									</button>
								</div>
							</v-col>
						</v-row>
					</ScCardBody>
				</ScCard>
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

</style>

