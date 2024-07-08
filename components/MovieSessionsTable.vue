<template>
	<ul>
		<li v-for="{ showdate, daytime } in sessions" :key="`${id}-${showdate}-${daytime}`" class="mb-5">
			<h4 class="mb-2">
				Date: {{ showdate }}
			</h4>
			<div class="d-flex">
				<h4 class="mr-2">Time:</h4>
				<ul class="time-item d-flex flex-wrap">
					<li v-for="time in stringToArray(daytime)" :key="`${id}-${time}`" class="mr-5 mb-1 bg-yellow font-weight-bold pa-1 rounded-lg" @click="bookTicket(time, showdate)">
						<v-tooltip text="Замовити квиток" location="bottom">
							<template v-slot:activator="{ props }">
								<span v-bind="props">{{ time }}</span>
							</template>
						</v-tooltip>						
					</li>
				</ul>
			</div>
		</li>
	</ul>
</template>

<script setup lang="ts">
	const props = defineProps({
		sessions: {
			type: Array,
			required: true,
		},
		id: {
			type: Number,
			required: true,
		},
	})

    const emit = defineEmits(['bookTicket'])

    const bookTicket = (daytime: string, showdate: string) => {
        emit('bookTicket', { daytime, showdate })
    }

	const stringToArray = (string: string): string[] => {
		return string.split(';')
	}
</script>

<style lang="scss" scoped>
	.time-item {
		li {
			cursor: pointer;
		}        
	}

	ul {
		list-style-type: none;
	}
</style>
