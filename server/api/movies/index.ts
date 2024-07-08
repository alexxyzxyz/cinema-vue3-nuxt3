export default defineEventHandler(async () => {
    const {public: {apiDomain}} = useRuntimeConfig()
    const data: string = await $fetch(`${apiDomain}/movies`)

    return JSON.parse(data)
})