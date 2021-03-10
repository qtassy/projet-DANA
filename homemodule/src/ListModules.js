import React from "react";

import { TiInfoLarge } from "react-icons/ti";
import { IoIosArrowForward } from "react-icons/io";

class Jumbotron extends React.Component{
    render(){
        return(
            <div className="jumbotron jumbotron-fluid jumbotron-modules">
                <div className="container">
                    <h1 className="display-4 font-weight-normal text-light jumbotron-text">{this.props.title}</h1>
                </div>
            </div>
        )
    }
}

class Module extends React.Component{
    render(){
        return(
            <div className="col-xs-12 col-md-6">
                <div className="card card-module mb-5">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="round-info">
                                <TiInfoLarge className="icon-info"/>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="card-body">
                                <p className="card-text mb-0">{this.props.text}</p>
                                <a href={this.props.link} className="link-round">
                                    <div className="round-module">
                                        <IoIosArrowForward className="arrow-module"/>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class PrepareCardboard extends React.Component{
    render(){
        return(
            <>
                <Jumbotron title="Faire ses cartons"/>
                <div className="container">
                    <div className="row">
                        <Module text="Préparer ses cartons" link="#" />
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
                        <Module text="Estimer le volume grâce à notre comparateur" link="\#" />
                    </div>
                </div>
            </>
        )
    }
}

export{
    PrepareCardboard,
    Transport
}