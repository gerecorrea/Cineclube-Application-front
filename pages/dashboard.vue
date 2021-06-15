<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			HEYYYYY
		</div>
	</div>
</template>

<script>
import 'vue-good-table/dist/vue-good-table.css'
import MovieService from '@/services/movieService'

export default {
	middleware: "authenticated",
	components: {
	},
	data: () => ({
		dashboardData: null,
		schedulerQuantityTotal: 0,
		emailsQuantity: 0,
		smsQuantity: 0,
		callQuantity: 0,
		billingWorkflowsArray: [],
		schedulersArrayChart: [],
		chartColors: [],
		schedulersArrayTable: [],
		schedulers: [],
		countBillingWorkflows: 0,
		indexBillingWorkflow: 0,
		sumBillsChart: null,
		sumBillsChartLoaded: false,
		schedulersGeneratedChartLoaded: false,
		arraySchedulersChart: [],
		arraySchedulersTable: [],
		dialogShowDetails: false,
		showObjectDetails: {},
		days: [],
		dataDays: [0, 0, 0, 0, 0, 0, 0],
		notification: {
			title: '',
			description: ''
		},
		dataByDayFiltered: [0, 0, 0, 0, 0, 0, 0],
		dataByMonthFiltered: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		dataByYearFiltered: [0, 0, 0, 0, 0],
		appMounted: false,
		activePeriod: 'days',
		data: [
			{
				uuid: 549731,
				sendDate: '25/03/2021',
				debtorName: 'Exemplo 1',
				directedTo: 'pontosistemas@example.com',
				title: 'Exemplo de envio',
				subject: 'blá blá',
				isSended: true,
				isReaded: false,
				isRejected: false
			},
			{
				uuid: 549731,
				sendDate: '29/03/2021',
				debtorName: 'Exemplo 2',
				directedTo: 'pontosistemas@example.com',
				title: 'Exemplo de envio 2',
				subject: 'blá blá',
				isSended: true,
				isReaded: true,
				isRejected: true
			},
			{
				uuid: 549731,
				sendDate: '29/03/2021',
				debtorName: 'Exemplo 3',
				directedTo: 'pontosistemas@example.com',
				title: 'Exemplo de envio 3',
				subject: 'blá blá',
				isSended: true,
				isReaded: true,
				isRejected: false
			},
			{
				uuid: 549731,
				sendDate: '26/03/2021',
				debtorName: 'Exemplo 4',
				directedTo: 'pontosistemas@example.com',
				title: 'Exemplo de envio 4',
				subject: 'blá blá',
				isSended: false,
				isReaded: false,
				isRejected: false
			},
			{
				uuid: 549731,
				sendDate: '24/03/2021',
				debtorName: 'Exemplo 5',
				directedTo: 'pontosistemas@example.com',
				title: 'Exemplo de envio 5',
				subject: 'blá blá',
				isSended: false,
				isReaded: false,
				isRejected: false
			},
			{
				uuid: 549731,
				sendDate: '21/03/2021',
				debtorName: 'Exemplo 6',
				directedTo: 'pontosistemas@example.com',
				title: 'Exemplo de envio 6',
				subject: 'blá blá',
				isSended: false,
				isReaded: false,
				isRejected: false
			},
			{
				uuid: 549731,
				sendDate: '29/03/2021',
				debtorName: 'Exemplo 7',
				directedTo: 'pontosistemas@example.com',
				title: 'Exemplo de envio 7',
				subject: 'blá blá',
				isSended: true,
				isReaded: false,
				isRejected: true
			},
			{
				uuid: 549731,
				sendDate: '29/03/2021',
				debtorName: 'Exemplo 8',
				directedTo: 'pontosistemas@example.com',
				title: 'Exemplo de envio 8',
				subject: 'blá blá',
				isSended: true,
				isReaded: false,
				isRejected: false
			},
			
		],
		theme: {
			name: 'striped',
			value: {
				grid: {
					text: '#222'
				},
				cell: {
					normal: {
						border: '#e0e0e0',
						showVerticalBorder: true
					},
					disabled: {
						text: '#999'
					},
					head: {
						border: '#bdbdbd',
						background: '#eeeeee'
					},
					selectedHead: {
						background: '#e0e0e0'
					},
					focused: {
						border: "#1565C0"
					}
				},
				area: {
					summary: {
						border: '#bdbdbd'
					}
				}
			}
		},
		columnsStageCode: [
			{
				label: 'Estágio',
				field: 'name',
				hidden: false,
				type: 'String'
			},
			{
				label: 'Quantidade',
				field: 'quantity',
				hidden: false,
				type: 'number',
				tdClass: 'text-center',
				thClass: 'text-center'
			}
		],
		sort:{
			enabled: true,
			initialSortBy: {field: 'quantity', type: 'desc'}
		},
		sortEmails:{
			enabled: true,
			initialSortBy: {field: 'sendDate', type: 'desc'}
		},
		buttonLoadingStageCodes: false,
		quantityStagesTotalWorkflowSetted: 0,
	}),
	computed: {
	},
	mounted () {
		setTimeout(() => {
			this.appMounted = true;
			console.log(this);
		}, 200);
		this.findAllMovies();
	},
	methods: {
		showDetails (object){
			this.showObjectDetails = object;
			this.dialogShowDetails = true;
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
		setColorBillingTimeFrame (color){
			return "color: " + color;
		},
		findAllMovies (){
			MovieService.findAll().then
			MovieService.findAll()
				.then(response => {
					console.log(response.data)
				})
				.catch(e => {
					var message = "Houve um erro inesperado.";
					if (e.response && e.response.status === 400) {
						message = e.response.data.message;
					}
				});
		}        
	}
}
</script>

