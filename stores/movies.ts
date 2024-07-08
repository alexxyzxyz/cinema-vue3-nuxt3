import { defineStore } from 'pinia'
import type { Movie } from '@/interfaces/movie'
import type { SearchQuery } from '@/interfaces/searchQuery'

export const useMoviesStore = defineStore({
	id: 'movies',
	state: () => ({
		movies: [],
    movie: {},
		isLoading: true,
	}),
	getters: {
		getMovieById: (state) => {
			return (movieId: number) => state.movies.find((movie: Movie) => movie.id === movieId)
		},
    getLoadingState: (state) => state.isLoading
	},
	actions: {
		async fetchMovies() {
      this.isLoading = true
			const {
				public: { apiDomain },
			} = useRuntimeConfig()

			await $fetch<string>(`${apiDomain}/movies`)
				.then((res) => {
					this.movies = JSON.parse(res).data
				})
				.catch((err) => {
					this.movies = []
				})
				.finally(() => {
					this.isLoading = false
				})
		},
    async fetchMovie(id: number) {
      this.isLoading = true
			const {
				public: { apiDomain },
			} = useRuntimeConfig()

			await $fetch<string>(`${apiDomain}/movies?movie_id=${id}`)
				.then((res) => {
					this.movie = JSON.parse(res).data[0]
				})
				.catch((err) => {
					this.movies = []
				})
				.finally(() => {
					this.isLoading = false
				})
		},
		async fetchMoviesWithQuery(query: SearchQuery) {
			const { name, genres } = query
			this.isLoading = true
			const {
				public: { apiDomain },
			} = useRuntimeConfig()

			await $fetch<string>(`${apiDomain}/movies?name=${name}&genres=${genres}`)
				.then((res) => {
					this.movies = JSON.parse(res).data
				})
				.catch((err) => {
					this.movies = []
				})
				.finally(() => {
					this.isLoading = false
				})
		},
	},
})
