<template>
	<v-sheet class="pa-7">
		<h2 class="text-h4 mb-5">Параметри пошуку</h2>
		<v-form>
			<v-row>
				<v-col cols="12">
					<v-text-field v-model="name" type="text" label="Name" />
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="12">
					<v-select v-model="genres" :items="genresDictionary" multiple item-title="name" item-value="id" label="Genre" return-object single-line />
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="12" class="mt-2 d-flex justify-end">
					<v-btn class="mr-3" @click="close">Закрити</v-btn>
					<v-btn color="primary" @click="search">Пошук</v-btn>
				</v-col>
			</v-row>
		</v-form>
	</v-sheet>
</template>

<script setup lang="ts">
	import { computed } from 'vue'
	import { useRouter } from 'vue-router'
	import type { Genre } from '@/interfaces/genre'
	import { genresDictionary } from '@/utils/genresDictionary'
	
	const router = useRouter()

	const name = ref<string>('')
	const genres = ref<Genre[] | null>(null)
	const emit = defineEmits(['close'])

	const genresIds = computed(() => {
		if (genres.value && genres.value.length > 0) {
			return genres.value.map((i) => i.id).join(',')
		}
		return ''
	})

	const urlForSearch = computed(() => {
		return {
			path: '/',
			query: {
				name: name.value,
				genres: genresIds.value,
			},
		}
	})

	const close = () => {
		emit('close')
	}

	const search = () => {
		router.push(urlForSearch.value)
		close()
	}
</script>
