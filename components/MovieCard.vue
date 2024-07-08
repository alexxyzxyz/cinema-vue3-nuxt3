<template>
	<v-card class="movie-card ma-2 pa-2 full-width" variant="elevated" color="blue-grey-darken-4">
		<v-card-title class="movie-card__header">
			<v-img class="movie-card__header__image full-width mb-2" :src="movie.image" alt="poster" />
			<v-tooltip :text="movie.name" location="bottom">
				<template v-slot:activator="{ props }">
					<h3 class="movie-card__header__title text-h6" v-bind="props" v-html="movie.name" />
				</template>
			</v-tooltip>
		</v-card-title>
        
	</v-card>
</template>

<script setup>

    const props = defineProps({
        movie: {
            type: Object,
            required: true
        }
    })

</script>

<style lang="scss" scoped>
	@import '@/assets/styles/mixins.scss';

	.movie-card {
		cursor: pointer;

		&__header {
			&__title {
				@include truncate-rows(2);
				font-weight: 200;
				white-space: normal;
			}
		}
	}
</style>
