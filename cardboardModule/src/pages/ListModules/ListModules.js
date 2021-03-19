import React from "react";
import { Link } from "react-router-dom";
import "./ListModules.scss";
import { TiInfoLarge } from "react-icons/ti";
import { IoIosArrowForward } from "react-icons/io";
import { MdChevronLeft } from "react-icons/md";

class Jumbotron extends React.Component{
    render(){
        return(
            <div className="jumbotron jumbotron-fluid jumbotron-modules">
                <div className="container">
                    <h1 className="display-4 font-weight-normal text-light jumbotron-text">
                        <Link to="/">
                            <MdChevronLeft className="back" />
                        </Link>
                        {this.props.title}
                    </h1>
                </div>
            </div>
        )
    }
}

class Module extends React.Component{
    render(){
        return(
            <div className="col-xs-12 col-md-6">
                <Link to={this.props.link} className="link-module">
                    <div className="card card-module mb-5">
                        <div className="row">
                            <div className="col-4">
                                <div className="round-info">
                                    <TiInfoLarge className="icon-info"/>
                                </div>
                            </div>
                            <div className="col-8">
                                <div className="card-body">
                                    <p className="card-text mb-0">{this.props.text}</p>
                                        <div className="round-module">
                                            <IoIosArrowForward className="arrow-module"/>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }
}

class MakeMyCardboards extends React.Component{
    render(){
        return(
            <>
                <Jumbotron title="Faire ses cartons"/>
                <div className="container">
                    <div className="row">
                        <Module text="Préparer ses cartons" link="/MakeMyCardboards/myCardBoards" />
                        <Module text="Acheter un pack de déménagement" link="#" />
                        <Module text="Louer un pack de déménagement" link="#" />
                    </div>
                </div>
            </>
        )
    }
}

class Transport extends React.Component{
    render(){
        return(
            <>
                <Jumbotron title="Le transport"/>
                <div className="container">
                    <div className="row">
                        <Module text="Estimer le volume grâce à notre comparateur" link="#" />
                    </div>
                </div>
            </>
        )
    }
}

export{
    MakeMyCardboards,
    Transport
}