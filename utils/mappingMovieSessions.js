export function mapAllMovieSessions(movies, sessions) {
    return movies.map(({ id, name, image }) => {
        const sessionDates = sessions[id].map(({ showdate, daytime }) => {
            return {
                showdate,
                daytime: daytime.split(';'),
            }
        })

        return {
            id,
            name,
            image,
            sessionsList: sessionDates,
        }
    })
}

export function mapMovieSessions(id, sessions) {
    return  sessions[id].map(({ showdate, daytime }) => {
        return {
            showdate,
            daytime: daytime.split(';'),
        }
    })
}