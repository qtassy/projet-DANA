import React from "react";
import { Link } from "react-router-dom";
import "./ListModules.scss";
import { TiInfoLarge } from "react-icons/ti";
import { IoIosArrowForward, IoLogoWindows } from "react-icons/io";
import { MdChevronLeft } from "react-icons/md";
import {httpRequest} from '../../services/httpRequestService';

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
                                <a onClick = {(e)=>this.props.traitement()} className="link-round">
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

class MakeMyCardboards extends React.Component{
    getDemenagement =() =>{
        let url = "http://obiwan2.univ-brest.fr:7144/getDemenagement/" +
         localStorage.getItem("accountId");
    
        var options = {
          method: 'GET',
          body: null,
          headers: { 'Content-Type': 'application/json' }
        }
    
        httpRequest(url, options).then(response=> {
          console.log("Origine/destination : ", response);

          //if reponse is an empty object 
          if(Object.keys(response).length === 0){
            window.location.href = "/CreationProjetDemenagement";
          }else{
              localStorage.setItem("origin", response.origin);
              localStorage.setItem("destination", response.destination);
              window.location.href = "/MakeMyCardboards/myCardBoards"

          }
        //   return response;
        })
    }
    render(){
        return(
            <>
                <Jumbotron title="Faire ses cartons"/>
                <div className="container">
                    <div className="row">
                        <Module text="Préparer ses cartons" traitement = {this.getDemenagement} /*link="/MakeMyCardboards/myCardBoards"*/ />
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