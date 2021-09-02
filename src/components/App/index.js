
/* eslint-disable id-length */
/* eslint-disable react/jsx-fragments */
/* eslint-disable react/destructuring-assignment */

import React, {Component} from "react";
import _ from "lodash"
import 'antd/dist/antd.css'
import {Input} from 'antd'
import PageContent from "../PageContent";
import MoviesdbService from "../../services/MoviesdbService";
import Navigation from "../Navigation";
import { DataProvider } from "../DataContext";
import './app.css'

export default class App extends Component {

    service = new MoviesdbService

    state = {
        ratedMovies: [],
        sessionId: localStorage.getItem('id'),
        expiration: localStorage.getItem('exp'),
        query: '',
        searched: false, 
        page: 1,
        pages: 0,
        movies: [],
        genres: [],
        loading: true,
        error: false,
        errorMessage: null,
        switcher: 'Search'
    }


    componentDidMount() {
        const {page, query} = this.state
        this.createNewSession()
        this.updateMovies(page, query)
        this.getRatedMovies()
        this.getGenresList()
    }

    

    onPageChange(num) {
        const {query, page} = this.state
        if (num !== page) this.updateMovies(num, query)
    }


    onLoaded = (data) => {
        this.setState({
            pages: data.total_pages,
            movies: data.results,
            loading: false,
            error: false,
            page: data.page
        }, () => this.state)
    }

    onError = (err) => {
        this.setState({
            loading: false,
            error: true,
            errorMessage: err.message    
        }, () => this.state)
    }



    onInput = (event) => {   
        this.search(event.target.value)
        this.updateMovies(1, this.state.query)
    }

    onLoadedRated = (data) => {
        this.setState({
            loading: true,
            error: false,
            ratedMovies: data.results,
            ratedPages: data.total_pages}, () => this.state)    
    }

    onSwitch(str) {
        this.getRatedMovies()
        this.setState({switcher: str}, () => this.state)    
    }

    getRatedMovies() {
        this.service.getRatedMovies()
                                    .then(this.onLoadedRated)
                                    .then((res) => {
                                        this.setState({loading: false})
                                        return res
                                    })
    }

    search = (str) => {
        if (str) {
            this.setState({
                query: str,
                movies: [],
                loading: true,
                searched: true
            },() => this.state)
        }    
    } 

    createNewSession = () => {
        const exp = new Date(localStorage.getItem('exp'))
        const now = new Date (Date.now())
        this.service
                    .createNewSession()
                    .then(data => {
                        if (now.getTime() > exp.getTime()) { 
                            this.setState({
                                sessionId: data.guest_session_id,
                                expiration: data.expires_at
                            }, () => this.state)
                            localStorage.setItem('id', this.state.sessionId)
                            localStorage.setItem('exp', this.state.expiration)
                        }   
                    })
    }

    updateMovies = (page, str) => {
        if (str) {
            this.service
                        .searchMovies(page, str)
                        .then(this.onLoaded)
                        .catch(this.onError)           
                    }             
    }

    getGenresList = () => {
        this.service.getGenres().then(data => this.setState({genres: data}))
    }

    rateMovie = (id, rating) => {
        this.service.rateMovie(id, rating)
                    .then(() => this.service.getRatedMovies())
    }

   render() {
       const {query, movies, pages, loading, error, errorMessage, page, ratedMovies, switcher, ratedPages, searched} = this.state
       const input = switcher !== 'Rated' ? <Input className="search-input" placeholder="Type to search..." onInput={_.debounce(this.onInput, 500)}/> : null
    return (
            <DataProvider value={this.state.genres}>
                <Navigation className="navigation" onSwitch={(str) => this.onSwitch(str)}/>
                {input}
                <PageContent className="pagecontent" query={query}
                                                     movies={movies}
                                                     pages={pages}
                                                     loading={loading}
                                                     error={error}
                                                     errMsg={errorMessage}
                                                     onPageChange={(num) => {
                                                        this.search(query)
                                                        this.updateMovies(num, query)
                                                     }}
                                                     page={page}
                                                     rateMovie={(id, num) => this.rateMovie(id, num)}
                                                     ratings={ratedMovies}
                                                     switcher={switcher}
                                                     ratedPages={ratedPages}
                                                     searched={searched}
                />
            </DataProvider>
        )
    }
}

