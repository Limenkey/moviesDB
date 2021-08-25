/* eslint-disable react/jsx-fragments */
/* eslint-disable react/self-closing-comp */
// eslint-disable-next-line no-unused-vars
import React, {Component} from "react";
import {Input, Pagination} from 'antd'
import PageContent from "../PageContent";
import 'antd/dist/antd.css'
import './App.css'
import Navigation from "../Navigation";

export default class App extends Component {
    state = {
        something: null,
    }

    render() {
        const {something} = this.state
    return (
        <React.Fragment>
            <Navigation className="navigation"/>
            <Input className="search-input" placeholder="Type to search..."/>
            <PageContent className="pagecontent" it={something}/>
            <Pagination className="pagination" defaultCurrent={1} total={50} />
        </React.Fragment>
    )
    }
}



