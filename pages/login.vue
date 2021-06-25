<template>
	<div class="uk-flex uk-flex-center uk-flex-middle sc-login-page-wrapper">
		<div class="uk-width-2-3@s uk-width-1-2@m uk-width-1-3@l uk-width-1-4@xl uk-margin-auto-vertical">
			<ScCard>
				<ScCardBody>
					<div class="sc-login-page-logo">
						<img
							:src="appLogo"
							alt=""
							width="250px"
						>
					</div>
					<div class="sc-login-page-logo sc-login-page-logo-light">
						<img :src="appLogoLight" alt="">
					</div>
					<div id="sc-login-form" class="sc-toggle-login-register sc-toggle-login-password sc-toggle-login-create">
						<div class="sc-login-page-inner">
							<v-text-field
								v-model="loginData.username"
								label="Usuário"
								@keyup.enter="setFocusOnPassword()"
							></v-text-field>
							<form>
								<v-row>
									<v-col class="col-10">
										<v-text-field
											ref="inputPassword"
											v-model="loginData.password"
											:type="passwordFieldType"
											name="input-10-1"
											label="Senha"
										></v-text-field>
									</v-col>
									<v-col class="col-2" style="padding-top:30px;">
										<div class="" @click="showPasswordIcon = !showPasswordIcon">
											<i v-if="showPasswordIcon === true" class="mdi mdi-eye-off-outline" @click.prevent="passwordFieldType = 'password' ? 'text' : 'password'"></i>
											<i v-if="showPasswordIcon === false" class="mdi mdi-eye-outline" @click.prevent="passwordFieldType = 'text' ? 'password' : 'text'"></i>
										</div>
									</v-col>
								</v-row>
								<div class="uk-margin-medium">
									<div class="uk-margin-small-top uk-text-small uk-text-right@s">
										<a href="javascript:void(0)"
											class="sc-link md-color-blue-grey-600"
											data-uk-toggle="target: .sc-toggle-login-password; animation: uk-animation-scale-up"
											style="font-weight: 600"
										>
											Esqueceu sua senha?
										</a>
									</div>
									<div class="uk-margin-medium">
										<div class="uk-margin-small-top uk-text-small uk-text-right@s">
											<a href="javascript:void(0)"
												class="sc-link md-color-blue-grey-600"
												data-uk-toggle="target: .sc-toggle-login-create; animation: uk-animation-scale-up"
												style="font-weight: 600"
											>
												Não possui cadastro? Cadastre-se!
											</a>
										</div>
									</div>
								</div>
								<div class="uk-margin-large-top">
									<button
										class="sc-button sc-button-warning md-bg-blue-grey-900 md-color-yellow-700 waves-effect waves-button waves-light sc-button-large sc-button-block "
										
										@click="login"
									>
										Entrar
									</button>
									<div class="uk-child-width-1-3 uk-grid-medium uk-margin-medium-top" data-uk-grid>
									</div>
								</div>
							</form>
						</div>
					</div>
					<div id="sc-password-form" class="sc-toggle-login-password" hidden>
						<div class="sc-login-page-inner">
							<div class="uk-margin-medium">
								Insira seu endereço de email. Você irá receber um link para alterar sua senha
							</div>
							<div class="uk-margin-medium">
								<ScInput v-model="recoverPassEmail">
									<label>
										Email
									</label>
								</ScInput>
							</div>
							<div class="uk-margin-large-top">
								<button class="sc-button sc-button-large sc-button-block sc-button-flat-custom">
									Alterar Senha
								</button>
								<div class="uk-margin-large-top uk-flex uk-flex-middle uk-flex-center sc-button sc-button-block sc-button-flag-danger" style="color: black">
									<a href="javascript:void(0)" class="sc-text-semibold md-color-red-300" data-uk-toggle="target: .sc-toggle-login-password; animation: uk-animation-scale-up">
										Voltar ao login
									</a>
								</div>
							</div>
						</div>
					</div>

					<div id="sc-password-form" class="sc-toggle-login-create" hidden>
						<div class="sc-login-page-inner">
							<div class="uk-margin-medium" style="padding-top:35px;">
								CADASTRO DE USUÁRIO DA EMPRESA
							</div>
							<p class="sc-text-semibold uk-text-small">
								* Campos obrigatórios
							</p>
							<div class="uk-form-controls">
								<ScInput 
									v-model="user.email"
									v-input-mask="{ 'alias': 'email' }"
									name="email"
									:error-state="$v.userEmail.$error"
									:validator="$v.userEmail"
									@change="fieldsValidationUser"
								>
									<label>
										E-mail*
									</label>
								</ScInput>
								<ul class="sc-vue-errors">
									<li v-if="!$v.userEmail.required">
										Campo obrigatório
									</li>
									<li v-if="!$v.userEmail.minLength">
										Este campo deve conter pelo menos 15 caracteres.
									</li>
								</ul>
							</div>
							<div class="uk-form-controls">
								<ScInput 
									v-model="user.name"
									name="Username"
									:error-state="$v.userName.$error"
									:validator="$v.userName"
									@change="fieldsValidationUser"
								>
									<label>
										Nome de usuário*
									</label>
								</ScInput>
								<ul class="sc-vue-errors">
									<li v-if="!$v.userName.required">
										Campo obrigatório
									</li>
									<li v-if="!$v.userName.minLength">
										Este campo deve conter pelo menos 3 caracteres..
									</li>
								</ul>
							</div>
							<div class="uk-form-controls">
								<ScInput 
									v-model="user.login.username"
									name="loginAccess"
									:error-state="$v.userLoginUserName.$error"
									:validator="$v.userLoginUserName"
									@change="fieldsValidationUser"
								>
									<label>
										Login de acesso*
									</label>
								</ScInput>
								<ul class="sc-vue-errors">
									<li v-if="!$v.userLoginUserName.required">
										Campo obrigatório
									</li>
									<li v-if="!$v.userLoginUserName.minLength">
										Este campo deve conter pelo menos 3 caracteres.
									</li>
								</ul>
							</div>
							<div class="uk-form-controls">
								<v-row>
									<v-col class="col-10">
										<ScInput
											v-model="user.login.password"
											name="loginPassword"
											:type="passwordFieldType"
											:error-state="$v.userLoginPassword.$error"
											:validator="$v.userLoginPassword"
											@change="fieldsValidationUser"
										>
											<label>
												Senha*
											</label>
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
									<v-col style="padding-top:25px;" class="col-1">
										<div class="" @click="showPasswordIcon = !showPasswordIcon">
											<i v-if="showPasswordIcon === true" class="mdi mdi-eye-off-outline" @click.prevent="passwordFieldType = 'password' ? 'text' : 'password'"></i>
											<i v-if="showPasswordIcon === false" class="mdi mdi-eye-outline" @click.prevent="passwordFieldType = 'text' ? 'password' : 'text'"></i>
										</div>
									</v-col>
								</v-row>
							</div>
							
							<div class="uk-margin-large-top">
								<button 
									class="sc-button sc-button-large sc-button-block md-bg-blue-grey-800 md-color-yellow-700 waves-effect waves-button waves-light"
									:disabled="enableSave === false" 
									@click="saveUser"
								>
									<a href="javascript:void(0)"
										style="color:white"
										data-uk-toggle="target: .sc-toggle-login-create; animation: uk-animation-scale-up"
									>
										Cadastrar
									</a>
								</button>
								<div class="uk-margin-large-top uk-flex uk-flex-middle uk-flex-center sc-button sc-button-block sc-button-flag-danger">
									<a href="javascript:void(0)" class="sc-text-semibold md-color-red-300" data-uk-toggle="target: .sc-toggle-login-create; animation: uk-animation-scale-up">
										Voltar ao login
									</a>
								</div>
							</div>
						</div>
					</div>
				</ScCardBody>
			</ScCard>
		</div>
	</div>
</template>

<script>
const Cookie = process.client ? require("js-cookie") : undefined;
import ScInput from '~/components/Input'
import UserService from "@/services/userService";
import LoginService from "@/services/loginService";

import { validationMixin } from 'vuelidate';
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators';

import {mask} from 'vue-the-mask'

if(process.client) {
	require('~/plugins/inputmask')
}

export default {
	name: "Login",
	middleware: "notAuthenticated",
	layout: 'login_page',
	components: {
		ScInput,
	},
	directives: {mask},
	mixins: [validationMixin],
	data () {
		return {
			userName: '',
			userEmail: '',
			userLoginUserName: '',
			userLoginPassword: '',
			existsUser: false,
			enableSave: false,
			loginData: {
				username: '',
				password: ''
			},
			notification: {
				title: '',
				description: ''
			},
			recoverPassEmail: '',
			status: 'not sent',
			passwordFieldType: 'password',
			showPasswordIcon: true,
			user:{
				name: '',
			    email: '',
				login:{
					username: '',
					password: '',
					active: true,
					admin: false,
				},
			},
		}
	},
	validations: {
		userName: {
			required,
			minLength: minLength(3)
		},
		userEmail: {
			required,
			minLength: minLength(1)
		},
		userLoginUserName: {
			required,
			minLength: minLength(3)
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
		validationGroupUser: ['userName', 'userEmail', 'userLoginUserName', 'userLoginPassword'],
	},
	computed: {
		appLogo () {
			return require('~/assets/img/movie.png');
		},
		appLogoLight () {
			return require('~/assets/img/logoCine.png');
		}
	},
	mounted () {
		let status = document.URL.slice(-3);
		// if (status == 401 || status == 403) {
		// 	this.loginNotification(status, 'bottom-right', 'primary')
		// }
	},
	methods: {
	    setFocusOnPassword () {
			this.$refs.inputPassword.focus();
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
        
		loginNotification (text, pos, status, persistent) {
			var config = {};
			config.timeout = persistent ? !persistent : 7000;
			if(status) {
				config.status = status;
			}
			if(pos) {
				config.pos = pos;
			}
            
			if (text == 401) {
				text = "Não autorizado, verifique suas credenciais"
			}
			if (text == 403) {
				text = "O tempo do token expirou, faça login novamente"
			}
			UIkit.notification(text, config);
		},
        
		login (e) {
			e.preventDefault();
			let username = this.loginData.username;
			let password = this.loginData.password;
			if (username && password) {
				this.$axios
					.post("/login", { username, password })
					.then(resp => {
						const token = resp.data.token;
						this.$store.commit("setToken", token);
						Cookie.set("token", token);
						this.notification.title = "Acesso realizado. Aguarde ...";
						this.showNotification(this.notification.title, 'top-center', 'success')
						this.$router.push("/");
						window.location.reload();
					})
					.catch(err => {
						this.notification.title = "Erro. Verifique as suas credenciais";
						this.showNotification(this.notification.title, 'top-center', 'danger')
					});
			} else {
				this.notification.title = "Aviso. As credenciais devem ser informadas";
				this.showNotification(this.notification.title, 'top-center', 'primary')
			}
		},
		cleanFieldsLogin () {
			this.loginData.username = '',
			this.loginData.password = ''
		},
		saveUser (){
			UserService.saveUnauthenticated(this.user)
				.then(resp => {
					this.notification.title = "Usuário cadastrado!";
					this.showNotification(this.notification.title, 'top-center', 'success')
					this.cleanFields();
				})
				.catch(err => {
					this.notification.title = "Erro. Não foi possível realizar o cadastro do usuário!";
					this.showNotification(this.notification.title, 'top-center', 'danger')
				});
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
			if (this.existsUser) {
				this.enableSave = true;
			}else{
				this.enableSave = false;
			}
		},
		cleanFields (){
			this.user.name='';
			this.user.email='';
			this.user.login.username='';
			this.user.login.password='';
		},
	},
	head () {
		return {
			'title': 'Login'
		}
	}
}
</script>
