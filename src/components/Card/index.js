/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable arrow-body-style */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Card, Rate} from 'antd'
import Genres from '../Genres'
import { DataConsumer } from '../DataContext'
import './card.css'

export default class MyCard extends Component {

    componentDidMount() {
        this.checkRating(this.isRated(this.props.ratings))
    }
    
    shortenSynopsis = (text) => {
        const split = text.split(' ')
        let res = text
        if (split.length > 32) {
           res = `${split.slice(0, 32).join(' ')} ...`
        }
        return res
    }

    isRated = (arr = []) => {
        let rating
        arr.forEach((movie) => {
            if (movie.id === this.props.id) {
                rating = movie.rating
            }
        })
        return rating > 0 ? rating : 0
    }

    checkRating = (num) => {
        const card = document.getElementById(this.props.id)
        const cardRating = card.getElementsByClassName('card__rating')[0]
        const poor = 'card__rating--poor'
        const bad = 'card__rating--bad'
        const okay = 'card__rating--okay'
        const good = 'card__rating--good'
        const classes = [poor, bad, okay, good]

        const ratingChanger = (cl) => {
            cardRating.classList.remove(...classes)
            cardRating.classList.add(cl)
            cardRating.textContent = num
        }
        
        if (num === 0) cardRating.classList.remove(...classes)

        if (num > 0 && num <= 3) {
            ratingChanger(poor)
        }
        if (num > 3 && num <= 5) {
            ratingChanger(bad)
        }
        if (num > 5 && num <= 7) {
            ratingChanger(okay)
        }
        if (num > 7) {
            ratingChanger(good)
        }
    }
 
       
   render () {
    const {title, date, genres, synopsis, poster, rateMovie, ratings, id} = this.props
   return (<Card className="page__card" id={id}>
        <img className="card__img" src={`https://image.tmdb.org/t/p/original${poster}`} alt="Poster Here"/>
        <div className="card__content">
            <div className="card__meta">
                <div className="card__header">
                    <div>
                        <h2 className="card__title">{title}</h2>
                        <div className="card__date">{date}</div>
                    </div>
                    <div className='card__rating'>{this.isRated(ratings)}</div>
                </div>
                <div className="card__genres">
                    <DataConsumer>
                        {
                        (data) => {
                            return (
                                <Genres genres={genres} genresList={data}/>
                                );
                            }
                        }
                    </DataConsumer>
                </div>
                <p className="card__synopsis">{this.shortenSynopsis(synopsis)}</p>
            </div>
            <Rate 
                className="card__stars" 
                allowHalf count="10" 
                defaultValue={this.isRated(ratings)} 
                onChange={
                    (num) => {
                        rateMovie(num)
                        this.checkRating(num)
                        }
                    }
            />
        </div>
    </Card>)
   }
       
}

MyCard.propTypes = {
    title: PropTypes.string,
    date: PropTypes.string,
    genres: PropTypes.array,
    synopsis: PropTypes.string,
    poster: PropTypes.string,
    rateMovie: PropTypes.func,
    ratings: PropTypes.array,
    id: PropTypes.number
}

     