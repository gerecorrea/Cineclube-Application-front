<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-top-bar" class="sc-top-bar">
			<div class="sc-top-bar-content uk-flex uk-flex-1">
				<div class="sc-top-bar-title uk-flex-1">
					<Title title="SEGUIDOS E SEGUIDORES"></Title>
				</div>
			</div>
		</div>

		<div id="sc-page-content">
			<div>
				<ScCard>
					<ScCardBody>
						<div v-if="user && user.uuid && user.name" class="sc-padding-bottom" style="size: 5vh">
							Usuário: {{ user.name }} 
						</div>
						<div class="uk-flex uk-flex-top uk-grid uk-grid-divider" data-uk-grid>
							<div class="uk-width-1-2@m" style="vertical-align: middle">
								<div class="uk-text-center">
									Seguidos
								</div>
								<fieldset class="uk-fieldset md-bg-grey-50 sc-padding uk-margin-top">
									<VueGoodTable
										ref="Table-User"
										:is-loading="waitingFollowedsList"
										:columns="columnsFolloweds"
										:rows="rowsFolloweds"
										style-class="uk-table uk-table-divider scutum-vgt"
										:search-options="{
											enabled: true,
											placeholder: 'Digite para buscar'
										}"
										:pagination-options="pagination"
										:sort-options="sort"
									>
										<template slot="table-row" slot-scope="props">
											<span v-if="props.column.field == 'action' && ownUser">
												<button class="mdi mdi-close-circle-outline md-color-red-700" data-uk-tooltip="Parar de seguir" @click="unfollow(props.row)"></button>
											</span>
											<span v-else>
												{{ props.formattedRow[props.column.field] }}
											</span>
										</template>
										<div slot="emptystate" class="uk-text-center uk-text-large">
											<span>Não há usuários para a busca realizada.</span>
										</div>
									</VueGoodTable>
								</fieldset>
							</div>
							<div class="uk-width-1-2@m">
								<div class="uk-text-center">
									Seguidores
								</div>
								<fieldset class="uk-fieldset md-bg-grey-50 sc-padding uk-margin-top">
									<VueGoodTable
										ref="Table-User"
										:is-loading="waitingFollowersList"
										:columns="columnsFollowers"
										:rows="rowsFollowers"
										style-class="uk-table uk-table-divider scutum-vgt"
										:search-options="{
											enabled: true,
											placeholder: 'Digite para buscar'
										}"
										:pagination-options="pagination"
										:sort-options="sort"
									>
										<template slot="table-row" slot-scope="props">
											<span v-if="props.column.field == 'action' && ownUser">
												<button class="mdi mdi-close-circle-outline md-color-red-700" data-uk-tooltip="Remover seguidor" @click="unfollow(props.row)"></button>
											</span>
											<span v-else>
												{{ props.formattedRow[props.column.field] }}
											</span>
										</template>
										<div slot="emptystate" class="uk-text-center uk-text-large">
											<span>Não há usuários para a busca realizada.</span>
										</div>
									</VueGoodTable>
								</fieldset>
							</div>
						</div>
					</ScCardBody>	
				</ScCard>
			</div>
		</div>
	</div>
</template>
<script>
import 'vue-good-table/dist/vue-good-table.css';
import { VueGoodTable } from 'vue-good-table';
import UserService from "@/services/userService";
import LoginService from '@/services/loginService';
import UserUserRelationService from '@/services/userUserRelationService';
import {mask} from 'vue-the-mask'
import Title from '~/components/Title'

if(process.client) {
	require('~/plugins/inputmask')
}
export default {
	middleware: "authenticated",
	components: {
		VueGoodTable,
		Title,
	},
	directives: {mask},
	data () {
		return {
			loggedUserObject: {},
			user: {},
			msgAlert: '',
			typeAlert: '',
			titleAlert: '',
			snackbar: '',
			columnsFolloweds: [
				{
					label: "Nome",
					field: "followedName",
					hidden: false,
				},
				{
					label: "",
					field: "action",
					hidden: false,
					thClass: 'text-right',
					tdClass: 'text-right'
				},
			], 
			columnsFollowers: [
				{
					label: "Nome",
					field: "followerName",
					hidden: false,
				},
				{
					label: "",
					field: "action",
					hidden: false,
					thClass: 'text-right',
					tdClass: 'text-right'
				},
			],
			rowsFolloweds: [],
			rowsFollowers: [],
			waitingFollowersList: false,
			waitingFollowedsList: false,
			users: [],
			notification: {
				title: '',
				description: ''
			},
			pagination:{
				enabled: true,
				mode: 'remote',
				//mode: 'pages',
				perPage: 50,
				position: 'top',
				perPageDropdown: [10, 15, 20, 50, 100],
				dropdownAllowAll: true,
				setCurrentPage: 1,
				nextLabel: 'Próxima',
				prevLabel: 'Anterior',
				rowsPerPageLabel: 'Linhas por página',
				ofLabel: 'de',
				//pageLabel: 'page', // for 'pages' mode
				allLabel: 'Todos'
			},
			sort: {
				enabled: true
			},
			totalElements: 100,
			filterData: {
				name: '',
			},
			uuidUser: null,
			ownUser: false,
		}
	},
	mounted () {
		this.uuidUser = this.$route.params.uuid;
		if (this.uuidUser){
			this.findUserByUuid(this.uuidUser);
		} else {
			this.ownUser = true;
			this.loggedUser();
		}
		
	},
	methods: {
		findUserByUuid (uuid) {
			if (uuid) {
				UserService.findByUuid(uuid)
					.then(response => {
						this.user = response.data;
						console.log(this.user);
						this.listFollowedsByFollower(uuid);
						this.listFollowersByFollowed(uuid);
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
		loggedUser (){
			LoginService.getActualLogin()
				.then(response => {
					UserService.findByLoginUuid(response.data.uuid)
						.then(response => {
							this.loggedUserObject = response.data;
							this.user = this.loggedUserObject;
							console.log(this.user);
							this.listFollowedsByFollower(this.loggedUserObject.uuid);
							this.listFollowersByFollowed(this.loggedUserObject.uuid);
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
		listFollowedsByFollower (uuid) {
			this.waitingFollowedsList = true;
			UserUserRelationService.findFollowedsByFollower(uuid)
				.then(response => {
					this.rowsFolloweds = response.data;
					this.waitingFollowedsList = false;
				})
				.catch(e => {
					var message = "Não foi possível realizar a buscado dos usuários.";
					if (e.response && e.response.status === 400) {
						message = e.response.data.message;
					}
					this.waitingFollowedsList = false ; 
					this.showNotification(message, 'bottom-right', 'danger')
				});
		},
		listFollowersByFollowed (uuid) {
			this.waitingFollowersList = true;
			UserUserRelationService.findFollowersByFollowed(uuid)
				.then(response => {
					this.rowsFollowers = response.data;
					this.waitingFollowersList = false;
				})
				.catch(e => {
					var message = "Não foi possível realizar a buscado dos usuários.";
					if (e.response && e.response.status === 400) {
						message = e.response.data.message;
					}
					this.waitingFollowersList = false ; 
					this.showNotification(message, 'bottom-right', 'danger')
				});
		},
		unfollow (obj){
			console.log(obj)
			if (obj){
				console.log(obj)
				UserUserRelationService.removeByUuid(obj.followerUuid, obj.followedUuid)
					.then(response => {
						this.showNotification("Você deixou de seguir o usuário", 'bottom-right', 'success');
						if (this.uuidUser){
							this.listFollowedsByFollower(this.uuidUser);
							this.listFollowersByFollowed(this.uuidUser);
						} else {
							this.listFollowedsByFollower(this.loggedUserObject.uuid);
							this.listFollowersByFollowed(this.loggedUserObject.uuid);
						}
					})
					.catch(e => {
						var message = "Não foi possível parar de seguir o usuário";
						if (e.response && e.response.status === 400) {
							message = e.response.data.message;
						}
						this.showNotification(message, 'bottom-right', 'danger');
					});
			}
		},
		redirectPage (page) {
			this.$router.push({ path: page });
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

<style lang="scss">
</style>