<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-top-bar" class="sc-top-bar">
			<div class="sc-top-bar-content uk-flex uk-flex-1">
				<div class="sc-top-bar-title uk-flex-1">
					<Title title="USUÁRIOS"></Title>
				</div>
			</div>
		</div>

		<div id="sc-page-content">
			<div>
				<ScCard>
					<ScCardBody>
						<div>
							<div data-uk-margin class="uk-text-right">
								<button 
									class="sc-button sc-button-primary" 
									data-uk-tooltip="Cadastrar novo usuário"
									@click="newRegister"
								>
									<i class="mdi mdi-plus"></i>
									Novo usuário
								</button>
							</div>
						</div>
						<fieldset class="uk-fieldset md-bg-grey-100 sc-padding uk-margin-top">
							<VueGoodTable
								ref="Table-User"
								:is-loading="waitingUsersList"
								:columns="columns"
								:rows="rows"
								style-class="uk-table uk-table-divider scutum-vgt"
								:search-options="{
									enabled: true,
									placeholder: 'Digite para buscar'
								}"
								:pagination-options="pagination"
								:total-rows="totalElements"
								:sort-options="sort"
								@on-page-change="onPageChange"
								@on-per-page-change="onPerPageChange"
								@on-sort-change="onSortChange"
							>
								<template slot="table-row" slot-scope="props">
									<span v-if="props.column.field == 'login.admin'">
										<span v-if="props.row.login.admin" class="mdi mdi-checkbox-marked-circle-outline md-color-green-700" title="É administrador"></span>
										<span v-if="!props.row.login.admin" class="mdi mdi-checkbox-blank-circle-outline md-color-red-700" title="Não é administrador"></span>
									</span>
									<span v-else-if="props.column.field == 'login.active'">
										<span v-if="props.row.login.active" class="mdi mdi-checkbox-marked-circle-outline md-color-green-700" title="Ativo"></span>
										<span v-if="!props.row.login.active" class="mdi mdi-checkbox-blank-circle-outline md-color-red-700" title="Não ativo"></span>
									</span>
									<span v-else-if="props.column.field == 'action'">
										<v-row style="padding-top: 12px">
											<button v-if="props.row.login.admin"
												class="sc-button sc-button-danger sc-button-small mdi mdi-key-minus"
												uk-tooltip="Diminuir privilégio do usuário"
												@click="confirmChangeAdminUser(props.row)"
											></button>
											<button v-else
												class="mdi mdi-key-plus sc-button sc-button-small sc-button-success"
												uk-tooltip="Aumentar privilégio do usuário"
												@click="confirmChangeAdminUser(props.row)"
											></button>
											<v-spacer></v-spacer>
											<button v-if="props.row.login.active"
												class="mdi mdi-account-off sc-button sc-button-small sc-button-danger"
												uk-tooltip="Inativar usuário no sistema"
												@click="confirmChangeActivateInactivateUser(props.row)"
											></button>
											<button v-else
												class="mdi mdi-account-check sc-button sc-button-small sc-button-success"
												uk-tooltip="Ativar usuário no sistema"
												@click="confirmChangeActivateInactivateUser(props.row)"
											></button>
											<v-spacer></v-spacer>
											<button 
												class="mdi mdi-pen sc-button sc-button-small sc-button-primary" 
												uk-tooltip="Editar" 
												@click="editUser(props.row)"
											>
											</button>
										</v-row>
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

						<v-dialog v-model="showConfirmChangeAdmin"
							width="50%"
							persistent
						>
							<v-card>
								<v-card-title v-if="!user.login.admin">
									Tem certeza que deseja ativar o privilégio de admin para este usuário?
								</v-card-title>
								<v-card-title v-else>
									Tem certeza que deseja desativar o privilégio de admin para este usuário?
								</v-card-title>
								<v-card-actions>
									<v-spacer></v-spacer>
									<button class="sc-button sc-button-flat sc-button-flat-danger" type="button" @click="showConfirmChangeAdmin = false">
										Não
									</button>
									<div class="uk-text-right">
										<button id="sc-js-card-add"
											class="sc-button uk-modal-close"
											type="button"
											@click="showConfirmChangeAdmin = false, changeAdminUser(user)"
										>
											Sim
										</button>
									</div>
								</v-card-actions>
							</v-card>
						</v-dialog>

						<v-dialog v-model="showConfirmChangeActivate"
							width="50%"
							persistent
						>
							<v-card>
								<v-card-title v-if="!user.login.active">
									Tem certeza que deseja ativar este usuário?
								</v-card-title>
								<v-card-title v-else>
									Tem certeza que deseja inativar este usuário?
								</v-card-title>
								<v-card-actions>
									<v-spacer></v-spacer>
									<button class="sc-button sc-button-flat sc-button-flat-danger" type="button" @click="showConfirmChangeActivate = false">
										Não
									</button>
									<div class="uk-text-right">
										<button id="sc-js-card-add"
											class="sc-button uk-modal-close"
											type="button"
											@click="showConfirmChangeActivate = false, activateInactivateUser(user)"
										>
											Sim
										</button>
									</div>
								</v-card-actions>
							</v-card>
						</v-dialog>
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
			user: {
				uuid: null,
				login: {
					username: null,
					password: null
				},
			},
			msgAlert: '',
			typeAlert: '',
			titleAlert: '',
			snackbar: '', 
			columns: [
				{
					label: "Nome",
					field: "name",
					hidden: false,
					width: '150px',
					sortable: false,
				},
				{
					label: "E-mail",
					field: "email",
					hidden: false,
					tdClass: 'text-left'
				},
				
				{
					label: "Login",
					field: "login.username",
					hidden: false,
					tdClass: 'text-left'
				},
				{
					label: "Administrador",
					field: "login.admin",
					hidden: false,
					tdClass: 'text-center',
					thClass: 'text-center',
					type: 'boolean',
					sortable: false,
				},
				{
					label: "Ativo no sistema",
					field: "login.active",
					hidden: false,
					tdClass: 'text-center',
					thClass: 'text-center',
					type: 'boolean',
				},
				{
					label: "",
					field: "action",
					hidden: false,
					tdClass: 'text-center',
					thClass: 'text-center',
					width: '125px',
				},

			],
			rows: [],
			waitingUsersList: false,
			users: [],
			notification: {
				title: '',
				description: ''
			},
			showConfirmChangeAdmin: false,
			showConfirmChangeActivate: false,
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
			loggedUserObject: null,
			filterData: {
				name: '',
			},
		}
	},
	mounted () {
		this.list();
		this.loggedUser();
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
		list () {
			this.waitingUsersList = true;
			UserService.findAll()
				.then(response => {
					this.users = response.data.content;
					//this.rows = response.data.content;
					this.rows = response.data;
					//this.totalElements = response.data.totalElements;
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
		activateInactivateUser (user) {
			UserService.activateInactivate(user.uuid)
				.then(response => {
					this.cleanAll();
					this.notification.title = "O usuário foi inativado com sucesso";
					this.showNotification(this.notification.title, 'bottom-right', 'success')
				})
				.catch(e => {
					var message = "Não foi possível realizar a ação sobre o usuário.";
					if (e.response && e.response.status === 400) {
						message = e.response.data.message;
					}
					this.waitingUsersList = false ; 
					this.showNotification(message, 'bottom-right', 'danger')
				});
		},
		loggedUser (){
			LoginService.getActualLogin()
				.then(response => {
					this.loggedUserObject = response.data;
				})
				.catch(e => {
					var message = "Não foi possível buscar o usuário logado.";
					if (e.response && e.response.status === 400) {
						message = e.response.data.message;
					}
					this.waitingUsersList = false ; 
					this.showNotification(message, 'bottom-right', 'danger')
				});
		},
		newRegister (){
			if (this.loggedUserObject.admin){
				this.$router.push("/profile/");
			}
			else{
				var message = "Somente usuários administradores podem criar novos registros."; 
				this.showNotification(message, 'bottom-right', 'danger')
			}
		},
		editUser (selectedUserObj){
			console.log(selectedUserObj)
			if (this.loggedUserObject.uuid == selectedUserObj.login.uuid || this.loggedUserObject.admin){
				this.redirectPage('/profile/' + selectedUserObj.uuid)
			}
			else{
				var message = "Somente usuários administradores podem editar registros de outros usuários."; 
				this.showNotification(message, 'bottom-right', 'danger')
			}
		},
		showActivate (length, obj){
			if (length == 1 && !obj.login.active){
				return true
			}
			return false
		},
		showInactivate (length, obj){
			if (length == 1 && obj.login.active){
				return true
			}
			return false
		},
		changeAdminUser (user) {
			UserService.changeAdmin(user.uuid)
				.then(response => {
					if(this.loggedUserObject.uuid == user.login.uuid){
						this.loggedUser();
					}
					this.list();
					this.notification.title = "O privilégio do usuário foi modificado.";
					this.showNotification(this.notification.title, 'bottom-right', 'success')
				})
				.catch(e => {
					var message = "Não foi possível modificar o privilégio do usuário.";
					if (e.response && e.response.status === 400) {
						message = e.response.data.message;
					}
					this.waitingUsersList = false ; 
					this.showNotification(message, 'bottom-right', 'danger')
				});
		},
		confirmChangeAdminUser (user){
			if (this.loggedUserObject.admin){
				this.user = user;
				this.showConfirmChangeAdmin = true;
			}
			else{
				var message = "Somente usuários administradores podem alterar privilégios."; 
				this.showNotification(message, 'bottom-right', 'danger')
			}
		},
		confirmChangeActivateInactivateUser (user){
			if (this.loggedUserObject.admin){
				this.user = user;
				this.showConfirmChangeActivate = true;
			}
			else{
				var message = "Somente usuários administradores podem ativar usuários."; 
				this.showNotification(message, 'bottom-right', 'danger')
			}
		},
		cleanFilters (){
			this.filterData.name = '';
		},
		cleanAll (){
			this.userEditDialog = false;
			this.user= {};
			this.user.login = {};
			this.showConfirmChangeAdmin = false;
			this.showConfirmChangeActivate = false;
			this.list();
		},
		redirectPage (page) {
			this.$router.push({ path: page });
		},
		onPageChange (params){
			this.pagination.setCurrentPage = params.currentPage
			this.list()
		},
		onPerPageChange (params){
			this.pagination.setCurrentPage = 1
			this.pagination.perPage = params.currentPerPage
			this.list()
		},
		onSortChange (params){
			this.sort.type = params[0].type;
			this.sort.field = params[0].field
			this.pagination.setCurrentPage = 1;
			this.list()
		}
	}
}
</script>

<style lang="scss">
</style>