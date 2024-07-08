<template>
	<div>
		<v-toolbar density="compact" class="text-yellow">
			<v-toolbar-title>
				<NuxtLink to="/" class="text-capitalize font-weight-bold text-decoration-none text-yellow">Cinema</NuxtLink>
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn text>
				<NuxtLink to="/sessions" class="text-capitalize text-decoration-none text-yellow">Sessions</NuxtLink>
			</v-btn>
			<v-btn icon @click="searchDialog = true">
				<v-icon>mdi-magnify</v-icon>
			</v-btn>
		</v-toolbar>
		<v-container class="full-height">
			<NuxtPage />
		</v-container>
		<v-dialog v-model="searchDialog" width="auto" min-width="320">
			<SearchForm @close="searchDialog = false" />
		</v-dialog>
	</div>
</template>

<script setup lang="ts">
import SearchForm from '@/components/SearchForm.vue';

const searchDialog = ref<boolean>(false)
 
</script>

<style lang="scss" scoped>
	.v-toolbar {
		background-color: $dark-blue;
	}
</style>
