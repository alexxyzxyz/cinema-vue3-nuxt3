import { defineStore } from 'pinia'

export const useSessionsStore = defineStore({
	id: 'sessions',
	state: () => ({
		isLoading: true,
		sessions: [],
		freePlaces: [],
		selectedMovieName: '',
	}),
	actions: {
		async fetchSessions() {
			try {
				const {
					data: {
						value: { data: sessionsList },
					},
					pending,
				} = await useFetch('/api/sessions')
				this.sessions = sessionsList
				this.isLoading = pending.value
			} catch (err) {
				console.error(err)
				this.isLoading = false
			}
		},
		fetchFreePlaces(movie_id: string, daytime: string, showdate: string) {
			this.isLoading = true
			const {
				public: { apiDomain },
			} = useRuntimeConfig()

			$fetch<string>(`${apiDomain}/showPlaces?movie_id=${movie_id}&daytime=${daytime}&showdate=${showdate}`)
				.then((res) => {
					this.freePlaces = JSON.parse(res).data
				})
				.catch((err) => {
					console.error(err)
				})
				.finally(() => {
					this.isLoading = false
				})
		},
		defineMovieName(name: string) {
			this.selectedMovieName = name
		},
		saveSeat(movie_id: number, row: number, seat: number, showdate: string, daytime: string) {
			this.isLoading = true
			const {
				public: { apiDomain },
			} = useRuntimeConfig()

			$fetch<string>(`${apiDomain}/bookPlace`, {
				method: 'POST',
				body: {
					movie_id,
					row,
					seat,
					showdate,
					daytime,
				},
			})
				.then((res) => {
					const bookedTicked = JSON.parse(res).data
					const template = `
					<div style="display: flex; flex-direction: column; margin: -50px 0;">
						<span><strong>${this.selectedMovieName}</strong></span>
						<span>Date: ${bookedTicked.showdate}</span>
						<span>Time: ${bookedTicked.daytime}</span>
						<span>Row: ${bookedTicked.row}, seat: ${bookedTicked.seat}</span>
						<span>Ticket key: ${bookedTicked.ticketkey}</span>
					</div>
					`
					useNuxtApp().$toast.success(template, { autoClose: false, style: {width: 400} })
				})
				.catch((err) => {
					useNuxtApp().$toast.error(err.statusText)
				})
				.finally(() => {
					this.isLoading = false
				})
		},
	},
})
