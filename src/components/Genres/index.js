/* eslint-disable react/forbid-prop-types */
/* eslint-disable array-callback-return */

import React from "react"
import PropTypes from "prop-types"
import { Card } from "antd"
import './genres.css'


const Genres = ({genres, genresList}) => {
    const names = []

    genres.map((genre) => {
        genresList.genres.forEach((item) => {
            if (genre === item.id) names.push(item.name)
        })
    })


    return genres.map((genre, index) => <Card className="card__genres-btn" key={genre}>{names[index]}</Card>)

}

Genres.defaultProps = {
    genres: [],
    genresList: []
}

Genres.propTypes = {
    genres: PropTypes.array,
    genresList: PropTypes.array
}

export default Genres