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
						<div class="md-color-white title-custom" style="">
							{{ person.name }}
						</div>
					</div>
                    
					<div class="uk-text-left md-color-white-0 sc-padding normal-write">
						<span class="md-color-grey-400 subtitle-custom uk-text-left" style="margin-right: 30px" uk-tooltip="Local - Ano">
							<span v-if="person.city && person.city.length > 0">
								{{ person.city }},
							</span>
							<span v-if="person.state && person.state.length > 0">
								{{ person.state }},
							</span>
							{{ person.country }} - {{ person.birthYear }}
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
				<v-spacer />

				<div class="uk-child-width-1-1@m uk-grid" data-uk-grid>
					<div class="sc-padding-left">
						<div v-if="actors.length > 0" class="md-color-white border-style sc-padding-left">
							<div class="title-custom4-5">
								Atuou em
							</div>
							<span v-for="i in actors"
								:key="i"
								class="md-color-blue-200"
								style="margin-right: 5px;"
							>
								<button @click="redirectPage('/movies/view/' + i.movieUuid)">
									<v-card class="sc-padding-top sc-padding-bottom sc-padding-right md-color-blue-200" style="background-color: black; color: white">
										<v-img v-if="i.imageLinkMovie && i.imageLinkMovie.length > 0" width="125px" :src="i.imageLinkMovie">
										</v-img>
										<v-img v-else
											height="100px"
											src="~/assets/img/question.png"
										>
										</v-img>
										<span v-if="i.movieName.length < 17">
											{{ i.movieName }} 
										</span>
										<span v-else :data-uk-tooltip="i.movieName">
											{{ i.movieName.slice(0, 17) }}
										</span>
									</v-card>
								</button>
							</span>
						</div>
					</div>
					<div class="sc-padding-left">
						<div v-if="directors.length > 0" class="md-color-white border-style sc-padding-left">
							<div class="title-custom4-5">
								Dirigiu
							</div>
							<span v-for="i in directors"
								:key="i"
								class="md-color-blue-200"
								style="margin-right: 5px;"
							>
								<button @click="redirectPage('/movies/view/' + i.movieUuid)">
									<v-card class="sc-padding-top sc-padding-bottom sc-padding-right md-color-blue-200" style="background-color: black; color: white">
										<v-img v-if="i.imageLinkMovie && i.imageLinkMovie.length > 0" width="125px" :src="i.imageLinkMovie">
										</v-img>
										<v-img v-else
											height="100px"
											src="~/assets/img/question.png"
										>
										</v-img>
										<span v-if="i.movieName.length < 17">
											{{ i.movieName }} 
										</span>
										<span v-else :data-uk-tooltip="i.movieName">
											{{ i.movieName.slice(0, 17) }}
										</span>
									</v-card>
								</button>
							</span>
						</div>
					</div>
					<div class="sc-padding-left">
						<div v-if="writers.length > 0" class="md-color-white border-style sc-padding-left">
							<div class="title-custom4-5">
								Escreveu
							</div>
							<span v-for="i in writers"
								:key="i"
								class="md-color-blue-200"
								style="margin-right: 5px;"
							>
								<button @click="redirectPage('/movies/view/' + i.movieUuid)">
									<v-card class="sc-padding-top sc-padding-bottom sc-padding-right md-color-blue-200" style="background-color: black; color: white">
										<v-img v-if="i.imageLinkMovie && i.imageLinkMovie.length > 0" width="125px" :src="i.imageLinkMovie">
										</v-img>
										<v-img v-else
											height="100px"
											src="~/assets/img/question.png"
										>
										</v-img>
										<span v-if="i.movieName.length < 17">
											{{ i.movieName }} 
										</span>
										<span v-else :data-uk-tooltip="i.movieName">
											{{ i.movieName.slice(0, 17) }}
										</span>
									</v-card>
								</button>
							</span>
						</div>
					</div>
					<div class="sc-padding-left">
						<div v-if="producers.length > 0" class="md-color-white border-style sc-padding-left">
							<div class="title-custom4-5">
								Produziu
							</div>
							<span v-for="i in producers"
								:key="i"
								class="md-color-blue-200"
								style="margin-right: 5px;"
							>
								<button @click="redirectPage('/movies/view/' + i.movieUuid)">
									<v-card class="sc-padding-top sc-padding-bottom sc-padding-right md-color-blue-200" style="background-color: black; color: white">
										<v-img v-if="i.imageLinkMovie && i.imageLinkMovie.length > 0" width="125px" :src="i.imageLinkMovie">
										</v-img>
										<v-img v-else
											height="100px"
											src="~/assets/img/question.png"
										>
										</v-img>
										<span v-if="i.movieName.length < 17">
											{{ i.movieName }} 
										</span>
										<span v-else :data-uk-tooltip="i.movieName">
											{{ i.movieName.slice(0, 17) }}
										</span>
									</v-card>
								</button>
							</span>
						</div>
					</div>
					<div class="sc-padding-left">
						<div v-if="selfs.length > 0" class="md-color-white border-style sc-padding-left">
							<div class="title-custom4-5">
								A si mesmo em
							</div>
							<span v-for="i in selfs"
								:key="i"
								class="md-color-blue-200"
								style="margin-right: 5px;"
							>
								<button @click="redirectPage('/movies/view/' + i.movieUuid)">
									<v-card class="sc-padding-top sc-padding-bottom sc-padding-right md-color-blue-200" style="background-color: black; color: white">
										<v-img v-if="i.imageLinkMovie && i.imageLinkMovie.length > 0" width="125px" :src="i.imageLinkMovie">
										</v-img>
										<v-img v-else
											height="100px"
											src="~/assets/img/question.png"
										>
										</v-img>
										<span v-if="i.movieName.length < 17">
											{{ i.movieName }} 
										</span>
										<span v-else :data-uk-tooltip="i.movieName">
											{{ i.movieName.slice(0, 17) }}
										</span>
									</v-card>
								</button>
							</span>
						</div>
					</div>
					<!-- <div class="sc-padding-left">
						<div v-if="directors.length > 0" class="md-color-white border-style">
							<div class="title-custom4-5">
								Diretor(a) em
							</div>
							<div>
								Filme 1; Filme 2
							</div>
						</div>
					</div> -->
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import LoginService from "@/services/loginService";
import UserService from "@/services/userService";
import MoviePersonRelationService from "@/services/moviePersonService";
import PersonService from "@/services/personService";

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

