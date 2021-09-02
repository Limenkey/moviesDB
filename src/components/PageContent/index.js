/* eslint-disable react/forbid-prop-types */

import React from 'react'
import PropTypes from 'prop-types'
import { Spin, Alert } from 'antd'
import Movies from '../Movies'
import './pagecontent.css'


const PageContent = ({movies, pages, loading, error, page, errMsg, onPageChange, rateMovie, ratings, switcher, ratedPages, query, searched}) => { 

    const errorMsg = `Oops! Here is what's wrong: ${errMsg}`
    const success = !loading && !error
    const searching = loading
    const emptySearch = searched && !movies.length && switcher === 'Search' && success                                          
    const result =  <Movies movies={movies}
                            pages={pages}
                            ratedPages={ratedPages}
                            page={page}
                            onPageChange={onPageChange} 
                            rateMovie={(id, num) => rateMovie(id, num)} 
                            ratings={ratings}
                            switcher={switcher}
                            query={query}
                            />      
    const errorAlert = error ? <Alert type="error" message={errorMsg} /> : null 
    const warning = emptySearch ? <Alert type="warning" message="Sorry, we couldn't find anything" /> : null                                   
    const content = success ? result : null                                        
    const spinner = searching ? ( <div className="spinner">
                                      <Spin size="large"/>
                                  </div>  ) : null                                                               
    return (
            <div className="page__content">
                {content}
                {warning}
                {errorAlert}
                {spinner}
            </div>
            )
}

PageContent.defaultProps = {
    movies: [], 
    pages: 1, 
    loading: false, 
    error: false, 
    page: 1, 
    errMsg: '', 
    onPageChange: () => {}, 
    rateMovie: () => {}, 
    ratings: [], 
    switcher: '', 
    ratedPages: 1, 
    query: '', 
    searched: false
}

PageContent.propTypes = {
    movies: PropTypes.array, 
    pages: PropTypes.number, 
    loading: PropTypes.bool, 
    error: PropTypes.bool, 
    page: PropTypes.number, 
    errMsg: PropTypes.string, 
    onPageChange: PropTypes.func, 
    rateMovie: PropTypes.func, 
    ratings: PropTypes.array, 
    switcher: PropTypes.string, 
    ratedPages: PropTypes.number, 
    query: PropTypes.string, 
    searched: PropTypes.bool
}


export default PageContent    

