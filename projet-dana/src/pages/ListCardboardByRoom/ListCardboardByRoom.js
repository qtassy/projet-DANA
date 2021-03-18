import React from 'react';
import { Link } from 'react-router-dom';
import './ListCardboardByRoom.scss';
import NavMyCardboards from "../../components/Menu/NavMyCardboard";
import ImageCartonExemple from "../../img/carton.jpg";

class CardBoard extends React.Component{
    render(){
        return(
            <div className="col-xs-12 col-lg-6 mb-5">
                <div className="row">
                    <div className="col-2">
                        <img src={this.props.image} alt="carton" className="rounded"/>
                    </div>
                    <div className="col-2">
                        <div className="container-number rounded-circle">
                            <span className="number-card">{this.props.num}</span>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="text text-left">
                            <p className="mb-0 font-weight-bolder">{this.props.origine} &gt; {this.props.destination}</p>
                            <p className="mb-0">Dim: {this.props.dimension}</p>
                        </div>
                    </div>
                    <div className="col-2 ">
                        <Link to="#">
                            <div className="container-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square icon" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                </svg>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

class ListCardboard extends React.Component{
    render(){
        return(
            <>
                <NavMyCardboards link="/MakeMyCardboards/myCardBoards"/>
                <h1 className="font-weight-bolder text-center title mt-3 mb-3">CUISINE</h1>
                <div className="container">
                    <div className="cardboard mx-auto">
                        <div className="row image">
                            <CardBoard 
                                image={ImageCartonExemple} 
                                num={1}
                                origine="Cuisine"
                                destination="Cuisine"
                                dimension="50x50"
                            />
                            <CardBoard 
                                image={ImageCartonExemple} 
                                num={2}
                                origine="Cuisine"
                                destination="Cellier"
                                dimension="50x50"
                            />
                            <CardBoard 
                            image={ImageCartonExemple} 
                            num={3}
                            origine="Cuisine"
                            destination="Cuisine"
                            dimension="50x50"
                            />
                            <CardBoard 
                            image={ImageCartonExemple} 
                            num={4}
                            origine="Cuisine"
                            destination="Cuisine"
                            dimension="50x50"
                            />
                        </div>
                    </div>
                </div>
                <button className="btn btn-edit-card">Éditer mes étiquettes</button>
            </>
            
        )
    }
}

export default ListCardboard;