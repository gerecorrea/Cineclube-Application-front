const mode = 'spa';
const serveFromSubFolder = false;

let backendHost = '';
const applicationProfile = process.env.NODE_ENV;

switch (applicationProfile) {
case 'development':
	backendHost = "http://localhost:8081/";
	break;
}

const pkg = require('./package');
const path = require('path');

let dist = '';
if(mode === 'universal') {
	dist = 'scutum-universal'
} else {
	dist = 'scutum-spa'
}

module.exports = {
	mode: 'universal',
	/*
	** Headers of the page
	*/
	head: {
		htmlAttrs: {
			lang: 'en'
		},
		title: 'CineClube App',
		meta: [
			{ charset: 'utf-8' },
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1'
			},
			{
				hid: 'description',
				name: 'description',
				content: pkg.description
			}
		],
		script: [
			{ src: (process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' : '/' + dist ) + '/vendor/uikit.min.js'}
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: (process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' :  '/' + dist ) + '/logoCine.png'},
			{ rel: 'preload', href: (process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' : '/' + dist) + '/vendor/uikit.min.js', as: 'script' },
			{ rel: 'preload', href: (process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' : '/' + dist) + '/fonts/roboto_base64.css', as: 'style' },
			{ rel: 'preload', href: (process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' : '/' + dist) + '/fonts/sourceCodePro_base64.css', as: 'style' },
			{ rel: 'preload', href: (process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' : '/' + dist) + '/fonts/mdi/css/materialdesignicons.css', as: 'style' },
			{ rel: 'stylesheet', href: (process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' : '/' + dist) + '/fonts/roboto_base64.css' },
			{ rel: 'stylesheet', href: (process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' : '/' + dist) + '/fonts/sourceCodePro_base64.css' },
			{ rel: 'stylesheet', href: (process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '' : '/' + dist) + '/fonts/mdi/css/materialdesignicons.css' }
		]
	},
	/*
	** Customize the progress-bar
	*/
	loading: {
		color: 'rgba(0,0,0,.8)'
	},
	/*
	** Customize the loading-indicator
	** only in spa mode
	*/
	loadingIndicator: {
		color: '#000000',
		background: 'white'
	},
	/*
	** Global CSS
	*/
	css: [
		'uikit/dist/css/uikit.css'
	],
	/*
	** Plugins to load before mounting the App
	*/
	plugins: [
		'~/plugins/axios',
		'~/plugins/Cineclube_services',
		{ src: '~/plugins/components.global.js' },
		{ src: '~/plugins/directives.client.js' },
		{ src: '~/plugins/filters.js' },
		{ src: '~/plugins/mixins.client.js' },
		{ src: '~/plugins/vueVisible.client.js' },
		{ src: '~/plugins/vue-lazyload', ssr: false }
	],
	modules: [
		'vue-currency-input/nuxt',
		"nuxt-clipboard2",
		'@nuxtjs/axios',
		'@nuxtjs/google-analytics',
		[
			'nuxt-i18n', {
				defaultLocale: 'en',
				locales: [
					{
						code: 'en',
						file: 'en-US.js',
						name: 'English'
					},
					{
						code: 'es',
						file: 'es-ES.js',
						name: 'Español'
					},
					{
						code: 'fr',
						file: 'fr-FR.js',
						name: 'Français'
					}
				],
				lazy: true,
				langDir: 'lang/',
				strategy: 'no_prefix',
				vueI18n: {
					fallbackLocale: 'en'
				},
				vuex: {
					syncLocale: true
				}
			}
		]
		// '@nuxtjs/webpack-profile'
	],
	router: {
		middleware: ['redirect'],
		// base: process.env.NODE_ENV !== 'production' || !serveFromSubFolder ? '/' : '/' + dist
	},
	vuetify: {},
	axios: {
		baseURL: backendHost,
	},
	googleAnalytics: {
		id: (mode === 'universal') ? 'UA-136690566-3' : 'UA-136690566-4',
		dev: process.env.NODE_ENV !== 'production'
	},

	generate: {
		dir: dist,
		// dynamic routes
		routes: [
		]
	},
	/*
	** Build configuration
	*/
	buildModules: [
		// https://go.nuxtjs.dev/vuetify
		'@nuxtjs/vuetify',
	  ],
	build: {
		// analyze: true,
		progress: true,
		babel: {
			plugins: [
				"@babel/plugin-syntax-dynamic-import",
				"@babel/plugin-transform-spread"
			],
			ignore: [
				"node_modules",
				"assets/js/vendor"
			],
		},
		extend (config, ctx) {
			if (ctx.isDev && ctx.isClient) {
				config.module.rules.push(
					// Run ESLint on save
					{
						enforce: 'pre',
						test: /\.(js|vue)$/,
						loader: 'eslint-loader',
						exclude: /(node_modules)/,
						options : {
							fix : true
						}
					}
				);
			}
			// aliases
			config.resolve.alias['scss'] = path.resolve(__dirname, './assets/scss');
			// adjust path when serving app from sub-folder
			if (!ctx.isDev && serveFromSubFolder) {
				config.output.publicPath = '/' + dist + '/_nuxt/';
			}
			return config;
		}
	}

};
