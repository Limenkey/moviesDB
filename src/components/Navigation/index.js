/* eslint-disable id-length */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import PropTypes from "prop-types"
import './navigation.css'


const Navigation = ({onSwitch}) => {
    
    const toggleClass = (e) => {
        const activeClass = 'switch--active'
        const elms = document.getElementsByClassName(activeClass)
        elms[0].classList.remove(activeClass)
        e.target.classList.add(activeClass)
        return onSwitch(e.target.textContent)
    }
    
    return (
        <nav className="navigation">
            <span className="switch switch--active" onClick={(e) => toggleClass(e)}>Search</span>
            <span className="switch" onClick={(e) => toggleClass(e)}>Rated</span>
        </nav>
    )
}


Navigation.defaultProps = {
    onSwitch: () => {}
}

Navigation.propTypes = {
    onSwitch: PropTypes.func
}

   


export default Navigation