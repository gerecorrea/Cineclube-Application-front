<template>
	<header id="sc-header" ref="header">
		<nav class="uk-navbar uk-navbar-container" data-uk-navbar="mode: click; duration: 360">
			<div class="uk-navbar-left nav-overlay-small uk-margin-right uk-navbar-aside">
				<a v-if="!vxSidebarMiniActive"
					id="sc-sidebar-main-toggle"
					href="javascript:void(0)"
					@click.stop="toggleMainSidebar"
				>
					<i v-if="sidebarMainExpanded" class="mdi mdi-backburger" />
					<i v-if="!sidebarMainExpanded" class="mdi mdi-menu" />
				</a>
				<!-- <div class="sc-brand uk-visible@m" style="display: block;margin-left: auto;margin-right: auto;">
					<nuxt-link to="/">
						<img :src="appLogo" width="40px">
					</nuxt-link>
				</div> -->
			</div>
			<div class="uk-navbar-item uk-width-expand md-color-grey-50 uk-text-large"
				style="font-family: Trebuchet MS"
			>
				<nuxt-link to="/" class="md-color-grey-50">
					<img src="~/assets/img/movie.png" width="60px" class="sc-padding-right">
					CINECLUBE APP
					<img src="~/assets/img/movie.png" width="60px" class="sc-padding-left">
					<!-- require('~/assets/img/trophy.png') -->
				</nuxt-link>
				
				<nuxt-link to="/" class="sc-padding-left">
				</nuxt-link>
			</div>
			<!-- <div class="nav-overlay nav-overlay-small uk-navbar-right uk-flex-1" hidden>
				<a class="uk-navbar-toggle uk-visible@l" data-uk-toggle="target: .nav-overlay; animation: uk-animation-slide-top" href="javascript:void(0)">
					<i class="mdi mdi-close sc-icon-24"></i>
				</a>
				<a class="uk-navbar-toggle uk-hidden@l uk-padding-remove-left" data-uk-toggle="target: .nav-overlay-small; animation: uk-animation-slide-top" href="javascript:void(0)">
					<i class="mdi mdi-close sc-icon-24"></i>
				</a>
				<div class="uk-navbar-item uk-width-expand uk-padding-remove-right">
					<form class="uk-search uk-search-navbar uk-width-1-1 uk-flex">
						<input class="uk-search-input"
							type="search"
							placeholder="Search..."
							autofocus
						>
						<button class="sc-button sc-button-small sc-button-icon sc-button-flat uk-margin-small-left" type="button">
							<i class="mdi mdi-magnify sc-icon-24 md-color-white"></i>
						</button>
					</form>
				</div>
			</div> -->
			<div class="nav-overlay nav-overlay-small uk-navbar-right">
				<ul class="uk-navbar-nav">
					<li style="visibility: hidden">
						<a class="uk-navbar-toggle uk-visible@l" href="javascript:void(0)" data-uk-toggle="target: .nav-overlay; animation: uk-animation-slide-top">
							<i class="mdi mdi-magnify" />
						</a>
						<a id="sc-search-main-toggle-mobile"
							class="uk-navbar-toggle uk-hidden@l"
							href="javascript:void(0)"
							data-uk-toggle="target: .nav-overlay-small; animation: uk-animation-slide-top"
						>
							<i class="mdi mdi-magnify" />
						</a>
					</li>
					<li class="uk-visible@l" title="Tela cheia">
						<ScFullscreen id="sc-js-fullscreen-toggle" />
					</li>
					 
					<li title="Perfil">
						<!-- <button
							v-if="userLoaded"
							class="mdi mdi-account-circle md-color-grey-50"
							uk-tooltip="Perfil"
							@click="redirectPage('/profile/' + loggedUserObject.uuid)"
						>
						</button> -->
						<nuxt-link v-if="userLoaded" :to="'/profile/' + loggedUserObject.uuid">
							<span class="mdi mdi-account-circle">
							</span>
						</nuxt-link>
					</li>
					<li title="Informações de uso" style="padding-top: 5px; padding-left: 10px; padding-right: 10px">
						<button class="md-color-white mdi mdi-information-outline" @click="dialogTutorial = true">
						</button>
					</li>
					<li title="Sair">
						<nuxt-link to="" @click.native="logout">
							<span class="mdi mdi-logout">
							</span>
						</nuxt-link>
					</li>
				</ul>
				<a v-if="vxOffcanvasPresent"
					href="javascript:void(0)"
					class="md-color-white uk-margin-left uk-hidden@l"
					@click="toggleOffcanvas"
				>
					<i v-show="!vxOffcanvasExpanded" class="mdi mdi-menu"></i><i v-show="vxOffcanvasExpanded" class="mdi mdi-arrow-right"></i>
				</a>
			</div>

			<v-dialog
				v-if="userExists"
				v-model="dialogTutorial"
				width="50%"
				persistent
				scrollable
				style="z-index: 10000"
			>
				<v-card>
					<v-card-title class="uk-modal-title">
						Informações de uso do Cineclube App
					</v-card-title>
					<v-card-subtitle style="padding-top: 5px">
						* O texto em negrito se refere aos links de navegação para as ações citadas.
					</v-card-subtitle>
					<v-spacer />

					
					<v-card-text class="text--primary" style="text-align: justify;">
						<div>
							Você pode e deve dar notas nos 
							<nuxt-link to="/movies/all" class="md-color-black" style="font-weight: 500">
								filmes 
							</nuxt-link> da aplicação. Sua notas ficam disponíveis nas suas
							<nuxt-link to="/profile/ratings" class="md-color-black" style="font-weight: 500">
								avaliações
							</nuxt-link>. Também é possível favoritá-los e adicioná-los à sua watchlist, estando, respectivamente, dispostos em seus
							<nuxt-link to="/profile/favorites" class="md-color-black" style="font-weight: 500">
								favoritos
							</nuxt-link>
							e sua
							<nuxt-link to="/profile/watchlist" class="md-color-black" style="font-weight: 500">
								watchlist
							</nuxt-link>
						</div>

						<div class="uk-margin-top">
							Também é possível
							<nuxt-link to="/person/all" class="md-color-black" style="font-weight: 500">
								listar
							</nuxt-link> os artistas salvos na aplicação, cujo se relacionam com os filmes. Também é possível adicioná-los como artistas favoritos
						</div>

						<div class="uk-margin-top">
							Você pode 
							<nuxt-link :to="'/profile/' + loggedUserObject.uuid" class="md-color-black" style="font-weight: 500">
								editar suas informações
							</nuxt-link>, permitindo trocar suas informações pessoais.
						</div>

						<div class="uk-margin-top">
							Implementações futuras de dashboard trabalhada, perfis individuais dos usuários, conexão entre perfis, através de poder seguir e visualizar as atividades de outros, 
							assim como melhorias das funcionalidades com artistas, aplicação de séries no catálogo, etc, serão futuramente implementadas.
							Sistemas de recomendação com base nos filmes pesquisados e mesmo recentemente assistidos, também deve ser futuramente aplicadas.
							Também se prevê funcionalidades que aplicam o uso do Cineclube CCT, da UDESC, em conjunto da aplicação.
						</div>
					</v-card-text>
                
					<v-card-actions>
						<v-spacer></v-spacer>
						<button class="sc-button sc-button-flat sc-button-flat-danger" type="button" @click="dialogTutorial = false">
							Voltar
						</button>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</nav>
	</header>
</template>

<script>
import { mapState } from 'vuex'
import { scMq } from '~/assets/js/utils'
import ScFullscreen from '~/components/FullScreen.vue';
import { scHelpers } from "~/assets/js/utils";
import LoginService from '@/services/loginService';
import UserService from "@/services/userService";
const { uniqueID } = scHelpers;

const Cookie = process.client ? require("js-cookie") : undefined;

export default {
	components: {
		ScFullscreen,
	},
	data: () => ({
		appLogo : require('~/assets/img/trophy.png'),
		loggedUserObject: null,
		userLoaded: false,
		userExists: false,
		sidebarMainExpanded: true,
		offcanvasExpanded: false,
		offcanvasPresent: false,
		logo: require('~/assets/img/trophy.png'),
		alertsEmpty: null,
		availableLangs: [
			{
				code: 'en',
				name: 'English'
			},
			{
				code: 'fr',
				name: 'French'
			},
			{
				code: 'es',
				name: 'Spanish'
			}
		],
		notes: [],
		notesFiltered: [],
		notesEmpty: true,
		notesLoad: false,
		labels: [
			{ name: 'Importante', color: 'red-400' },
			{ name: 'Lembrar', color: 'amber-400' },
			{ name: 'Cobrança', color: 'blue-400' },
			{ name: 'Aviso', color: 'grey-400' },
			{ name: 'Particular', color: 'green-400' },
			{ name: 'Revisar', color: 'purple-400' },
			{ name: 'Outros', color: 'grey-50' }
		],
		dialogTutorial: false,
	}),
	computed: {
		...mapState([
			'vxSidebarMainExpanded',
			'vxOffcanvasPresent',
			'vxOffcanvasExpanded',
			'vxActiveLocale',
			'vxSidebarMiniActive'
		])
	},
	watch: {
		'vxSidebarMainExpanded' (state) {
			this.sidebarMainExpanded = state;
		},
		'vxOffcanvasExpanded' (state) {
			this.offcanvasExpanded = state;
		},
		'vxOffcanvasPresent' (state) {
			this.offcanvasPresent = state;
		}
	},
	mounted () {
		const self = this;
		self.$nextTick(() => {
			if(scMq.mediumMin()) {
				self.sidebarMainExpanded = this.vxSidebarMainExpanded;
			} else {
				self.sidebarMainExpanded = false;
			}
		});
		// sticky header
		var options = scMq.mediumMax() ? { showOnUp: true, animation: "uk-animation-slide-top" } : {};
		UIkit.sticky(this.$refs.header, options);
		this.loggedUser();
	},
	methods: {
		logout () {
			Cookie.remove("token");
			this.$store.commit("setToken", null);
			this.$router.push("/login");
		},
		toggleMainSidebar () {
			let state = !this.sidebarMainExpanded;
			this.$store.commit('sidebarMainToggle', state);
		},
		toggleOffcanvas () {
			let state = !this.offcanvasExpanded;
			this.$store.commit('offcanvasToggle', state);
		},
		updateLocale (event, code) {
			if (code === this.vxActiveLocale) {
				event.preventDefault();
			}
			this.$i18n.setLocale(code);
			this.$store.commit('updateLocale', code);
			this.isActiveLang(code)
		},
		isActiveLang (code) {
			return code === this.vxActiveLocale
		},
		noteBgColor (color) {
			return color ? 'md-bg-' + color + '-50' : '';
		},
		redirectPage (page) {
			this.$router.push({ path: page });
		},
		loggedUser (){
			LoginService.getActualLogin()
				.then(response => {
					UserService.findByLoginUuid(response.data.uuid)
						.then(response => {
							this.loggedUserObject = response.data;
							this.userLoaded = true;
							if(this.loggedUserObject){
								this.userExists = true;
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
		editUser (){
			this.redirectPage('/userpages/users/manual/' + this.loggedUserObject.uuid)
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
