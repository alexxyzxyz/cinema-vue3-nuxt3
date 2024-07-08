<template>
	<v-card class="seats">
		<v-card-title><h2 class="text-h4">Обери місце</h2></v-card-title>
		<v-card-text class="seats__scroll-container">
			<ul class="seats__scroll-container__row">
				<li v-for="row in seats" :key="row[0].row" class="mb-2">
					<h3 class="text-h6">Ряд: {{ row[0].row }}</h3>
					<ul class="seats__scroll-container__place d-flex">
						<li v-for="{ seat, is_free } in row[1]" :key="seat" :class="{ inactive: !is_free }" class="mr-3 mb-1 bg-blue-darken-1 font-weight-bold d-flex justify-center align-center" @click="bookPlace(row[0].row, seat, showdate, daytime, movie_id)">
							{{ seat }}
						</li>
					</ul>
				</li>
			</ul>
		</v-card-text>
		<v-card-actions class="mt-3">
			<v-btn class="ms-auto" size="lg" @click="close">Закрити</v-btn>
        </v-card-actions>
	</v-card>
</template>

<script setup>
	const props = defineProps({
		seats: {
			type: Array,
			required: true,
		},
		movie_id: {
			type: Number,
			required: true
		},
		showdate: {
			type: String,
			required: true
		},
		daytime: {
			type: String,
			required: true
		},
	})

	const emit = defineEmits(['close', 'bookPlace'])

	const close = () => emit('close')
    const bookPlace = (row, seat, showdate, daytime, movie_id) => {
        emit('bookPlace', { row, seat, showdate, daytime, movie_id})
    }
</script>

<style lang="scss" scoped>
	.seats {
		&__scroll-container {
			overflow-x: auto;
			white-space: nowrap;

			&__row,
			&__place {
				list-style: none;
			}

			&__row {
				li {
                    border-bottom: 1px solid lightgrey;
				}
			}

            &__place {
                display: flex;
                flex-wrap: wrap;
                li {
                    min-width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    cursor: pointer;
                }
            }
		}
	}
</style>
