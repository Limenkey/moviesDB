/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-fragments */
import React from "react"
import PropTypes from "prop-types"
import {Pagination} from 'antd'
import MyCard from "../Card"
import './movies.css'



const Movies = ({ pages, page, ratings, switcher, ratedPages, movies, onPageChange, rateMovie}) => {

    const createCard = (movie) => (<MyCard title={movie.title}
        date={movie.release_date}
        genres={movie.genre_ids}
        synopsis={movie.overview}
        poster={movie.poster_path}
        id={movie.id}
        key={movie.id}
        rateMovie={(rating) => rateMovie(movie.id, rating)}
        ratings={ratings}
/>)
    const cards = movies.map((movie) => createCard(movie))
    const ratedCards = ratings.map((movie) => createCard(movie))
    const isRated = switcher === 'Rated'
    const switchPages = isRated ? ratedPages : pages
    const content = !isRated ? cards : ratedCards 
    return (
        <React.Fragment>
            {content}
            <Pagination className="pagination" hideOnSinglePage 
                                                current={page}
                                                defaultCurrent={1}   
                                                total={switchPages*10}  
                                                onChange={(num) => {
                                                                    onPageChange(num)
                                                                    }}
            />
        </React.Fragment> 
    )  
}

Movies.defaultProps = {
    pages: 1,
    page: 1,
    ratings: [],
    switcher: '',
    ratedPages: 1,
    movies: [],
    onPageChange: () => {},
    rateMovie: () => {}
}

Movies.propTypes = {
    pages: PropTypes.number,
    page: PropTypes.number,
    ratings: PropTypes.array,
    switcher: PropTypes.string,
    ratedPages: PropTypes.number,
    movies: PropTypes.array,
    onPageChange: PropTypes.func,
    rateMovie: PropTypes.func
}

export default Movies