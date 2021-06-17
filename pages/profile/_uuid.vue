<template>
	<div id="sc-page-wrapper">
		<div 
			id="sc-page-top-bar"
			class="sc-top-bar"
			data-uk-sticky="offset:48; show-on-up: true; animation: uk-animation-slide-top-medium"
		>
			<div class="sc-top-bar-content uk-flex uk-flex-1">
				<div class="sc-top-bar-title uk-flex-1">
					<Title v-if="!uuidUser" title="Cadastro de Usuário"></Title>
					<Title v-if="uuidUser" title="Edição de Usuário"></Title>
				</div>
			</div>
		</div>
		<div id="sc-page-content">
			<div>
				<ScCard>
					<ScCardBody>
						<fieldset class="uk-fieldset md-bg-grey-100 sc-padding ">
							<p class="sc-text-semibold uk-text-large uk-margin-remove-top">
								Informações do usuário
							</p>
							<p class="sc-text-semibold uk-text-small">
								* Campos obrigatórios
							</p>
							<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
								<div>
									<label
										class="uk-form-label"
										for="f-email"
									>
										Nome do usuário*
									</label>
									<div class="uk-form-controls">
										<ScInput
											v-model="user.name"
											name="Username"
											:error-state="$v.userName.$error"
											:validator="$v.userName"
											@change="fieldsValidationUser"
										>
										</ScInput>
										<ul class="sc-vue-errors">
											<li v-if="!$v.userName.required">
												Campo obrigatório
											</li>
											<li v-if="!$v.userName.minLength">
												Este campo deve conter pelo menos 3 caracteres, mas contem:  {{ $v.userName.$params.minLength.min }}.
											</li>
										</ul>
									</div>
								</div>
								<div>
									<label
										class="uk-form-label"
										for="f-email"
									>
										E-mail*
									</label>
									<div class="uk-form-controls">
										<ScInput
											v-model="user.email"
											v-input-mask="{ 'alias': 'email' }"
											name="email"
											:error-state="$v.userEmail.$error"
											:validator="$v.userEmail"
											@change="fieldsValidationUser"
										>
										</ScInput>
										<ul class="sc-vue-errors">
											<li v-if="!$v.userEmail.required">
												Campo obrigatório
											</li>
											<li v-if="!$v.userEmail.minLength">
												Este campo deve conter pelo menos 15 caracteres, mas contem:  {{ $v.userEmail.$params.minLength.min }}.
											</li>
										</ul>
									</div>
								</div>
								<div>
									<label
										class="uk-form-label"
										for="f-email"
									>
										Login de acesso*
									</label>
									<div class="uk-form-controls">
										<ScInput
											v-model="user.login.username"
											name="loginUserName"
											:error-state="$v.userLoginUserName.$error"
											:validator="$v.userLoginUserName"
											@change="fieldsValidationUser"
										>
										</ScInput>
										<ul class="sc-vue-errors">
											<li v-if="!$v.userLoginUserName.required">
												Campo obrigatório
											</li>
											<li v-if="!$v.userLoginUserName.minLength">
												Este campo deve conter pelo menos 3 caracteres, mas contem:  {{ $v.userLoginUserName.$params.minLength.min }}.
											</li>
										</ul>
									</div>
								</div>
								<div>
									<label
										class="uk-form-label"
										for="f-email"
									>
										Senha*
									</label>
									<div class="uk-form-controls">
										<v-row>
											<v-col class="col-11">
												<ScInput
													v-model="user.login.password"
													:type="passwordFieldType"
													name="loginPassword"
													:error-state="$v.userLoginPassword.$error"
													:validator="$v.userLoginPassword"
													@change="fieldsValidationUser"
												>
												</ScInput>
												<ul class="sc-vue-errors">
													<li v-if="!$v.userLoginPassword.required">
														Campo obrigatório
													</li>
													<li v-if="!$v.userLoginPassword.passwordComposition">
														Este campo deve conter pelo menos 6 caracteres, com, no mínimo, uma combinação de números e letras maiúsculas e minúsculas.
													</li>
												</ul>
											</v-col>
											<v-col class="col-1">
												<div class="" @click="showPasswordIcon = !showPasswordIcon">
													<i v-if="showPasswordIcon === true" class="mdi mdi-eye-off-outline" @click.prevent="passwordFieldType = 'password' ? 'text' : 'password'"></i>
													<i v-if="showPasswordIcon === false" class="mdi mdi-eye-outline" @click.prevent="passwordFieldType = 'text' ? 'password' : 'text'"></i>
												</div>
											</v-col>
										</v-row>
									</div>
								</div>
							</div>
						</fieldset>
						<div class="uk-margin-top uk-text-right">
							<nuxt-link to="/profile/all">
								<button 
									class="sc-button sc-button-custom md-bg-red-600" 
									type="button"
									data-uk-tooltip="Retornar para a listagem"
								>
									<i class="mdi mdi-close"></i>
									Cancelar
								</button>
							</nuxt-link>

							<button 
								:disabled="enableSave === false" 
								class="sc-button sc-button-primary" 
								type="button" 
								data-uk-tooltip="Salvar as informações"
								@click="save"
							>
								<i class="mdi mdi-content-save"></i>
								Salvar
							</button>
						</div>
					</ScCardBody>
				</ScCard>
			</div>
		</div>
	</div>
</template>
<script>

import ScInput from '~/components/Input';
import UserService from "@/services/userService";
import LoginService from '@/services/loginService';
import Title from '~/components/Title';

import { validationMixin } from 'vuelidate';
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators';

import customValidators from '~/plugins/vuelidateValidators';

import {mask} from 'vue-the-mask'

if(process.client) {
	require('~/plugins/inputmask')
}

export default {
	middleware: "authenticated",
	components: {
		ScInput,
		Title,
	},
	directives: {mask},
	mixins: [validationMixin],
	data () {
		return {
			user: {
				name: '',
				email: '',
				uuid: null,
				login: {
					username: null,
					password: null,
					active: true
				},
			},
			resp: false,
			waitingBillConfigtList: false,
			notification: {
				title: '',
				description: ''
			},
			uuidUser:null,
			existsUser: false,
			enableSave: false,
			userName: '',
			userEmail: '',
			userLoginUserName: '',
			userLoginPassword: '',
			passwordFieldType: 'password',
			showPasswordIcon: true,
		}
	},
	validations: {
		userName: {
			required,
			minLength: minLength(1)
		},
		userEmail: {
			required,
			minLength: minLength(1)
		},
		userLoginUserName: {
			required,
			minLength: minLength(1)
		},
		userLoginPassword: {
			required,
			passwordComposition (userLoginPassword) {
				return (
					/[a-z]/.test(userLoginPassword) && 
                    /[A-Z]/.test(userLoginPassword) &&
                    /[0-9]/.test(userLoginPassword) &&
                    userLoginPassword.length >= 6
				);
			}
		},
		validationGroupUser: ['userName', 'userEmail', 'userLoginUserName', 'userLoginPassword' ],
	},
	mounted () {
		this.uuidUser = this.$route.params.uuid;
		this.findUserByUuid();
	},
	methods: {
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
		findUserByUuid () {
			if (this.uuidUser) {
				UserService.findByUuid(this.uuidUser)
					.then(response => {
						this.user = response.data; 
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
		save () {
			this.user.login.authorities = null;
			UserService.save(this.user)
				.then(response => {
				    this.notification.title = "Sucesso ao salvar o registro";
					this.showNotification(this.notification.title, 'bottom-right', 'success');
					this.cleanFieldsUser();
					this.$router.push("all");
				})
				.catch(e => {
					var message = "Houve um erro inesperado.";
					if (e.response && e.response.status === 400) {
						message = e.response.data.message;
					}
					this.showNotification(message, 'bottom-right', 'danger')
				});
		},
		editUser (user) {
			this.user = Object.assign({}, user);
			this.user.login = Object.assign({}, user.login);
		},
		cleanFieldsUser () {
			this.user.uuid = "";
			this.user.name = "";
			this.user.email = "";
			this.user.login.password = "";
			this.user.login.username = "";
		},
		fieldsValidationUser (){
			this.userName = this.user.name;
			this.userEmail = this.user.email;
			this.userLoginUserName = this.user.login.username;
			this.userLoginPassword = this.user.login.password;

			if(this.$v.validationGroupUser.$invalid == false){
				this.existsUser = true;
			}else{
				this.existsUser = false;
			}
			this.validationToSave();
		},
		validationToSave (){
			if (this.existsUser){
				this.enableSave = true;
			}else{
				this.enableSave = false
			}
		},
	}
}
</script>

<style lang="scss">

</style>