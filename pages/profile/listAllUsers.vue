<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-top-bar" class="sc-top-bar">
			<div class="sc-top-bar-content uk-flex uk-flex-1">
				<div class="sc-top-bar-title uk-flex-1">
					<Title title="Usuários"></Title>
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
								:select-options="{
									enabled: true,
									clearSelectionText: 'Limpar',
									selectionText: 'Linhas selecionadas',
									selectOnCheckboxOnly: true
								}"
								:search-options="{
									enabled: true
								}"
								:pagination-options="pagination"
								:total-rows="totalElements"
								:sort-options="sort"
								@on-selected-rows-change="selectionChanged"
								@on-page-change="onPageChange"
								@on-per-page-change="onPerPageChange"
								@on-sort-change="onSortChange"
							>
								<template slot="table-row" slot-scope="props">
									<span v-if="props.column.field == 'login.admin'">
										<span v-if="props.row.login.admin" class="mdi mdi-check-circle-outline md-color-green-700" title="É administrador"></span>
										<span v-if="!props.row.login.admin" class="mdi mdi-checkbox-blank-circle-outline md-color-red-700" title="Não é administrador"></span>
									</span>
									<span v-else-if="props.column.field == 'login.active'">
										<span v-if="props.row.login.active" class="mdi mdi-check-circle-outline md-color-green-700" title="Ativo"></span>
										<span v-if="!props.row.login.active" class="mdi mdi-checkbox-blank-circle-outline md-color-red-700" title="Não ativo"></span>
									</span>
									<span v-else>
										{{ props.formattedRow[props.column.field] }}
									</span>
								</template>
								<template
									v-slot:selected-row-actions
									class="btn-group"
								>
									<button
										v-if="$refs['Table-User'].selectedRows.length == 1 && !$refs['Table-User'].selectedRows[0].login.admin" 
										class="sc-button sc-button-success"
										data-uk-tooltip="Aumentar o privilégio do usuário para admin"
										type="button"
										@click="canChangeAdminUser"
									>
										<span class="mdi mdi-key-plus"></span>
										Admin
									</button>
									<div v-show="showConfirmChangeAdmin" data-uk-drop="mode: click">
										<ScCard>
											<ScCardBody>
												<div>
													<p>Tem certeza que deseja ativar o privilégio de admin para este usuário?</p>
													<div class="uk-inline">
														<button
															class="sc-button sc-button-outline"
															@click="showConfirmChangeAdmin = false"  
														>
															Não
														</button>
													</div>
													<div class="uk-inline">
														<button
															class="sc-button sc-button-primary"
															@click="changeAdminUser($refs['Table-User'].selectedRows[0])"  
														>
															Sim
														</button>
													</div>
												</div>
											</ScCardBody>
										</ScCard>
									</div>
									<button
										v-if="$refs['Table-User'].selectedRows.length == 1 && $refs['Table-User'].selectedRows[0].login.admin" 
										class="sc-button sc-button-danger"
										data-uk-tooltip="Diminuir o privilégio do usuário para normal"
										type="button"
										@click="canChangeAdminUser"
									>
										<i class="mdi mdi-key-minus"></i>
										Admin
									</button>
									<div v-show="showConfirmChangeAdmin" data-uk-drop="mode: click">
										<ScCard>
											<ScCardBody>
												<div>
													<p>Tem certeza que deseja retirar o privilégio de admin deste usuário?</p>
													<div class="uk-inline">
														<button
															class="sc-button sc-button-outline"
															@click="showConfirmChangeAdmin = false"  
														>
															Não
														</button>
													</div>
													<div class="uk-inline">
														<button
															class="sc-button sc-button-primary"
															@click="changeAdminUser($refs['Table-User'].selectedRows[0])"  
														>
															Sim
														</button>
													</div>
												</div>
											</ScCardBody>
										</ScCard>
									</div>

									<button
										v-if="$refs['Table-User'].selectedRows.length == 1 && $refs['Table-User'].selectedRows[0].login.active" 
										class="sc-button sc-button-danger"
										data-uk-tooltip="Inativar o usuário selecionado"
										type="button"
										@click="canInactivateUser"
									>
										<i class="mdi mdi-account-off"></i>
										Inativar
									</button>
									<div v-show="showConfirm" data-uk-drop="mode: click">
										<ScCard>
											<ScCardBody>
												<div>
													<p>Tem certeza que deseja inativar este registro ?</p>
													<div class="uk-inline">
														<button
															class="sc-button sc-button-outline"
															@click="showConfirm = false"  
														>
															Não
														</button>
													</div>
													<div class="uk-inline">
														<button
															class="sc-button sc-button-primary"
															@click="inactivateUser"  
														>
															Sim
														</button>
													</div>
												</div>
											</ScCardBody>
										</ScCard>
									</div>
									<button v-if="$refs['Table-User'].selectedRows.length == 1 && !$refs['Table-User'].selectedRows[0].login.active" 
										class="sc-button sc-button-success"
										data-uk-tooltip="Ativar o usuário selecionado"
										type="button"
										@click="canActivateUser"
									>
										<i class="mdi mdi-account-check"></i>
										Ativar
									</button>
									<div v-show="showConfirmActivate" data-uk-drop="mode: click">
										<ScCard>
											<ScCardBody>
												<div>
													<p>Tem certeza que deseja ativar este registro ?</p>
													<div class="uk-inline">
														<button
															class="sc-button sc-button-outline"
															@click="showConfirmActivate = false"  
														>
															Não
														</button>
													</div>
													<div class="uk-inline">
														<button
															class="sc-button sc-button-primary"
															@click="activateUser"  
														>
															Sim
														</button>
													</div>
												</div>
											</ScCardBody>
										</ScCard>
									</div>
								
									<button 
										v-if="$refs['Table-User'].selectedRows.length == 1" 
										class="sc-button sc-button-primary"
										data-uk-tooltip="Editar o usuário selecionado" 
										@click="editUser($refs['Table-User'].selectedRows[0])"
									>
										<i class="mdi mdi-pencil-plus"></i>
										Editar
									</button>
								</template>
								<div slot="emptystate" class="uk-text-center uk-text-large">
									<span>Não há usuários cadastrados.</span>
								</div>
							</VueGoodTable>
						</fieldset>
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
				tenant: {
					uuid: null
				},
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
			],
			rows: [],
			tenants: [],
			waitingUsersList: false,
			users: [],
			notification: {
				title: '',
				description: ''
			},
			selectedItems: [],
			showConfirm: false,
			showConfirmActivate: false,
			showConfirmChangeAdmin: false,
			pagination:{
				enabled: true,
				//mode: 'remote',
				mode: 'pages',
				perPage: 10,
				position: 'bottom',
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
		inactivateUser () {
			var deleteProcess = [];
			this.selectedItems.forEach(user => {
				if (user.login.active){
					deleteProcess.push(UserService.inactivate(user.uuid));
				}
			});

			Promise.all(deleteProcess)
				.then(results => {
					this.list();
					this.notification.title = "O usuário foi inativado com sucesso";
					this.showNotification(this.notification.title, 'bottom-right', 'success')
				})
				.catch(e => {
					var message = "Houve um erro inesperado.";
					if (e.response && e.response.status === 400) {
						message = e.response.data.message;
					}
					this.showNotification(message, 'bottom-right', 'danger')
				});
		},
		activateUser () {
			var activateProcess = [];
			this.selectedItems.forEach(user => {
				if (!user.login.active){
				    activateProcess.push(UserService.activate(user.uuid));
				}
			});

			Promise.all(activateProcess)
				.then(results => {
					this.list();
					this.notification.title = "O usuário foi ativado com sucesso";
					this.showNotification(this.notification.title, 'bottom-right', 'success')
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
			if (this.loggedUserObject.uuid == selectedUserObj.login.uuid || this.loggedUserObject.admin){
				this.redirectPage('/profile/' + selectedUserObj.login.uuid)
			}
			else{
				var message = "Somente usuários administradores podem editar registros de outros usuários."; 
				this.showNotification(message, 'bottom-right', 'danger')
			}
		},
		canInactivateUser (){
			if (this.loggedUserObject.admin){
				this.showConfirm = true;
			}
			else{
				var message = "Somente usuários administradores podem inativar usuários."; 
				this.showNotification(message, 'bottom-right', 'danger')
			}
		},
		canActivateUser (){
			if (this.loggedUserObject.admin){
				this.showConfirmActivate = true;
			}
			else{
				var message = "Somente usuários administradores podem ativar usuários."; 
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
		canChangeAdminUser (){
			if (this.loggedUserObject.admin){
				this.showConfirmChangeAdmin = true;
			}
			else{
				var message = "Somente usuários administradores podem alterar privilégios."; 
				this.showNotification(message, 'bottom-right', 'danger')
			}
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
		cleanFilters (){
			this.filterData.name = '';
		},
		redirectPage (page) {
			this.$router.push({ path: page });
		},
		selectionChanged (params) {
			this.selectedItems = (params.selectedRows);
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