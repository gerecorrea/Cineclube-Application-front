<template>
	<div id="sc-page-wrapper" class="md-bg-black-0">
		<div id="sc-page-content">
			<div data-uk-grid>
				<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
					<div class="uk-text-left md-color-white-0 title-custom sc-padding">
						<div v-if="person.imageLink" style="border-style: solid; background-color: black">
							<img :src="person.imageLink"
								class="img-custom"
								alt=""
							>
						</div>
						<div class="md-color-white" style="font-size: 42px">
							{{ person.name }}
						</div>
					</div>
                    
					<div class="uk-text-left md-color-white-0 sc-padding normal-write">
						<span class="md-color-grey-400 subtitle-custom uk-text-left" style="margin-right: 30px" uk-tooltip="Local - Ano">
							<div>
								<span v-if="person.city && person.city.length > 0">
									{{ person.city }},
								</span>
								<span v-if="person.state && person.state.length > 0">
									{{ person.state }},
								</span>
								{{ person.country }} - {{ person.birthYear }}
							</div>
							<div>
								<button v-if="personUser.favorite"
									class="sc-padding-remove uk-button md-color-red-700 mdi mdi-heart md-color-black-0"
									uk-tooltip="Desfavoritar"
									@click="personUser.favorite = false, saveUserPerson()"
								>
								</button>
								<button v-if="!personUser.uuid || !personUser.favorite"
									class="sc-padding-remove uk-button md-color-white-0 mdi mdi-heart-outline md-color-black-0"
									uk-tooltip="Favoritar"
									@click="personUser.favorite = true, saveUserPerson()"
								>
								</button>
							</div>

						</span>
						<div class="uk-margin-top">
							<span v-if="person.director" class="uk-label md-bg-green-500">Diretor</span>

							<span v-if="person.actor" class="uk-label md-bg-green-500">Ator</span>

							<span v-if="person.writer" class="uk-label md-bg-green-500">Escritor</span>

							<span v-if="person.producer" class="uk-label md-bg-green-500">Produtor</span>
						</div>
						<div class="sc-padding-top">
							{{ person.bio }}
						</div>
					</div>
                
					<v-spacer />
				</div>
			</div>

			<div v-if="actors.length > 0" class="md-bg-blue-grey-300 uk-margin-top">
				<v-row class="sc-padding-left sc-padding-right" style="font-size: 22px">
					<v-col cols="6">
						Atuou
					</v-col>
					<v-col cols="6" class="uk-text-right">
						<button class="mdi mdi-playlist-plus" style="vertical-align:middle" @click="showDialog(actors, 'ACTORS')">
							Ver todos os filmes em que atuou
						</button>
					</v-col>
				</v-row>
				<div class="uk-child-width-1-5@l sc-padding" data-uk-grid style="">
					<div v-for="i in 5" :key="i" class="tag">
						<v-card 
							v-if="actors[i-1]" 
							:uk-tooltip="actors[i-1].movieName" 
							@click="redirectPage('/movies/view/' + actors[i-1].movieUuid)"
						>
							<v-img
								v-if="actors[i-1].imageLinkMovie && actors[i-1].imageLinkMovie.length > 0"
								height="125px"
								:src="actors[i-1].imageLinkMovie"
							>
							</v-img>
							<v-img v-else
								height="100px"
								src="~/assets/img/question.png"
							>
							</v-img>

							<v-card-text>
								<v-list-item class="grow">
									<v-list-item-content>
										<v-list-item-title>{{ actors[i-1].movieName }}</v-list-item-title>
									</v-list-item-content>
								</v-list-item>
							</v-card-text>
						</v-card>
					</div>
				</div>
			</div>

			<div v-if="directors.length > 0" class="md-bg-blue-grey-300 uk-margin-top">
				<v-row class="sc-padding-left sc-padding-right" style="font-size: 22px">
					<v-col cols="6">
						Dirigiu
					</v-col>
					<v-col cols="6" class="uk-text-right">
						<button class="mdi mdi-playlist-plus" style="vertical-align:middle" @click="showDialog(directors, 'DIRECTORS')">
							Ver todos os filmes dirigidos
						</button>
					</v-col>
				</v-row>
				<div class="uk-child-width-1-5@l sc-padding" data-uk-grid style="">
					<div v-for="i in 5" :key="i" class="tag">
						<v-card 
							v-if="directors[i-1]" 
							:uk-tooltip="directors[i-1].movieName" 
							@click="redirectPage('/movies/view/' + directors[i-1].movieUuid)"
						>
							<v-img
								v-if="directors[i-1].imageLinkMovie && directors[i-1].imageLinkMovie.length > 0"
								height="125px"
								:src="directors[i-1].imageLinkMovie"
							>
							</v-img>
							<v-img v-else
								height="100px"
								src="~/assets/img/question.png"
							>
							</v-img>

							<v-card-text>
								<v-list-item class="grow">
									<v-list-item-content>
										<v-list-item-title>{{ directors[i-1].movieName }}</v-list-item-title>
									</v-list-item-content>
								</v-list-item>
							</v-card-text>
						</v-card>
					</div>
				</div>
			</div>

			<div v-if="writers.length > 0" class="md-bg-blue-grey-300 uk-margin-top">
				<v-row class="sc-padding-left sc-padding-right" style="font-size: 22px">
					<v-col cols="6">
						Escreveu
					</v-col>
					<v-col cols="6" class="uk-text-right">
						<button class="mdi mdi-playlist-plus" style="vertical-align:middle" @click="showDialog(writers, 'WRITERS')">
							Ver todos os filmes escritos
						</button>
					</v-col>
				</v-row>
				<div class="uk-child-width-1-5@l sc-padding" data-uk-grid style="">
					<div v-for="i in 5" :key="i" class="tag">
						<v-card 
							v-if="writers[i-1]" 
							:uk-tooltip="writers[i-1].movieName" 
							@click="redirectPage('/movies/view/' + writers[i-1].movieUuid)"
						>
							<v-img
								v-if="writers[i-1].imageLinkMovie && writers[i-1].imageLinkMovie.length > 0"
								height="125px"
								:src="writers[i-1].imageLinkMovie"
							>
							</v-img>
							<v-img v-else
								height="100px"
								src="~/assets/img/question.png"
							>
							</v-img>

							<v-card-text>
								<v-list-item class="grow">
									<v-list-item-content>
										<v-list-item-title>{{ writers[i-1].movieName }}</v-list-item-title>
									</v-list-item-content>
								</v-list-item>
							</v-card-text>
						</v-card>
					</div>
				</div>
			</div>

			<div v-if="producers.length > 0" class="md-bg-blue-grey-300 uk-margin-top">
				<v-row class="sc-padding-left sc-padding-right" style="font-size: 22px">
					<v-col cols="6">
						Produziu
					</v-col>
					<v-col cols="6" class="uk-text-right">
						<button class="mdi mdi-playlist-plus" style="vertical-align:middle" @click="showDialog(producers, 'PRODUCERS')">
							Ver todos os filmes produzidos
						</button>
					</v-col>
				</v-row>
				<div class="uk-child-width-1-5@l sc-padding" data-uk-grid style="">
					<div v-for="i in 5" :key="i" class="tag">
						<v-card 
							v-if="producers[i-1]" 
							:uk-tooltip="producers[i-1].movieName" 
							@click="redirectPage('/movies/view/' + producers[i-1].movieUuid)"
						>
							<v-img
								v-if="producers[i-1].imageLinkMovie && producers[i-1].imageLinkMovie.length > 0"
								height="125px"
								:src="producers[i-1].imageLinkMovie"
							>
							</v-img>
							<v-img v-else
								height="100px"
								src="~/assets/img/question.png"
							>
							</v-img>

							<v-card-text>
								<v-list-item class="grow">
									<v-list-item-content>
										<v-list-item-title>{{ producers[i-1].movieName }}</v-list-item-title>
									</v-list-item-content>
								</v-list-item>
							</v-card-text>
						</v-card>
					</div>
				</div>
			</div>

			<v-dialog
				v-model="dialogAllMovies"
				max-width="800"
				persistent
			>
				<v-card>
					<v-card-title class="uk-modal-title">
						{{ dialogTitle }} 
					</v-card-title>

					<v-card-text>
						<div class="uk-child-width-1-3@l sc-padding" data-uk-grid style="">
							<div v-for="i in dialogObject" :key="i" class="tag">
								<v-card 
									v-if="i.movieName" 
									:uk-tooltip="i.movieName" 
									@click="redirectPage('/movies/view/' + i.movieUuid)"
								>
									<v-img
										v-if="i.imageLinkMovie && i.imageLinkMovie.length > 0"
										height="125px"
										:src="i.imageLinkMovie"
									>
									</v-img>
									<v-img v-else
										height="100px"
										src="~/assets/img/question.png"
									>
									</v-img>

									<v-card-text>
										<v-list-item class="grow">
											<v-list-item-content>
												<v-list-item-title>{{ i.movieName }}</v-list-item-title>
											</v-list-item-content>
										</v-list-item>
									</v-card-text>
								</v-card>
							</div>
						</div>
					</v-card-text>

					<v-card-actions>
						<v-spacer></v-spacer>
						<div class="uk-margin-top uk-text-right">
							<button class="sc-button uk-modal-close md-color-grey-700" type="button" @click="dialogAllMovies = false">
								Fechar
							</button>
						</div>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</div>
	</div>
</template>

<script>

import LoginService from "@/services/loginService";
import UserService from "@/services/userService";
import MoviePersonRelationService from "@/services/moviePersonService";
import PersonService from "@/services/personService";
import UserPersonRelationService from "@/services/userPersonRelationService";

import {facade} from 'vue-input-facade'

import Vue from 'vue';

export default {
	middleware: "authenticated",
	components: {
	},
	directives: {facade},
	data () {
		return {
			uuidPerson: '',
			person: {
				uuid: null,
				birthYear: null,
				name: '',
				imageLink: '',
				birth: null,
				director: false,
				actor: false,
				producer: false,
				writer: false,
				self: false,
			},
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
			dialogAvaliate: false,
			personUser: {
				uuid: null,
				personUuid: null,
				userUuid: null,
				favorite: false,
				personName: '',
				imageLink: '',
			},
			dialogAllMovies: false,
			dialogObject: {},
			dialogTitle: '',
		}
	},
	mounted () {
		this.uuidPerson = this.$route.params.uuid;
		this.findByUuid(this.uuidPerson);
	},
	methods: {
		findByUuid (uuid){
			if (uuid) {
				PersonService.findById(uuid)
					.then(response => {
						this.person = response.data;
						this.personUser.personUuid = uuid;
						this.personUser.personName = this.person.name;
						this.personUser.imageLink = this.person.imagelink;
						this.loggedUser();
						this.findByPersonUuid(this.person.uuid);
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
		findByPersonUuid (uuid){
			MoviePersonRelationService.findByPersonUuid(uuid)
				.then(response => {
					if (response.data && response.data.length > 0){
						response.data.forEach(obj => {
							if (obj.job == "ACTOR") this.actors.push(obj);
							if (obj.job == "DIRECTOR") this.directors.push(obj);
							if (obj.job == "WRITER") this.writers.push(obj);
							if (obj.job == "PRODUCER") this.producers.push(obj);
							if (obj.job == "SELF") this.selfs.push(obj);
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
							this.personUser.userUuid = this.loggedUserObject.uuid;
							this.personUser.userName = this.loggedUserObject.name;
							this.findPersonUserRelation(); 
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
		findPersonUserRelation (){
			UserPersonRelationService.findByUserUuidAndPersonUuid(this.personUser.userUuid, this.personUser.personUuid)
				.then(response => {
					if (response.data){
						this.personUser = response.data;
					}
				})
				.catch(e => {
					let message;
					if (e.response && e.response.status === 400) {
						message = e.response.data.message;
					}
					this.showNotification(message, 'bottom-right', 'danger')
				});
		},
		saveUserPerson (){
			if (this.personUser.uuid == null) this.personUser.favorite = true;
			UserPersonRelationService.save(this.personUser)
				.then(response => {
					this.personUser = response.data;
					this.showNotification("Favorito modificado com sucesso!", 'bottom-right', 'success');
					//this.findByUuid(this.uuidPerson);
				})
				.catch(e => {
					var message = "Não foi possível salvar os dados do filme para este usuário.";
					if (e.response && e.response.status === 400) {
						message = e.response.data.message;
					}
					this.showNotification(message, 'bottom-right', 'danger')
				});
		},
		showDialog (obj, type){
			this.dialogObject = obj;
			if (type == 'ACTORS') this.dialogTitle = "Filmes Atuados";
			else if (type == 'DIRECTORS') this.dialogTitle = "Filmes Dirigidos";
			else if (type == 'WRITERS') this.dialogTitle = "Filmes Escritos";
			else if (type == 'PRODUCERS') this.dialogTitle = "Filmes Produzidos";
			this.dialogAllMovies = true;
		},
		hideDialog (){
			this.dialogAllMovies = false;
			this.dialogTitle = "";
			this.dialogObject = {};
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
        font-size: 6.5vh;
    }

    .title-custom5-5{
        font-size: 5.5vh;
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

	.normal-write{
		font-size: 14px;
	}

	.border-style{
		border-style: groove;
		width: 100%;
	}
</style>

