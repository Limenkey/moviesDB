/* eslint-disable no-return-await */


export default class MoviesdbService {
    apiKey = process.env.REACT_APP_API_KEY
    
    async searchMovies(page, str) {
        const data = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${str}&total_results=6&page=${page}`)
        return await data.json()
    }
    
    async createNewToken() {
        const token = await fetch(`https://api.themoviedb.org/3/authentication/token/new?api_key=${this.apiKey}`)
        return await token.json()
    }

    async createNewSession() {
        const session = await fetch(`https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${this.apiKey}`)
        return await session.json()    
    }

    async rateMovie(id, num) {
        const rating = await fetch(`https://api.themoviedb.org/3/movie/${id}/rating?api_key=${this.apiKey}&guest_session_id=${localStorage.getItem('id')}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
              },
            body: JSON.stringify({
                value: num
            })
        }
        )
        return await rating.json()
    }

    async getRatedMovies() {
        const ratedMovies = await fetch(`
        https://api.themoviedb.org/3/guest_session/${localStorage.getItem('id')}/rated/movies?api_key=${this.apiKey}&language=en-US&sort_by=created_at.asc`)
        return await ratedMovies.json()
    }

    async getGenres() {
        const genres = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}&language=en-US`)
        return await genres.json()
    }
}
