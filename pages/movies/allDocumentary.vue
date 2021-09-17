<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-top-bar" class="sc-top-bar">
			<div class="sc-top-bar-content uk-flex uk-flex-1">
				<h1 class="sc-top-bar-title uk-flex-1">
					<Title title="DOCUMENTÁRIOS"></Title>
				</h1>
			</div>
		</div>
        
		<div id="sc-page-content">
			<ScCard>
				<ScCardBody>
					<div>
						<div data-uk-margin>
							<button 
								class="sc-button uk-text-left mdi mdi-filter-outline md-color-blue-grey-600"
								data-uk-tooltip="Selecionar filtros para a listagem"
								@click="dialogFilter = true"	
							>
								Filtros
							</button>
							<button style="float: right"
								class="sc-button uk-text-right"
								data-uk-tooltip="Cadastrar novo filme"
								@click="redirectPage('/movies/')"
							>
								<img src="~/assets/img/movie-add.png" width="35px" alt="">
								Inserir filme
							</button>
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
								<nuxt-link v-if="props.column.field === 'title'" :to="'/movies/view/' + props.row.uuid">
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
								<span v-else-if="props.column.field == 'action'">
									<button v-if="loggedUserObject && loggedUserObject.admin"
										class="mdi mdi-pen sc-button sc-button-primary sc-button-small"
										uk-tooltip="Editar"
										@click="editMovie(props.row)"
									></button>
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
								<span>Não há documentários cadastrados ou para esta busca.</span>
							</div>	
						</VueGoodTable>
					</fieldset>
				</ScCardBody>
			</ScCard>
		</div>
		<v-dialog
			v-model="dialogFilter"
			width="50%"
			persistent
			scrollable
			style="z-index: 1500"
		>
			<v-card>
				<v-card-title class="uk-modal-title">
					Selecionar filtros
				</v-card-title>
				<v-card-text class="text--primary">
					<div
						class="md-color-blue-grey-100"
					>
						<div class="uk-flex uk-flex-bottom uk-grid" data-uk-grid>
							<div class="uk-width-1-1@m">
								<v-text-field
									v-model="filterData.title"
									hint="Digite o nome do filme"
									label="Nome do filme"
								></v-text-field>
							</div>
							<div class="uk-width-1-2@m" style="vertical-align: middle">
								<v-text-field
									v-model="filterData.country"
									hint="Digite o nome do país"
									label="País"
								></v-text-field>
							</div>
							<div class="uk-width-1-2@m">
								<v-autocomplete
									v-model="filterData.genre"
									:items="genreTypes"									
									dense
									chips
									label="Gênero"
								></v-autocomplete>
							</div>
							<div class="uk-width-1-4@m">
								<v-text-field
									v-model="filterData.yearMin"
									hint="Digite o ano mínimo"
									label="Ano (mínimo)"
									type="number"
								></v-text-field>
							</div>
							<div class="uk-width-1-4@m">
								<v-text-field
									v-model="filterData.yearMax"
									hint="Digite o ano máximo"
									label="Ano (máximo)"
									type="number"
								></v-text-field>
							</div>
							<div class="uk-width-1-4@m">
								<v-text-field
									v-model="filterData.avgRatingMin"
									hint="Digite a nota mínima"
									label="Nota (mínima)"
									type="number"
								></v-text-field>
							</div>
							<div class="uk-width-1-4@m">
								<v-text-field
									v-model="filterData.avgRatingMax"
									hint="Digite a nota máxima"
									label="Nota (máxima)"
									type="number"
								></v-text-field>
							</div>
							<div class="uk-width-1-4@m">
								<v-text-field
									v-model="filterData.numVotesMin"
									hint="Digite os votos mínimos"
									label="Votos (mínimo)"
									type="number"
								></v-text-field>
							</div>
							<div class="uk-width-1-4@m">
								<v-text-field
									v-model="filterData.numVotesMax"
									hint="Digite os votos máximos"
									label="Votos (máxima)"
									type="number"
								></v-text-field>
							</div>
							<div class="uk-width-1-4@m">
								<v-text-field
									v-model="filterData.durationMin"
									hint="Digite a duração mínima"
									label="Duração (mínima)"
									type="number"
								></v-text-field>
							</div>
							<div class="uk-width-1-4@m">
								<v-text-field
									v-model="filterData.durationMax"
									hint="Digite a duração máxima"
									label="Duração (máxima)"
									type="number"
								></v-text-field>
							</div>
						</div>
					</div>
				</v-card-text>
                
				<v-card-actions class="sc-padding-top">
					<v-spacer></v-spacer>
					<div>
						<button class="sc-button sc-button-light sc-button-flat-danger" type="button" @click="dialogFilter = false">
							Voltar
						</button>
					</div>
					<div>
						<button class="sc-button sc-button sc-button-danger" type="button" @click="dialogFilter = false">
							Limpar filtros
						</button>
					</div>
					<div class="" style="padding-left: 3px">
						<button class="sc-button sc-button-light sc-button-primary"
							type="button"
							@click="dialogFilter = false"
						>
							Filtrar
						</button>
					</div>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>
<script>

import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';
import push from 'push.js'

import MovieService from "@/services/movieService";
import LoginService from '@/services/loginService';
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
				enabled: true,
				initialSortBy: {field: 'title', type: 'asc'}
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
			loggedUserObject: null,
			columns: [
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
					label: "Título",
					field: "title",
					hidden: false,
				},
				{
					label: "Média",
					field: "avgRating",
					hidden: false,
					tdClass: 'uk-text-right',
					thClass: 'uk-text-right',
					type: 'number',
				},
				{
					label: "Votos",
					field: "numVotes",
					hidden: false,
					tdClass: 'uk-text-right',
					thClass: 'uk-text-right',
					type: 'number',
				},
				{
					label: "Favoritos",
					field: "numFavorites",
					hidden: false,
					tdClass: 'uk-text-center',
					thClass: 'uk-text-center',
					type: 'number',
				},
				{
					label: "Ano",
					field: "year",
					type: 'number',
					hidden: false,
					thClass: 'text-center',
					tdClass: 'text-center',
				},
				{
					label: "Duração",
					field: "runtime",
					hidden: false,
					tdClass: 'uk-text-center',
					thClass: 'uk-text-center',
					type: 'number',
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
				},
				{
					label: "idioma",
					field: "language",
					hidden: false,
				
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
		}
	},
	mounted () {
		this.genresTypesMap();
		this.list();
		this.loggedUser();
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
			MovieService.findAllDocumentary()
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
		editMovie (obj){
			if (this.loggedUserObject.admin){
				this.redirectPage('/movies/' + obj.uuid)
			}
			else{
				var message = "Somente usuários administradores podem editar filmes."; 
				this.showNotification(message, 'bottom-right', 'danger')
			}
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
		}
		
	}
}
</script>

<style lang="scss">
	@import '~scss/plugins/vue-good-table.scss';
	@import '~scss/vue/_pretty_checkboxes';
</style>