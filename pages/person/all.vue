<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-top-bar" class="sc-top-bar">
			<div class="sc-top-bar-content uk-flex uk-flex-1">
				<h1 class="sc-top-bar-title uk-flex-1">
					<Title title="ESTRELAS"></Title>
				</h1>
			</div>
		</div>
        
		<div id="sc-page-content">
			<ScCard>
				<ScCardBody>
					<div>
						<div data-uk-margin class="uk-text-right">
							<nuxt-link :to=" '/person/'">
								<button class="sc-button sc-button-primary" data-uk-tooltip="Cadastrar nova estrela de cinema">
									<i class="mdi mdi-plus"></i>
									Inserir artista
								</button>
							</nuxt-link>
						</div>
					</div>
					<fieldset class="uk-fieldset md-bg-grey-100 sc-padding uk-margin-top">
						<VueGoodTable
							v-if="rows !== null"
							:is-loading="waitingPersonsList"
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
								<span v-if="props.column.field == 'action'">
									<button class="mdi mdi-pen sc-button sc-button-primary sc-button-small" uk-tooltip="Editar" @click="redirectPage(props.row.uuid)"></button>
								</span>
								<span v-if="props.column.field == 'image'">
									<div style="border-style: solid; background-color: black">
										<img :src="props.row.imageLink" width="85px" alt="">
									</div>
								</span>
								<span v-if="props.column.field == 'jobTypes'">
									<div v-for="index in props.row.jobTypes"
										:key="index"
										class="uk-label uk-label-warning md-color-black"
									>
										{{ index }}
									</div>
								</span>
								<span v-else>
									{{ props.formattedRow[props.column.field] }}
								</span>
							</template>
							<div slot="emptystate" class="uk-text-center uk-text-large">
								<span>Não há estrelas cadastradas para esta busca.</span>
							</div>	
						</VueGoodTable>
					</fieldset>
				</ScCardBody>
			</ScCard>
		</div>
	</div>
</template>
<script>

import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';
import push from 'push.js'

import PersonService from "@/services/personService";
import Title from "~/components/Title"

if(process.client) {
	require('~/plugins/inputmask')
}

export default {
	middleware: "authenticated",
	components: {
		VueGoodTable,
		Title,
	},
	data () {
		return {			
			columns: [
				{
					label: "",
					field: "image",
					hiden: false,
					tdClass: 'uk-text-center',
					thClass: 'uk-text-center'

				},
				{
					label: "Nome",
					field: "name",
					hidden: false,
				},
				{
					label: "Ano de nasc.",
					field: "birthYear",
					thClass: 'text-center',
					tdClass: 'text-center',
					sortable: false,
					hidden: false,
				},
				{
					label: "País de origem",
					field: "country",
					hidden: false,
				},
				{
					label: "Tipos de trabalho",
					field: "jobTypes",
					hidden: false,
					sortable: false,
				},
				{
					label: "",
					field: "action",
					hidden: false,
					tdClass: 'uk-text-center',
					thClass: 'uk-text-center'
				},
			],
			rows: [],
			notification: {
				title: '',
				description: ''
			},
			waitingPersonsList: false,
			removeItems: [],
			showConfirm: true,
			pagination: {
				enabled: true,
				mode: 'pages',
				//mode: 'remote',
				perPage: 10,
				position: 'top',
				perPageDropdown: [10, 15, 20, 50, 100],
				dropdownAllowAll: false,
				setCurrentPage: 1,
				nextLabel: 'Próxima',
				prevLabel: 'Anterior',
				rowsPerPageLabel: 'Linhas por página',
				ofLabel: 'of',
				//pageLabel: 'page', // for 'pages' mode
				allLabel: 'Todos'
			},
			sort:{
				enabled: true
			},
			totalElements: 10,
			filterData: {
				title: '',
				genre: '',
				year: '',
				country: '',
			},
		}
	},
	mounted () {
		this.list();
	},
	methods: {
		showNotification (text, pos, status, persistent) {
			var config = {};
			config.timeout = persistent ? !persistent : 5000;
			if(status) {
				config.status = status;
			}
			if(pos) {
				config.pos = pos;
			}
			UIkit.notification(text, config);
		},
		list () {
			this.waitingPersonsList = true ; 
			PersonService.findAll()
				.then(response => {
					this.rows = response.data; 
					// this.rows.forEach(k => {
					// 	k.birthYear = new Date(k.birth).getFullYear();
					// });
					this.waitingPersonsList = false ; 
				})
				.catch(e => {
					var message = "Não foi possível listar as estrelas cadastrados.";
					if (e.response && e.response.status === 400) {
						message = e.response.data.message;
					}
					this.waitingPersonsList = false ; 
					this.showNotification(message, 'bottom-right', 'danger')
				});
		},
		remove () {
			var deleteProcess = [];
			this.removeItems.forEach(bill => {
				deleteProcess.push(Bill.delete(bill.uuid));
			});

			Promise.all(deleteProcess)
				.then(results => {
					this.notification.title = "Registro deletado com sucesso";
					this.showNotification(this.notification.title, 'bottom-right', 'success') 
					this.list();
				})
				.catch(e => {
					var message = "Houve um erro inesperado.";
					if (e.response && e.response.status === 400) {
						message = e.response.data.message;
					}

					this.showNotification(message, 'bottom-right', 'danger')
				});
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
		},
		cleanFilters (){
			this.filterData.title = '';
			this.filterData.genre = '';
			this.filterData.year = '';
			this.filterData.country = '';
		},
		callList (){
			this.pagination.setCurrentPage = 1;
			this.list();
		},
		nothing (){
			return '';
		}
	}
}
</script>

<style lang="scss">
	@import '~scss/plugins/vue-good-table.scss';
	@import '~scss/vue/_pretty_checkboxes';
</style>