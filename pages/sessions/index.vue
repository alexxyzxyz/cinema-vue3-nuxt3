<template>
	<div>
		<v-row v-if="isLoadingSessions || isLoadingMovies">
			<v-col cols="12">
				<v-skeleton-loader class="mx-auto border" type="image, article"></v-skeleton-loader>
			</v-col>
		</v-row>
		<v-row v-else no-gutters>
			<v-col v-for="{ id, name, image, sessionsList } in sessions" :key="id" cols="12">
				<v-card class="session-card ma-2 pa-2 full-width" variant="elevated" color="blue-grey-darken-4">
					<v-card-title class="session-card__header d-flex">
						<v-img class="session-card__header__image mb-2" max-width="65px" :src="image" alt="poster" />
						<v-tooltip :text="name" location="bottom">
							<template v-slot:activator="{ props }">
								<h3 class="session-card__header__title text-h5 ml-5" v-bind="props" v-html="name" />
							</template>
						</v-tooltip>
					</v-card-title>
					<v-card-text>
						<MovieSessionsTable :sessions="sessionsList" :id="id" />
					</v-card-text>
					<v-card-actions class="d-flex justify-center">
						<nuxt-link :to="`/movies/${id}`">
							<v-btn color="yellow">Details</v-btn>
						</nuxt-link>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script setup>
	import { useRouter } from 'vue-router'
	import { useSessionsStore } from '@/stores/sessions'
	import { useMoviesStore } from '@/stores/movies'
	import MovieSessionsTable from '@/components/MovieSessionsTable'
	import { mapAllMovieSessions } from '@/utils/mappingMovieSessions'

	const isLoadingSessions = ref(true)
	const isLoadingMovies = ref(true)
	const sessions = reactive([])
	const router = useRouter()
	const sessionsStore = useSessionsStore()
	const moviesStore = useMoviesStore()
	await sessionsStore.fetchSessions()

	if (!moviesStore.movies.length) {
		await moviesStore.fetchMovies()
	}

	onMounted(async () => {
		isLoadingSessions.value = sessionsStore.isLoading
		isLoadingMovies.value = moviesStore.isLoading

		const sessionsMaped = mapAllMovieSessions(moviesStore.movies, sessionsStore.sessions)

		sessions.push(...sessionsMaped)
	})
</script>

<style lang="scss">
	.session-card {
		ul {
			list-style: none;
		}

		&__header {
			&__title {
				font-weight: bold;
			}
		}
	}
</style>
