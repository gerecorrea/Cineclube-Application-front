<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-top-bar" class="sc-top-bar">
			<div class="sc-top-bar-content uk-flex uk-flex-1">
				<h1 class="sc-top-bar-title uk-flex-1">
					<Title title="WATCHLIST DO USUÁRIO"></Title>
				</h1>
			</div>
		</div>
        
		<div id="sc-page-content">
			<ScCard>
				<ScCardBody>
					<div>
						<ScCardTitle>
							Usuário: 
							<button class="md-color-blue-700" uk-tooltip="Visitar perfil do usuário" @click="redirectPage('/profile/dashboard/' + user.uuid);">
								{{ user.name }}
							</button>
						</ScCardTitle>
						<!-- <div data-uk-margin>
							<button 
								class="sc-button uk-text-left mdi mdi-filter-outline md-color-blue-grey-600"
								data-uk-tooltip="Selecionar filtros para a listagem"
								@click="dialogFilter = true"	
							>
								Filtros
							</button>
						</div> -->
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
								<nuxt-link v-if="props.column.field === 'movie.title'" :to="'/movies/view/' + props.row.movie.uuid">
									{{ props.row.movie.title }}
								</nuxt-link>
								<span v-else-if="props.column.field == 'movie.genres'">
									<div v-for="index in props.row.movie.genresArray"
										:key="index"
										class="uk-label uk-label-warning md-color-black"
										style="margin-right: 5px;"
									>
										{{ index }}
									</div>
								</span>
								<span v-else-if="props.column.field == 'movie.imageLink'">
									<div style="border-style: solid; background-color: black">
										<img :src="props.row.movie.imageLink" width="85px" alt="">
									</div>
								</span>
								<span v-else-if="props.column.field == 'rating'">
									<div v-if="props.row.rated && props.row.rating >= 8" class="uk-label uk-label-success uk-text-medium">
										{{ props.row.rating }}
									</div>
									<div v-else-if="props.row.rated && props.row.rating >= 6" class="uk-label uk-text-medium">
										{{ props.row.rating }}
									</div>
									<div v-else-if="props.row.rated && props.row.rating >= 4" class="uk-label uk-label-warning uk-text-medium">
										{{ props.row.rating }}
									</div>
									<div v-else-if="props.row.rated && props.row.rating > 0" class="uk-label uk-label-danger uk-text-medium">
										{{ props.row.rating }}
									</div>
									<div v-else class="mdi mdi-close-circle-outline md-color-red-800" uk-tooltip="Não há nota">
									</div>
								</span>
								<span v-else-if="props.column.field == 'movie.avgRating'">
									<div v-if="props.row.movie.avgRating && props.row.movie.avgRating >= 8" class="uk-label uk-label-success uk-text-medium">
										{{ props.row.movie.avgRating }}
									</div>
									<div v-else-if="props.row.movie.avgRating && props.row.movie.avgRating >= 6" class="uk-label uk-text-medium">
										{{ props.row.movie.avgRating }}
									</div>
									<div v-else-if="props.row.movie.avgRating && props.row.movie.avgRating >= 4" class="uk-label uk-label-warning uk-text-medium">
										{{ props.row.movie.avgRating }}
									</div>
									<div v-else-if="props.row.movie.avgRating && props.row.movie.avgRating >= 0" class="uk-label uk-label-danger uk-text-medium">
										{{ props.row.movie.avgRating }}
									</div>
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
import UserMovieRelation from "@/services/userMovieRelationService";
import LoginService from "@/services/loginService";
import UserService from "@/services/userService";
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
					field: "movie.imageLink",
					hiden: false,
					tdClass: 'uk-text-center',
					thClass: 'uk-text-center',
					width: '150px',
					sortable: false,

				},
				{
					label: "Título",
					field: "movie.title",
					hidden: false,
				},
				{
					label: "Nota usuário",
					field: "rating",
					hidden: false,
					tdClass: 'uk-text-center',
					thClass: 'uk-text-center',
					type: 'number',
				},
				{
					label: "Média",
					field: "movie.avgRating",
					hidden: false,
					tdClass: 'uk-text-right',
					thClass: 'uk-text-right',
					type: 'number',
				},
				{
					label: "Qtd votos",
					field: "movie.numVotes",
					hidden: false,
					tdClass: 'uk-text-right',
					thClass: 'uk-text-right',
					type: 'number',
				},
				{
					label: "País",
					field: "movie.country",
					hidden: false,
				},
				{
					label: "idioma",
					field: "movie.language",
					hidden: false,
				},
				{
					label: "Duração (min)",
					field: "movie.runtime",
					hidden: false,
					tdClass: 'uk-text-center',
					thClass: 'uk-text-center',
					type: 'number',
				},
				{
					label: "Ano",
					field: "movie.year",
					type: 'number',
					hidden: false,
					thClass: 'text-center',
					tdClass: 'text-center',
				},
				{
					label: "Gênero",
					field: "movie.genres",
					hidden: false,
					tdClass: 'uk-text-center',
					thClass: 'uk-text-center',
					sortable: false,
				},
				{
					label: "",
					field: "action",
					hidden: false,
					tdClass: 'uk-text-center',
					thClass: 'uk-text-center',
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
			movieTypes: [
				{value: "MOVIE", text: "Filme"},
				{value: "SHORT", text: "Curta"},
				{value: "DOCUMENTARY", text: "Documentário"},
				{value: "VIDEO", text: "Vídeo"},
			],
			user: {},
			uuidUser: null,
		}
	},
	mounted () {
		this.uuidUser = this.$route.params.uuid;
		if (this.uuidUser){
			this.findUserByUuid(this.uuidUser);
		} else {
			this.redirectPage('/profile/favoritesMovies');
		}
	},
	methods: {
		findUserByUuid (uuid) {
			if (uuid) {
				UserService.findByUuid(uuid)
					.then(response => {
						this.user = response.data;
						this.listWatchlist();
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
		listWatchlist () {
			this.waitingMoviesList = true ; 
			UserMovieRelation.findWatchlistUser(this.user.uuid)
				.then(response => {
					this.rows = response.data; 
					this.waitingMoviesList = false;
				})
				.catch(e => {
					var message = "Não foi possível listar os filmes favoritos do usuário.";
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
					this.listWatchlist();
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
			this.listWatchlist()
		},
		onPerPageChange (params){
			this.pagination.setCurrentPage = 1
			this.pagination.perPage = params.currentPerPage
			this.listWatchlist()
		},
		onSortChange (params){
			this.sort.type = params[0].type;
			this.sort.field = params[0].field
			this.pagination.setCurrentPage = 1;
			this.listWatchlist()
		},
		cleanFilters (){
			this.filterData.title = '';
			this.filterData.genre = '';
			this.filterData.year = '';
			this.filterData.country = '';
		},
		callList (){
			this.pagination.setCurrentPage = 1;
			this.listWatchlist();
		},
		changeWatchlist (uuid){
			UserMovieRelation.changeWatchlist(uuid)
				.then(response => {
					let message = "Filme retirado da watchlist!";
					this.showNotification(message, 'bottom-right', 'success');
					this.listWatchlist();
				})
				.catch(e => {
					var message = "Não foi possível realizar a operação.";
					if (e.response && e.response.status === 400) {
						message = e.response.data.message;
					}
					this.showNotification(message, 'bottom-right', 'danger')
				});
		},
	}
}
</script>

<style lang="scss">
	@import '~scss/plugins/vue-good-table.scss';
	@import '~scss/vue/_pretty_checkboxes';
</style>