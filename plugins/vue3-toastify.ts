import Vue3Toastify, { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.use(Vue3Toastify, { theme: 'colored', autoClose: 5000, dangerouslyHTMLString: true})

	return {
		provide: { toast },
	}
})
