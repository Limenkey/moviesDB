/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-fragments */
import React from "react"
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


export default Movies