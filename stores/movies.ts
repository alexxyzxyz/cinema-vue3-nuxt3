import { defineStore } from 'pinia';

export const useMoviesStore = defineStore({
  id: 'movies',
  state: () => ({
    movies: [],
    isLoading: true,
  }),
  getters: {
    getMovieById: (state) => {
      return (movieId: number) => state.movies.find((movie: any) => movie.id === movieId)
    },
  },
  actions: {
    async fetchMovies() {
        try {
            const { data: { value: { data: moviesList }}, pending } = await useFetch('/api/movies')
            this.movies = moviesList
            this.isLoading = pending.value
        } catch (err) {
            console.error(err)
            this.isLoading = false
        }
        
    },
    fetchMoviesWithQuery(query) {
      const { name, genres } = query
      this.isLoading = true
      const {
				public: { apiDomain },
			} = useRuntimeConfig()

      $fetch<string>(`${apiDomain}/movies?name=${name}&genres=${genres}`)
        .then((res) => {
          this.movies = JSON.parse(res).data
        })
        .catch((err) => {
          this.movies = []
					useNuxtApp().$toast.error(err.statusText)
				})
				.finally(() => {
					this.isLoading = false
				})
    }
  },
});