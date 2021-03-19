import React from 'react'
import "./Login.css";



export class Login extends React.Component {
    constructor(){
      super();
      this.state = {
          login : "",
          pass : "",
          valid: false
      };
      this.submit = this.submit.bind(this);
    }

    changeLogin = (event) => {
        this.setState({login : event.target.value})
    }

    changePass = (event) => {
        this.setState({pass : event.target.value})
    }

    submit(event) {
        //Empeche le form de refresh la page
        event.preventDefault();
        if(this.state.login === "" || this.state.pass === ""){
            document.getElementById("etat").innerHTML = "Nom d'utilisateur ou mot de passe incorrect !"
            return
        }
        var data = {
            login: this.state.login,
            pass: this.state.pass
        }
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        var url = 'http://obiwan2.univ-brest.fr:7145/login'
        localStorage.clear();
        fetch(url, requestOptions)
        .then(result => result.json())
        .then(result => {
            console.log("result : ", result);
            if(result.id === -1){
                document.getElementById("etat").innerHTML = "Pas connecté !"
            }else{
                document.getElementById("etat").innerHTML = "Connecté !"  
                // this.setState({valid : true})
                localStorage.setItem("clientId", result.idClient);
                localStorage.setItem("accountId", result.idCompte);
                localStorage.setItem("accountType", result.type);
                window.location.href = "/home";
            }
        });
    }

    redirectToProPage(){
        console.log("redirection to Pro page ");
        window.location.href = "/CreationComptePro"
    }

    redirectToClientPage(){
        console.log("redirection to Pro page ");
        window.location.href = "/CreationCompteClient"
    }


    render(){
        
    return(
        
    <div className={"centerLogin"} >
        <form className={"formulaire"} onSubmit={this.submit}>
            <div className={"identification"} >
                <input type="text" name="login" onChange={this.changeLogin} required value= {this.state.login}></input>
                <label htmlFor="login"> Nom d'utilisateur </label>
            </div>
            <div className={"identification"}> 
                <input  className={"bottom"} type="text" name="pass" onChange={this.changePass} 
                value = {this.state.pass} required></input>
                <label htmlFor="pass"> Mot de passe </label>
            </div>
            <p id="etat"></p>
            <button className={"submit"} id="submit" type="submit">Connexion</button>
            <div className={"row text-center mt-4"}>
                <button className={" btn btn-primary boutonCreateUser"}  onClick = {(e)=>this.redirectToProPage()}>
                    <p>Je n'ai pas de compte professionnel</p>
                </button>
                <button className={" btn btn-primary boutonCreateUser"} onClick = {(e)=>this.redirectToClientPage()}>
                    <p>Je souhaite utiliser mon véhicule personnel</p>
                </button>
            </div>
        </form>
    </div>
    
    )
     
    }
}

export default Login;