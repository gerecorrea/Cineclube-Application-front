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
						<div class="uk-flex uk-flex-bottom uk-grid uk-grid-divider" data-uk-grid>
							<div class="uk-width-1-2@m" style="vertical-align: middle">
								<div class="uk-text-center">
									Seguidos
								</div>
								<fieldset class="uk-fieldset md-bg-grey-50 sc-padding uk-margin-top">
									<VueGoodTable
										ref="Table-User"
										:is-loading="waitingUsersList"
										:columns="columns"
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
											<span v-if="props.column.field == 'action'">
												<button class="mdi mdi-close-circle-outline md-color-red-700" data-uk-tooltip="Parar de seguir" @click="unfollow(props.row.uuid)"></button>
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
										:is-loading="waitingUsersList"
										:columns="columns"
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
											<span v-if="props.column.field == 'action'">
												<button class="mdi mdi-close-circle-outline md-color-red-700" data-uk-tooltip="Bloquear seguidor"></button>
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
			msgAlert: '',
			typeAlert: '',
			titleAlert: '',
			snackbar: '', 
			columns: [
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
			waitingUsersList: false,
			users: [],
			notification: {
				title: '',
				description: ''
			},
			pagination:{
				enabled: true,
				mode: 'remote',
				//mode: 'pages',
				perPage: 10,
				position: 'top',
				perPageDropdown: [10, 15, 20, 50, 100],
				dropdownAllowAll: true,
				setCurrentPage: 1,
				nextLabel: 'Próxima',
				prevLabel: 'Anterior',
				rowsPerPageLabel: 'Linhas por página',
				ofLabel: 'of',
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
		}
	},
	mounted () {
		this.uuidUser = this.$route.params.uuid;
		if (this.uuidUser){
			this.listFollowedsByFollower(this.uuidUser);
			this.listFollowersByFollowed(this.uuidUser);
		} else {
			this.loggedUser();
		}
		
	},
	methods: {
		loggedUser (){
			LoginService.getActualLogin()
				.then(response => {
					UserService.findByLoginUuid(response.data.uuid)
						.then(response => {
							this.loggedUserObject = response.data;
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
			this.waitingUsersList = true;
			UserUserRelationService.findFollowedsByFollower(uuid)
				.then(response => {
					this.rowsFolloweds = response.data;
					this.waitingUsersList = false;
				})
				.catch(e => {
					var message = "Não foi possível realizar a buscado dos usuários.";
					if (e.response && e.response.status === 400) {
						message = e.response.data.message;
					}
					this.waitingUsersList = false ; 
					this.showNotification(message, 'bottom-right', 'danger')
				});
		},
		listFollowersByFollowed (uuid) {
			this.waitingUsersList = true;
			UserUserRelationService.findFollowersByFollowed(uuid)
				.then(response => {
					this.rowsFollowers = response.data;
					this.waitingUsersList = false;
				})
				.catch(e => {
					var message = "Não foi possível realizar a buscado dos usuários.";
					if (e.response && e.response.status === 400) {
						message = e.response.data.message;
					}
					this.waitingUsersList = false ; 
					this.showNotification(message, 'bottom-right', 'danger')
				});
		},
		unfollow (uuid){
			if (uuid){
				UserUserRelationService.removeByUuid(uuid)
					.then(response => {
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