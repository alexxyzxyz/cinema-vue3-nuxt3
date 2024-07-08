<template>
	<v-container class="full-height">
		<v-sheet class="pa-8">
			<v-row>
				<v-col class="text-center text-h3"> Hold your horses! </v-col>
			</v-row>
			<v-row>
				<v-col class="text-center text-h2">
					{{ error.statusCode }}
				</v-col>
			</v-row>
			<v-row>
				<v-col class="text-center">
					<h1 class="text-h3">
						{{ error.message }}
					</h1>
				</v-col>
			</v-row>
			<v-row>
				<v-col class="text-center">
					<v-btn @click="handleClearError"> Home </v-btn>
				</v-col>
			</v-row>
		</v-sheet>
	</v-container>
</template>

<script setup>
	defineProps(['error'])

	const handleClearError = () => {
		clearError({ redirect: '/' })
	}
</script>

<style scoped></style>
