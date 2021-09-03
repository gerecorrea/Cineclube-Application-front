<template>
	<div id="sc-page-wrapper" class="md-color-blue-grey-400">
		<div 
			id="sc-page-top-bar"
			class="sc-top-bar"
			data-uk-sticky="offset:48; show-on-up: true; animation: uk-animation-slide-top-medium"
		>
			<div class="sc-top-bar-content uk-flex uk-flex-1">
				<div class="sc-top-bar-title uk-flex-1">
					<Title v-if="!uuidPerson" title="Cadastro de Artista"></Title>
					<Title v-if="uuidPerson" title="Edição de Artista"></Title>
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
												v-model="person.name" 
												name="personName"
												label="Nome*"
												hint="Campo obrigatório."
												filled
											>
											</v-text-field>
										</div>
										<div class="uk-form-controls">
											<v-text-field
												v-model="person.country" 
												name="personCountry"
												label="País*"
												hint="Campo obrigatório."
												filled
											>
											</v-text-field>
										</div>
										<div class="uk-form-controls">
											<v-text-field
												v-model="person.birthUnformatted" 
												v-facade="['##/##/####']"
												name="personBirth"
												label="Data de Nascimento*"
												hint="Campo obrigatório com 8 dígitos."
												filled
											>
											</v-text-field>
										</div>
										<div class="uk-form-controls">
											<v-text-field 
												v-model="person.imageLink" 
												name="personImageLink"
												label="Link de imagem"
												:hint="person.imageLink.length +'/1024 caracteres preenchidos.'" 
												filled
											>
											</v-text-field>
										</div>
										<div class="uk-form-controls">
											<div class="uk-form-controls">
												<v-autocomplete
													v-model="jobTypesSelected"
													:items="jobTypess"
													name="personJobTypes"
													item-value="value"
													item-text="text"
													label="Selecione os tipos de trabalho"
													style="z-index:11;"
													multiple
													chips
													deletable-chips
													clearable
													filled
												>
												</v-autocomplete>
											</div>
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
										@click="save(person)"
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
import PersonService from "@/services/personService";

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
			person: {
				uuid: '',
				name: '',
				country: '',
				birthUnformatted: '',
				birth: '',
				birthYear: 0,
				birthDate: '',
				director: false,
				actor: false,
				writer: false,
				producer: false,
				self: false,
				imageLink: '',
			},
			jobTypesSelected: [],
			uuidPerson: '',
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
			jobTypess: [
				{value: "DIRECTOR", text: "Diretor(a)"},
				{value: "WRITER", text: "Escritor(a)"},
				{value: "PRODUCER", text: "Produtor(a)"},
				{value: "SELF", text: "Próprio"},
				{value: "ACTOR", text: "Ator/Atriz"},
			],
		}
	},
	mounted () {
		console.log(this.$route.params.uuid)
		this.uuidPerson = this.$route.params.uuid;
		//this.findMovieByUuid(this.uuidPerson);
		this.findPersonByUuid(this.uuidPerson);
		this.loggedUser();
	},
	methods: {
		findPersonByUuid (uuid){
			if (uuid){
				PersonService.findById(uuid)
					.then(response => {
						this.person = response.data;
						if (this.person){
							this.person.birthUnformatted = new Date(response.data.birth).toLocaleString().slice(0, 10);
							if (this.person.director) this.jobTypesSelected.push("DIRECTOR");
							if (this.person.actor) this.jobTypesSelected.push("ACTOR");
							if (this.person.producer) this.jobTypesSelected.push("PRODUCER");
							if (this.person.writer) this.jobTypesSelected.push("WRITER");
							if (this.person.self) this.jobTypesSelected.push("SELF");
						}
						
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
		save (person){
			if (this.validationToSave(person)){
				person.birth = this.formatDate(person.birthUnformatted);
				person.birthYear = parseInt(person.birth.slice(0, 4), 10);
				this.jobTypesSelected.join(",");
				person.director = this.jobTypesSelected.includes("DIRECTOR") ? true : false;
				person.actor = this.jobTypesSelected.includes("ACTOR") ? true : false;
				person.producer = this.jobTypesSelected.includes("PRODUCER") ? true : false;
				person.writer = this.jobTypesSelected.includes("WRITER") ? true : false;
				person.self = this.jobTypesSelected.includes("SELF") ? true : false;
				PersonService.save(person)
					.then(response => {
				    	this.notification.title = "Sucesso ao salvar artista!";
						this.showNotification(this.notification.title, 'bottom-right', 'success');
						this.$router.push("/person/all");
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
		validationToSave (person){
			if (person.name.length == 0) this.notification.title = "Você deve preencher o nome.";
			else if (person.country.length == 0) this.notification.title = "Você deve preencher o país de origem.";
			else if (person.birthUnformatted.length != 10) this.notification.title = "Você deve preencher a data.";
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
		redirectPage (page) {
			this.$router.push({ path: page });
		},
	}
}

</script>

<style lang="scss">

</style>

