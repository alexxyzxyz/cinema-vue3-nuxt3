<template>
	<div class="movie">
		<v-row v-if="isLoadingSessions || isLoadingMovies">
			<v-col cols="12">
				<v-skeleton-loader class="mx-auto border" type="image, article"></v-skeleton-loader>
			</v-col>
		</v-row>

		<v-sheet v-else>
			<v-row no-gutters class="pa-5">
				<v-col cols="12" xxl="2" xl="2" lg="2" md="2" sm="4">
					<v-img class="movie-poster full-width" :src="moviesStore.movie.image" alt="poster" />
				</v-col>
				<v-col cols="12" xxl="10" xl="10" lg="10" md="10" sm="8">
					<v-row no-gutters>
						<v-col cols="12">
							<h1 class="text-h3 ma-5" v-html="moviesStore.movie.name" />
						</v-col>
						<v-col cols="12">
							<p class="movie-additional ma-5" v-html="moviesStore.movie.additional" />
						</v-col>
					</v-row>
				</v-col>
			</v-row>
			<v-row no-gutters>
				<v-col class="pa-5 pb-0">
					<h3 class="text-h5">Опис</h3>
				</v-col>
			</v-row>
			<v-row no-gutters>
				<v-col class="pa-5">
					<p v-html="moviesStore.movie.description" />
				</v-col>
			</v-row>
			<v-row no-gutters>
				<v-col class="pa-5 pb-0">
					<h3 class="text-h5">Розклад сеансів</h3>
				</v-col>
			</v-row>
			<v-row no-gutters>
				<v-col class="pa-5">
					<MovieSessionsTable :sessions="sessionsStore.sessions[+route.params.id]" :id="moviesStore.movie.id" @bookTicket="bookTicket" />
				</v-col>
			</v-row>
		</v-sheet>
		<v-dialog v-model="seatsDialog">
			 <v-sheet v-if="sessionsStore.isLoading" class="d-flex justify-center align-center" height="500" width="100%">
				<v-progress-circular color="primary" indeterminate />
			 </v-sheet>
			
			<SeatsTable v-else :seats="sessionsStore.freePlaces" :movie_id="moviesStore.movie.id" :showdate="showdate" :daytime="daytime" @close="seatsDialogclose" @bookPlace="bookPlace" />
		</v-dialog>
	</div>
</template>

<script setup lang="ts">
	import { useRoute } from 'vue-router'
	import { useSessionsStore } from '@/stores/sessions'
	import { useMoviesStore } from '@/stores/movies'
	import MovieSessionsTable from '@/components/MovieSessionsTable'
	import SeatsTable from '@/components/SeatsTable'
	import { mapMovieSessions } from '@/utils/mappingMovieSessions'
	import type { Movie } from '@/interfaces/movie'

	const route = useRoute()
	const isLoadingSessions = ref<boolean>(true)
	const isLoadingMovies = ref<boolean>(true)
	const seatsDialog = ref<boolean>(false)
	const showdate = ref<string>('')
	const daytime = ref<string>('')
	const sessionsStore = useSessionsStore()
	const moviesStore = useMoviesStore()

	onMounted(async () => {
		await moviesStore.fetchMovie(+route.params.id)
		await sessionsStore.fetchSession(+route.params.id)
		isLoadingSessions.value = sessionsStore.isLoading
		isLoadingMovies.value = moviesStore.isLoading
		sessionsStore.defineMovieName(moviesStore.movie.name)
	})

	const bookTicket = async ({ daytime: newDaytime, showdate: newShowdate }) => {
		await sessionsStore.fetchFreePlaces(moviesStore.movie.id, newDaytime, newShowdate)
		showdate.value = newShowdate
		daytime.value = newDaytime
		seatsDialog.value = true
	}

	const seatsDialogclose = () => {
		showdate.value = ''
		daytime.value = ''
		seatsDialog.value = false
	}

	const bookPlace = ({ row, seat, showdate, daytime }) => {
		sessionsStore.saveSeat(moviesStore.movie.id, row, seat, showdate, daytime)
	}

	
</script>

<style lang="scss">
	.movie {
		&-additional {
			ul {
				list-style: none;
				li {
					display: flex;

					.key {
						font-weight: bold;
						margin-right: 5px;
					}

					.val {
						display: flex;
						a {
							text-decoration: none;
							color: inherit;
						}
					}
				}
			}
		}

		.inactive {
			color: lightgray;
		}
	}
</style>
