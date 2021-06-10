<template>
	<div class="uk-flex uk-flex-center uk-flex-middle sc-login-page-wrapper">
		<div class="uk-width-2-3@s uk-width-1-2@m uk-width-1-3@l uk-width-1-4@xl uk-margin-auto-vertical">
			<ScCard>
				<ScCardBody>
					<div class="sc-login-page-logo">
						<img v-rjs="require('~/assets/img/logoCine.png')"
							:src="appLogo"
							alt=""
							width="250px"
						>
					</div>
					<div class="sc-login-page-logo sc-login-page-logo-light">
						<img v-rjs="require('~/assets/img/logoCine.png')" :src="appLogoLight" alt="">
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
										<a href="javascript:void(0)" class="sc-link" data-uk-toggle="target: .sc-toggle-login-password; animation: uk-animation-scale-up">
											Esqueceu sua senha?
										</a>
									</div>
									<div class="uk-margin-medium">
										<div class="uk-margin-small-top uk-text-small uk-text-right@s">
											<a href="javascript:void(0)" class="sc-link" data-uk-toggle="target: .sc-toggle-login-create; animation: uk-animation-scale-up">
												Não possui cadastro? Cadastre-se!
											</a>
										</div>
									</div>
								</div>
								<div class="uk-margin-large-top">
									<button
										class="sc-button sc-button-custom md-bg-blue-grey-600 waves-effect waves-button waves-light sc-button-large sc-button-block"
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
								<button class="sc-button sc-button-large sc-button-block sc-button-primary">
									Alterar Senha
								</button>
								<div class="uk-margin-large-top uk-flex uk-flex-middle uk-flex-center">
									<a href="javascript:void(0)" class="sc-text-semibold" data-uk-toggle="target: .sc-toggle-login-password; animation: uk-animation-scale-up">
										Voltar ao login
									</a>
								</div>
							</div>
						</div>
					</div>

					<div id="sc-password-form" class="sc-toggle-login-create" hidden>
						<div class="sc-login-page-inner">
							<div class="uk-margin-medium">
								CADASTRO DE EMPRESA
							</div>
							<p class="sc-text-semibold uk-text-small">
								* Campos obrigatórios
								<br>
								** Ao menos um destes campos deve ser preenchido.
							</p>

							<h6 class="sc-text-semibold uk-text-small" style="padding-top:15px;">
								DADOS CADASTRAIS
							</h6>
							<div class="uk-form-controls">
								<ScInput 
									v-model="tenant.idFederal"
									v-facade="'##.###.###/####-##'"
									name="tenantIdFederal"
									:error-state="$v.tenantIdFederal.$error"
									:validator="$v.tenantIdFederal"
									@change="fieldsValidationTenant" 
								>
									<label>
										Identificador Federal*
									</label>
								</ScInput>
								<ul class="sc-vue-errors">
									<li v-if="!$v.tenantIdFederal.required">
										Campo obrigatório
									</li>
									<li v-if="!$v.tenantIdFederal.minLength">
										Este campo deve conter 14 caracteres numéricos
									</li>
								</ul>	
							</div>
							<div class="uk-form-controls">
								<ScInput 
									v-model="tenant.name"
									name="tenantName"
									:error-state="$v.tenantName.$error"
									:validator="$v.tenantName"
									@change="fieldsValidationTenant"
								>
									<label>
										Nome/Razão Social*
									</label>
								</ScInput>
								<ul class="sc-vue-errors">
									<li v-if="!$v.tenantName.required">
										Campo obrigatório
									</li>
									<li v-if="!$v.tenantName.minLength">
										Este campo deve conter pelo menos 3 caracteres
									</li>
								</ul>	
							</div>
							<div class="uk-form-controls" style="padding-top:13px;">
								<Select2
									v-model="tenant.tenantType"
									:settings="{ 'width': '100%', 'placeholder': 'Tipo da empresa*', allowClear: true }"
									:options="loadTypes"
									name="tenantType"
									:error-state="$v.tenantType.$error"
									:validator="$v.tenantType"
									@change="fieldsValidationTenant"
								>
								</Select2>
								<ul class="sc-vue-errors">
									<li v-if="!$v.tenantType.required">
										Campo obrigatório
									</li>
								</ul>
							</div>
							<h6 class="sc-text-semibold uk-text-small" style="padding-top:25px;">
								CONTATO
							</h6>
							<div class="uk-form-controls">
								<ScInput 
									v-model="tenant.contactName"
									name="tenantContactName"
									:error-state="$v.contactName.$error"
									:validator="$v.contactName"
									@change="fieldsValidationContact"
								>
									<label>
										Nome de contato*
									</label>
								</ScInput>
								<ul class="sc-vue-errors">
									<li v-if="!$v.contactName.required">
										Campo obrigatório
									</li>
									<li v-if="!$v.contactName.minLength">
										Este campo deve conter pelo menos 3 caracteres
									</li>
								</ul>	
							</div>
							<div class="uk-form-controls">
								<ScInput
									v-model="tenant.contactPhone"
									v-facade="['+## (##) ####-####', '+## (##) #####-####']"
									name="tenantContactPhone"
									@change="fieldsValidationContact"
								>
									<label>
										Telefone de contato**
									</label>
								</ScInput>
							</div>
							<div class="uk-form-controls">
								<ScInput 
									v-model="tenant.contactSite"
									name="tenantContactWebsite"
								>
									<label>
										Website
									</label>
								</ScInput>
							</div>
							<div class="uk-form-controls">
								<ScInput 
									v-model="tenant.contactEmail"
									v-input-mask="{ 'alias': 'email' }"
									name="tenantContactEmail"
									@change="fieldsValidationContact"
								>
									<label>
										E-mail contato**
									</label>
								</ScInput>
							</div>

							<div class="uk-margin-medium" style="padding-top:35px;">
								CADASTRO DE USUÁRIO DA EMPRESA
							</div>
							<p class="sc-text-semibold uk-text-small">
								* Campos obrigatórios
							</p>
							<div class="uk-form-controls">
								<ScInput 
									v-model="user.name"
									name="Username"
									:error-state="$v.userName.$error"
									:validator="$v.userName"
									@change="fieldsValidationUser"
								>
									<label>
										Nome completo*
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
									v-model="user.numberDoc"
									v-mask="[ '###.###.###-##' ]"
									name="numberDoc"
									:error-state="$v.userNumberDoc.$error"
									:validator="$v.userNumberDoc"
									@change="fieldsValidationUser"
								>
									<label>
										Número de CPF*
									</label>
								</ScInput>
								<ul class="sc-vue-errors">
									<li v-if="!$v.userNumberDoc.required">
										Campo obrigatório
									</li>
									<li v-if="!$v.userNumberDoc.minLength">
										Este campo deve deve conter 11 caracteres numéricos.
									</li>
								</ul>
							</div>
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
									class="sc-button sc-button-large sc-button-block sc-button-primary"
									:disabled="enableSave === false" 
									@click="saveTenant"
								>
									<a href="javascript:void(0)" style="color:white" data-uk-toggle="target: .sc-toggle-login-create; animation: uk-animation-scale-up">
										Cadastrar
									</a>
								</button>
								<div class="uk-margin-large-top uk-flex uk-flex-middle uk-flex-center">
									<a href="javascript:void(0)" class="sc-text-semibold" data-uk-toggle="target: .sc-toggle-login-create; animation: uk-animation-scale-up">
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
import TenantService from "@/services/tenantService";
import LoginService from "@/services/loginService";
import Select2 from "~/components/Select2";

import { validationMixin } from 'vuelidate';
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators';

import {mask} from 'vue-the-mask'
import {facade} from 'vue-input-facade';

if(process.client) {
	require('~/plugins/inputmask')
}

export default {
	name: "Login",
	middleware: "notAuthenticated",
	layout: 'login_page',
	components: {
		ScInput,
		Select2,
	},
	directives: {mask, facade},
	mixins: [validationMixin],
	data () {
		return {
			tenantIdFederal: '',
			tenantName: '',
			tenantType: '',
			contactName: '',
			contactPhone: '',
			userName: '',
			userNumberDoc: '',
			userEmail: '',
			userLoginUserName: '',
			userLoginPassword: '',
			existsTenant: false,
			existsContact: false,
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
			tenant: {
				uuid: null,
				idFederal: null,
				name: null,
				tenantType: "",
				contactName: "",
				contactPhone: "",
				contactEmail: "",
				contactSite: ""
			},
			user:{
				name: '',
			    numberDoc: '',
			    version: '',
			    email: '',
				login:{
					username: '',
					password: '',
					active: true,
					admin: true,
				},
			    tenant:{
					uuid: ''
				}
			},
			loadTypes: ["EMPRESA_CREDORA", "ASSESSORIA_DE_COBRANÇA"],
		}
	},
	validations: {
		tenantIdFederal: {
			required,
			minLength: minLength(18)
		},
		tenantName: {
			required,
			minLength: minLength(3)
		},
		tenantType: {
			required
		},
		contactName: {
			required,
			minLength: minLength(3)
		},
		userName: {
			required,
			minLength: minLength(3)
		},
		userNumberDoc: {
			required,
			minLength: minLength(14)
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
		validationGroupTenant: ["tenantIdFederal", "tenantName", "tenantType"],
		validationGroupContact: ["contactName"],
		validationGroupUser: ['userName', 'userNumberDoc', 'userEmail', 'userLoginUserName', 'userLoginPassword'],
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
		if (status == 401 || status == 403) {
			this.loginNotification(status, 'bottom-right', 'warning')
		}
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
		saveTenant (){
			let unregisteredTenant = {}
			unregisteredTenant.tenant = this.tenant;
			unregisteredTenant.user = this.user;
			TenantService.saveUnauthenticated(unregisteredTenant)
				.then(response => {
					this.notification.title = "Empresa cadastrada!";
					this.showNotification(this.notification.title, 'top-center', 'success')
					this.user.tenant.uuid = response.data.uuid;
					//this.saveUser();
				})
				.catch(err => {
					console.log(err)
					this.notification.title = "Erro. Não foi possível realizar o cadastro da empresa!";
					this.showNotification(this.notification.title, 'top-center', 'danger')
				});
		},
		saveUser (){
			if(this.user.tenant.uuid){
				UserService.saveUnauthenticated(this.user)
					.then(resp => {
						this.notification.title = "Usuário cadastrado na empresa " +this.tenant.name +"!";
						this.showNotification(this.notification.title, 'top-center', 'success')
						this.cleanFields();
					})
					.catch(err => {
						this.notification.title = "Erro. Não foi possível realizar o cadastro do usuário!";
						this.showNotification(this.notification.title, 'top-center', 'danger')
					});
			}
		},
		fieldsValidationTenant (){
			this.tenantName = this.tenant.name;
			this.tenantIdFederal = this.tenant.idFederal;
			this.tenantType = this.tenant.tenantType;

			if(this.$v.validationGroupTenant.$invalid == false){ 
				this.existsTenant = true;
			} else {
				this.existsTenant = false;
			}
			this.validationToSave();
		},
		fieldsValidationContact (){
			this.contactName = this.tenant.contactName;

			if(this.$v.validationGroupContact.$invalid == false && (this.tenant.contactPhone || this.tenant.contactEmail)){ 
				this.existsContact = true;
			} else {
				this.existsContact = false;
			}
			this.validationToSave();
		},
		fieldsValidationUser (){
			this.userName = this.user.name;
			this.userNumberDoc = this.user.numberDoc;
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
			if (this.existsTenant == true && this.existsContact == true && this.existsUser) {
				this.enableSave = true;
			}else{
				this.enableSave = false;
			}
		},
		cleanFields (){
			this.tenant.uuid=null,
			this.tenant.idFederal=null,
			this.tenant.name=null,
			this.tenant.tenantType="",
			this.tenant.contactName="",
			this.tenant.contactPhone="",
			this.tenant.contactEmail="",
			this.tenant.contactSite="",
			this.user.name='',
			this.user.numberDoc='',
			this.user.version='',
			this.user.email='',
			this.user.login.username='',
			this.user.login.password='',
			this.user.tenant.uuid=null
		},
	},
	head () {
		return {
			'title': 'Login'
		}
	}
}
</script>
