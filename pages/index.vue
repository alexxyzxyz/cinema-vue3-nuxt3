<template>
	<div>
		<v-row v-if="isLoading">
			<v-col v-for="loader in 8" :key="loader" cols="12" md="3" xl="2" sm="6" xs="1">
				<v-skeleton-loader class="mx-auto border" max-width="300" type="image, article"></v-skeleton-loader>
			</v-col>
		</v-row>

		<v-container v-else>
			<v-row>
				<v-col cols="12">
					<div v-for="(value, key) in route.query" :key="key" class="ma-2">
						<v-chip v-if="value" class="ma-2" color="white" closable @click:close="removeQueryParam(key)">
							<span v-if="key === 'genres'">
								<strong>{{ key }}</strong
								>:&nbsp;{{ parsedGenreName(value) }}
							</span>
							<span v-else>
								<strong>{{ key }}</strong
								>:&nbsp;{{ value }}
							</span>
						</v-chip>
					</div>
				</v-col>
			</v-row>
			<v-row v-if="!moviesStore.movies.length">
				<v-col>
					<h1 class="text-center text-h3 text-grey">No movies found</h1>
				</v-col>
			</v-row>
			<v-row no-gutters class="d-flex flex-wrap">
				<v-col v-for="movie in moviesStore.movies" :key="movie.id" cols="12" md="3" xl="2" sm="6" xs="1" class="d-flex">
					<MovieCard :movie="movie" @click="router.push(`/movies/${movie.id}`)" />
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script setup lang="ts">
	import { useRouter, useRoute } from 'vue-router'
	import { useMoviesStore } from '@/stores/movies'
	import MovieCard from '@/components/MovieCard' 
	import { genresDictionary } from '@/utils/genresDictionary'

	const chip = ref<boolean>(true)
	const isLoading = ref<boolean>(true)
	const router = useRouter()
	const route = useRoute()
	const moviesStore = useMoviesStore()
	

	const removeQueryParam = (removedKey: string) => {
		const newQueries = { ...route.query }
		newQueries[removedKey] = ''
		router.push({ path: '/', query: newQueries })
		isLoading.value = moviesStore.getLoadingState
	}

	const parsedGenreName = (genreIndex: string) => {
		const genresArray = genreIndex.split(',')

		return genresArray
			.map((i) => genresDictionary[+i].name )
			.join(', ')
	}

	onMounted(async () => {
		if (Object.keys(route.query).length !== 0) {
			await moviesStore.fetchMoviesWithQuery(route.query)
			isLoading.value = moviesStore.isLoading
		} else {
			await moviesStore.fetchMovies()
			isLoading.value = moviesStore.isLoading
		}
	})

	watch(
		() => route.query,
		async (newQuery) => {
			if (Object.keys(newQuery).length !== 0) {
				isLoading.value = true
				await moviesStore.fetchMoviesWithQuery(newQuery)
				isLoading.value = moviesStore.isLoading
			} else {
				isLoading.value = true
				await moviesStore.fetchMovies()
				isLoading.value = moviesStore.isLoading
			}
		},
		{ immediate: true }
	)

	
</script>
