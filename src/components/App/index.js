/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */

/* eslint-disable id-length */
/* eslint-disable react/jsx-fragments */
/* eslint-disable react/destructuring-assignment */

import React, {Component} from "react";
import _ from "lodash"
import 'antd/dist/antd.css'
import {Input} from 'antd'
import PageContent from "../PageContent";
import service from "../../services/MoviesdbService";
import Navigation from "../Navigation";
import { DataProvider } from "../DataContext";
import './app.css'


const debouncedSearch = _.debounce((str, cb) => cb(str), 1000)
const expiresAt = 'expiresAt'
const sessionID = 'sessionID'

export default class App extends Component {


    state = {
        ratedMovies: [],
        sessionId: localStorage.getItem(expiresAt),
        expiration: localStorage.getItem(sessionID),
        query: '',
        searched: false, 
        page: 1,
        pages: 0,
        movies: [],
        genres: [],
        loading: false,
        error: false,
        errorMessage: null,
        switcher: 'Search'
    }

    componentDidMount() {
        const {page, query} = this.state
        this.createNewSession()
        this.updateMovies(page, query)
        this.getGenresList()
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.query !== this.state.query) {
            debouncedSearch(this.state.query, this.onInput)
        }
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



    onInput = (str) => {   
        this.search(str)
        this.updateMovies(1, str) 
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
        this.setState({
                        switcher: str,
                        loading: true
                    }, () => this.state)    
    }

    getRatedMovies() {
        service
            .getRatedMovies()
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
        
        service
            .createNewSession()
            .then(data => {
                if (now.getTime() > exp.getTime()) { 
                    this.setState({
                        sessionId: data.guest_session_id,
                        expiration: data.expires_at
                    }, () => this.state)
                    localStorage.setItem(sessionID, this.state.sessionId)
                    localStorage.setItem(expiresAt, this.state.expiration)
                }   
            })
    }

    updateMovies = (page, str) => {
        if (str) {
            service
                .searchMovies(page, str)
                .then(this.onLoaded)
                .catch(this.onError)           
                    }             
    }

    getGenresList = () => {
        service
            .getGenres()
            .then(data => this.setState({genres: data}))
    }

    rateMovie = (id, rating) => {
        if (rating > 0) { 
            service
                .rateMovie(id, rating)
                .then(() => service.getRatedMovies())
        }
        if (rating === 0) {
            const updatedRatedMovies = this.state.ratedMovies.filter(el => el.id !== id)
            this.setState((state, props)=> ({ratedMovies: updatedRatedMovies}))
            service.deleteRatedMovie(id)                                
        }   
    }

    

   render() {
       const {query, movies, pages, loading, error, errorMessage, page, ratedMovies, switcher, ratedPages, searched} = this.state
       const rated = 'Rated'
       const input = switcher !== rated && <Input 
                                                className="search-input" 
                                                placeholder="Type to search..." 
                                                onChange={e => this.setState({query: e.target.value})}
                                                value={query}
                                            />
    return (
            <DataProvider value={this.state.genres}>
                <Navigation 
                    className="navigation" 
                    onSwitch={(str) => this.onSwitch(str)}
                />
                {input}
                <PageContent
                    className="pagecontent" 
                    query={query}
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

