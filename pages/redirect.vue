<template>
	<div class="mdi mdi-48px mdi-spin">
	</div>
</template>

<script>

export default {
	mounted () {
		this.redirectPage("/dashboard");
	},
	methods: {
		redirectPage (page) {
			this.$router.push({ path: page });
		},
	},
}
</script>
