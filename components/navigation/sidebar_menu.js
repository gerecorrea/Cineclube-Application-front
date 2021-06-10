import { scHelpers } from "~/assets/js/utils";
const { uniqueID } = scHelpers;

export const menuEntries = [
	{
		id: uniqueID(),
		title: "Ações rápidas",
		page: "/pages",
		icon: "mdi mdi-view-grid",
		isOpen: false,
		level: 0,
		submenu: [
			{
				id: uniqueID(),
				title: "Cadastrar documento",
				page: "/userpages/bill/manual"
			},
			{
				id: uniqueID(),
				title: "Cadastrar devedor",
				page: "/userpages/debtors/manual/"
			},
			{
				id: uniqueID(),
				title: "Gerar agenda",
				page: "/applications/scheduler"
			},
			{
				id: uniqueID(),
				title: "Listar agenda de cobrança",
				page: "/actions/schedulers/list"
			},
		]
	},
	{
		section_title: "Menu"
	},
	{
		id: uniqueID(),
		title: "Dashboard",
		icon: "mdi mdi-chart-line",
		page: "/applications/dashboard"
	},
	{
		id: uniqueID(),
		title: "Lembretes",
		icon: "mdi mdi-timer",
		page: "/applications/notes"
	},
	{
		id: uniqueID(),
		title: "Base",
		page: "/pages",
		icon: "mdi mdi-database",
		isOpen: false,
		level: 0,
		submenu: [
			{
				id: uniqueID(),
				title: "Credores",
				page: "/userpages/creditors/all"
			},
			{
				id: uniqueID(),
				title: "Devedores",
				page: "/userpages/debtors/home"
			},
			{
				id: uniqueID(),
				title: "Documentos",
				page: "/userpages/bill/home"
			},
		]
	},
	{
		id: uniqueID(),
		title: "Cadastros",
		page: "/pages",
		icon: "mdi mdi-account-multiple-plus",
		isOpen: false,
		level: 0,
		submenu: [
			{
				id: uniqueID(),
				title: "Portadores",
				page: "/userpages/carriers/home",
			},
			{
				id: uniqueID(),
				title: "Usuários",
				page: "/userpages/users/manual/all"
			},
			
		]
	},
	{
		id: uniqueID(),
		title: "Configurações",
		page: "/pages",
		icon: "mdi mdi-settings",
		isOpen: false,
		level: 0,
		submenu: [
			{
				id: uniqueID(),
				title: "Agendamento",
				page: "/userpages/schedulerQuartz/all",
			},
			{
				id: uniqueID(),
				title: "Contratos de Cobrança",
				page: "/userpages/billConfigs/all",
			},
			{
				id: uniqueID(),
				title: "Status de Cobrança",
				page: "/userpages/statusCob/all"
			},
			{
				id: uniqueID(),
				title: "Templates",
				page: "/userpages/templates/home",
			},
		]
	},
	{
		id: uniqueID(),
		icon: "mdi mdi-view-column",
		title: "Régua de cobrança",
		page: "/userpages/billingWorkflows/all"
	},
	{
		id: uniqueID(),
		icon: "mdi mdi-calendar-clock",
		title: "Agenda de cobrança",
		page: "/actions/schedulers/list"
	},
	{
		id: uniqueID(),
		title: "Ações",
		page: "/pages",
		icon: "mdi mdi-arrow-right-drop-circle-outline",
		isOpen: false,
		level: 0,
		submenu: [
			{
				id: uniqueID(),
				title: "Gerar Agenda",
				page: "/applications/scheduler"
			},
			{
				id: uniqueID(),
				title: "Gerar ações automatizadas",
				page: "/actions/schedulers/automatedScheduler"
			},
		]
	},
];
