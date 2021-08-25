import React from 'react'
import {Card, Button} from 'antd'
import img from './Rectangle36.png'

const MyCard = () => (
        <Card className="page__card">
            <img className="card__img" src={img} alt="avatar"/>
            <div className="card__content">
                <h2 className="card__title">The way back</h2>
                <div className="card__date">March 5, 2020</div>
                <div className="card__genres">
                    <Button className="card__genres-btn">Action</Button>
                    <Button className="card__genres-btn">Drama</Button>
                </div>
                <p className="card__synopsis"> A former basketball all-star,
                    who has lost his wife and family foundation in a struggle with addiction
                    attempts to regain his soul and salvation by becoming the coach of
                    a disparate ethnically mixed high ...</p>
            </div>
        </Card>
)

export default MyCard        