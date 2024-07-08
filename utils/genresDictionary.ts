import { Genres } from '@/enums/genres'

export const genresDictionary = Object.entries(Genres)
	.filter(([key, _]) => !isNaN(Number(key)))
	.map((i) => {
		return {
			id: +i[0],
			name: i[1],
		}
	})
