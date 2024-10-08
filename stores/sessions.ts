import { defineStore } from 'pinia'
import type { Response } from '@/interfaces/response'
import type { Session } from '@/interfaces/session'
import type { Seat } from '@/interfaces/seat'
import type { Ticket } from '@/interfaces/ticket'

interface Sessions {
	[key: number]: Session[]
}

interface Row {
	row: number
}

type FreePlaces = [Row, Seat[]][]

export const useSessionsStore = defineStore({
	id: 'sessions',
	state: () => ({
		isLoading: true as boolean,
		sessions: {} as Sessions,
		freePlaces: [] as FreePlaces,
		selectedMovieName: '' as string,
	}),
	getters: {
		getLoadingState: (state) => state.isLoading,
	},
	actions: {
		async fetchSessions() {
			this.isLoading = true
			const {
				public: { apiDomain },
			} = useRuntimeConfig()

			await $fetch<string>(`${apiDomain}/movieShows`)
				.then((res) => {
					return JSON.parse(res)
				})
				.then((parsedResponse: Response<Sessions>) => {
					this.sessions = parsedResponse.data
				})
				.catch((err) => {
					console.log(err)
				})
				.finally(() => {
					this.isLoading = false
				})
		},
		async fetchSession(movieId: number) {
			this.isLoading = true
			const {
				public: { apiDomain },
			} = useRuntimeConfig()

			await $fetch<string>(`${apiDomain}/movieShows?movie_id=${movieId}`)
				.then((res) => {
					return JSON.parse(res)
				})
				.then((parsedResponse: Response<Sessions>) => {
					this.sessions = parsedResponse.data
				})
				.catch((err) => {
					console.log(err)
				})
				.finally(() => {
					this.isLoading = false
				})
		},

		async fetchFreePlaces(movie_id: string, daytime: string, showdate: string) {
			this.isLoading = true
			const {
				public: { apiDomain },
			} = useRuntimeConfig()

			await $fetch<string>(`${apiDomain}/showPlaces?movie_id=${movie_id}&daytime=${daytime}&showdate=${showdate}`)
				.then((res) => {
					return JSON.parse(res)
				})
				.then((parsedResponse: Response<FreePlaces>) => {
					this.freePlaces = parsedResponse.data
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
		async saveSeat(movie_id: number, row: number, seat: number, showdate: string, daytime: string) {
			this.isLoading = true
			const {
				public: { apiDomain },
			} = useRuntimeConfig()

			await $fetch<string>(`${apiDomain}/bookPlace`, {
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
					return JSON.parse(res)
				})
				.then((parsedResponse: Response<Ticket>) => {
					const bookedTicked: Ticket = parsedResponse.data
					const template = `
					<div style="display: flex; flex-direction: column; margin: -50px 0;">
						<span><strong>${this.selectedMovieName}</strong></span>
						<span>Date: ${bookedTicked.showdate}</span>
						<span>Time: ${bookedTicked.daytime}</span>
						<span>Row: ${bookedTicked.row}, seat: ${bookedTicked.seat}</span>
						<span>Ticket key: ${bookedTicked.ticketkey}</span>
					</div>
					`
					useNuxtApp().$toast.success(template, { autoClose: false, style: { width: 400 } })
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
