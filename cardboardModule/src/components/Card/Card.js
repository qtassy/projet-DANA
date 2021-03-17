import React from 'react';
import './Card.scss';

import { IoIosArrowForward } from "react-icons/io";
import { Link } from 'react-router-dom';

class Card extends React.Component{
    render(){
        return(
            <div className="col-xs-12 col-sm-6 col-md-4 mb-5">
                <Link to={this.props.link} className="text-decoration-none">
                    <div className="card h-100 text-center">
                        <div className="card-body home-card">
                            <div className="round-home">
                                <IoIosArrowForward className="arrow-home"/>
                            </div>
                            <img src={this.props.icon} alt="icon"/>
                            <h5 className="card-title font-weight-bold text-light">{this.props.title_card}</h5>
                            <p className="card-text text-light">{this.props.text_card}</p>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }
}

export default Card;