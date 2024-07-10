import { defineStore } from 'pinia'
import type { Movie } from '@/interfaces/movie'
import type { SearchQuery } from '@/interfaces/searchQuery'
import type { Response } from '@/interfaces/response'

export const useMoviesStore = defineStore({
	id: 'movies',
	state: () => ({
		movies: [] as Movie[],
    movie: {} as Movie,
		isLoading: true as boolean,
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
					return JSON.parse(res)
				})
        .then((parsedResponse: Response) => {
          this.movies = parsedResponse.data
        })
				.catch((err) => {
          console.error(err)
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
					return JSON.parse(res)
				})
        .then((parsedResponse: Response) => {
          this.movie = parsedResponse.data[0]
        })
				.catch((err) => {
          console.error(err)
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
					return JSON.parse(res)
				})
        .then((parsedResponse: Response) => {
          this.movies = parsedResponse.data
        })
				.catch((err) => {
          console.error(err)
					this.movies = []
				})
				.finally(() => {
					this.isLoading = false
				})
		},
	},
})
