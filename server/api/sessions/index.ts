export default defineEventHandler(async () => {
    const {public: {apiDomain}} = useRuntimeConfig()
    const data: string = await $fetch(`${apiDomain}/movieShows`)

    return JSON.parse(data)
})