<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-top-bar" class="sc-top-bar">
			<div class="sc-top-bar-content uk-flex uk-flex-1">
				<h1 class="sc-top-bar-title uk-flex-1">
					<Title title="TOP 10 - FILMES"></Title>
				</h1>
			</div>
		</div>
        
		<div id="sc-page-content">
			<ScCard>
				<ScCardBody>
					<div>
						<div data-uk-margin>
						</div>
					</div>
					<fieldset class="uk-fieldset md-bg-blue-grey-50 sc-padding uk-margin-top">
						<VueGoodTable
							v-if="rows !== null"
							:is-loading="waitingMoviesList"
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
								<nuxt-link v-else-if="props.column.field === 'title'" :to="'/movies/view/' + props.row.uuid">
									{{ props.row.title }}
								</nuxt-link>
								<span v-else-if="props.column.field == 'genres'">
									<div v-for="index in props.row.genresArray"
										:key="index"
										class="uk-label uk-label-warning md-color-black"
										style="margin-right: 5px;"
									>
										{{ genreTypesMap.get(index) }}
									</div>
								</span>
								<span v-else-if="props.column.field == 'image'">
									<div style="border-style: solid; background-color: black">
										<img :src="props.row.imageLink" width="85px" alt="">
									</div>
								</span>
								<span v-else-if="props.column.field == 'avgRating'">
									<div v-if="props.row.avgRating && props.row.avgRating >= 8" class="uk-label uk-label-success uk-text-medium">
										{{ props.row.avgRating }}
									</div>
									<div v-else-if="props.row.avgRating && props.row.avgRating >= 6" class="uk-label uk-text-medium">
										{{ props.row.avgRating }}
									</div>
									<div v-else-if="props.row.avgRating && props.row.avgRating >= 4" class="uk-label uk-label-warning uk-text-medium">
										{{ props.row.avgRating }}
									</div>
									<div v-else-if="props.row.avgRating && props.row.avgRating >= 0" class="uk-label uk-label-danger uk-text-medium">
										{{ props.row.avgRating }}
									</div>
									<div v-else class="uk-label md-bg-grey-500 uk-text-medium">
										N/A
									</div>
								</span>
								<span v-else-if="props.column.field == 'numFavorites'" style="font-weight: 500">
									<div v-if="props.row.numFavorites == null"> 0 </div>
									<div v-else> {{ props.formattedRow[props.column.field] }} </div>
								</span>
								<span v-else style="font-weight: 500">
									{{ props.formattedRow[props.column.field] }}
								</span>
							</template>
							<div slot="emptystate" class="uk-text-center uk-text-large">
								<span>Não há filmes cadastrados ou para esta busca.</span>
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

import MovieService from "@/services/movieService";
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
					sortable: false,
					width: '150px',

				},
				{
					label: "Título",
					field: "title",
					hidden: false,
					sortable: false,
				},
				{
					label: "Média",
					field: "avgRating",
					hidden: false,
					tdClass: 'uk-text-right',
					thClass: 'uk-text-right',
					type: 'number',
					sortable: false,
				},
				{
					label: "Votos",
					field: "numVotes",
					hidden: false,
					tdClass: 'uk-text-right',
					thClass: 'uk-text-right',
					type: 'number',
					sortable: false,
				},
				{
					label: "Favoritos",
					field: "numFavorites",
					hidden: false,
					tdClass: 'uk-text-center',
					thClass: 'uk-text-center',
					type: 'number',
					sortable: false,
				},
				{
					label: "Ano",
					field: "year",
					type: 'number',
					hidden: false,
					thClass: 'text-center',
					tdClass: 'text-center',
					sortable: false,
				},
				{
					label: "Duração",
					field: "runtime",
					hidden: false,
					tdClass: 'uk-text-center',
					thClass: 'uk-text-center',
					type: 'number',
					sortable: false,
				},
				{
					label: "Gênero",
					field: "genres",
					hidden: false,
					tdClass: 'uk-text-center',
					thClass: 'uk-text-center',
					sortable: false,
				},
				{
					label: "País",
					field: "country",
					hidden: false,
					sortable: false,
				},
				{
					label: "idioma",
					field: "language",
					hidden: false,
					sortable: false,
				
				},
				{
					label: "",
					field: "action",
					hidden: false,
					tdClass: 'uk-text-center',
					thClass: 'uk-text-center',
					sortable: false,
				},
			],
			rows: [],
			notification: {
				title: '',
				description: ''
			},
			waitingMoviesList: false,
			removeItems: [],
			showConfirm: true,
			pagination: {
				enabled: true,
				//mode: 'pages',
				mode: 'remote',
				perPage: 10,
				position: 'top',
				perPageDropdown: [10],
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
				yearMin: null,
				yearMax: null,
				durationMin: null,
				durationMax: null,
				numVotesMin: null,
				numVotesMax: null,
				avgRatingMin: null,
				avgRatingMax: null,
			},
			dialogFilter: false,
			genreTypes: [
				{value: "COMEDY", text: "Comédia"},
				{value: "SCI_FI", text: "Ficção Científica"},
				{value: "HORROR", text: "Terror"},
				{value: "ROMANCE", text: "Romance"},
				{value: "ACTION", text: "Ação"},
				{value: "THRILLER", text: "Thriller"},
				{value: "DRAMA", text: "Drama"},
				{value: "MYSTERY", text: "Mistério"},
				{value: "CRIME", text: "Crime"},
				{value: "ANIMATION", text: "Animação"},
				{value: "ADVENTURE", text: "Aventura"},
				{value: "FANTASY", text: "Fantasia"},
				{value: "SUPERHERO", text: "Super-herói"},
			],
			genreTypesMap: new Map(),
			movieTypes: [
				{value: "MOVIE", text: "Filme"},
				{value: "SHORT", text: "Curta"},
				{value: "DOCUMENTARY", text: "Documentário"},
				{value: "VIDEO", text: "Vídeo"},
			],
		}
	},
	mounted () {
		this.genresTypesMap();
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
			this.waitingMoviesList = true ; 
			MovieService.findTop10()
				.then(response => {
					//this.rows = response.data.content; 
					this.rows = response.data; 
					//this.totalElements = response.data.totalElements;
					this.waitingMoviesList = false ; 
				})
				.catch(e => {
					var message = "Não foi possível listar os filmes cadastrados.";
					if (e.response && e.response.status === 400) {
						message = e.response.data.message;
					}
					this.waitingMoviesList = false ; 
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
		genresTypesMap (){
			this.genreTypesMap.set("COMEDY", "Comédia");
			this.genreTypesMap.set("SCI_FI", "Ficção Científica");
			this.genreTypesMap.set("HORROR", "Terror");
			this.genreTypesMap.set("ROMANCE", "Romance");
			this.genreTypesMap.set("ACTION", "Ação");
			this.genreTypesMap.set("THRILLER", "Thriller");
			this.genreTypesMap.set("DRAMA", "Drama");
			this.genreTypesMap.set("MYSTERY", "Mistério");
			this.genreTypesMap.set("CRIME", "Crime");
			this.genreTypesMap.set("ANIMATION", "Animação");
			this.genreTypesMap.set("ADVENTURE", "Aventura");
			this.genreTypesMap.set("FANTASY", "Fantasia");
			this.genreTypesMap.set("SUPERHERO", "Super-herói");
		},
	}
}
</script>

<style lang="scss">
	@import '~scss/plugins/vue-good-table.scss';
	@import '~scss/vue/_pretty_checkboxes';
</style>