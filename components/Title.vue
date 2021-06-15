<template>
	<div class="uk-flex-1">
		<h1 class="uk-text-center uk-flex-1" style="font-size:30px;padding-top:20px;font-weight: 400; color:#00737f">
			{{ title }}
		</h1>
	</div>
</template>

<script>

export default {
	props: {
		title: {
			type: String,
			default: ''
		}
	},
	data: () => ({
	}),
	mounted () {
	},
	methods: {
	}
}
</script>
<style lang="scss">
</style>
