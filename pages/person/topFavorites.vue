<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-top-bar" class="sc-top-bar">
			<div class="sc-top-bar-content uk-flex uk-flex-1">
				<h1 class="sc-top-bar-title uk-flex-1">
					<Title title="TOP 25 - ESTRELAS"></Title>
				</h1>
			</div>
		</div>
        
		<div id="sc-page-content">
			<ScCard>
				<ScCardBody>
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
								<span v-if="props.column.field == 'index'" style="font-size: 20px; font-weight: bold; font-family: sans-serif;">
									{{ props.index + 1 }}º
								</span>
								<span v-else-if="props.column.field == 'image'">
									<div style="border-style: solid; background-color: black">
										<img :src="props.row.imageLink" width="85px" alt="">
									</div>
								</span>
								<span v-else-if="props.column.field == 'name'">
									<nuxt-link v-if="props.column.field === 'name'" :to="'/person/view/' + props.row.uuid">
										{{ props.row.name }}
									</nuxt-link>
								</span>
								<span v-else-if="props.column.field == 'jobTypes'">
									<span v-if="props.row.director" class="uk-label md-bg-green-500">Diretor</span>
									<span v-else class="uk-label md-bg-grey-500">Diretor</span>

									<span v-if="props.row.actor" class="uk-label md-bg-green-500">Ator</span>
									<span v-else class="uk-label md-bg-grey-500">Ator</span>

									<span v-if="props.row.writer" class="uk-label md-bg-green-500">Escritor</span>
									<span v-else class="uk-label md-bg-grey-500">Escritor</span>

									<span v-if="props.row.producer" class="uk-label md-bg-green-500">Produtor</span>
									<span v-else class="uk-label md-bg-grey-500">Produtor</span>
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
					label: "Posição",
					field: "index",
					sortable: false,
					type: "number",
					thClass: "text-center",
					tdClass: "text-center"
				},
				{
					label: "",
					field: "image",
					hiden: false,
					tdClass: 'uk-text-center',
					thClass: 'uk-text-center',
					width: '150px',
					sortable: false,

				},
				{
					label: "Nome",
					field: "name",
					hidden: false,
					sortable: false,
				},
				{
					label: "Favoritações",
					field: "numFavorites",
					thClass: "text-center",
					tdClass: "text-center",
					hidden: false,
					sortable: false,
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
					sortable: false,
				},
				{
					label: "Tipos de trabalho",
					field: "jobTypes",
					hidden: false,
					sortable: false,
					thClass: 'text-center',
					tdClass: 'text-center',
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
				perPage: 100,
				position: 'top',
				perPageDropdown: [10],
				dropdownAllowAll: false,
				setCurrentPage: 1,
				nextLabel: 'Próxima',
				prevLabel: 'Anterior',
				rowsPerPageLabel: 'Linhas por página',
				ofLabel: 'de',
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
		this.findTopArtists();
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
		findTopArtists () {
			this.waitingPersonsList = true ; 
			PersonService.findTopArtists(25)
				.then(response => {
					this.rows = response.data;
					this.waitingPersonsList = false; 
				})
				.catch(e => {
					var message = "Não foi possível listar o top 10 das estrelas.";
					if (e.response && e.response.status === 400) {
						message = e.response.data.message;
					}
					this.waitingPersonsList = false ; 
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