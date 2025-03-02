<template>
	<main>
		<NavBar />
		<div class="flex flex-col w-auto custom-container">
			<slot />
		</div>
	</main>
</template>

<script setup>
	import NavBar from '../navbar/NavBar.vue';
</script>

<style scoped>
	.custom-container {
		padding: 0;
	}

</style>