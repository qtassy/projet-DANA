import React, {Component} from 'react'
import './../../css/CreationCompte.css'
export class CreationCompteClient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nom : "",
            prenom : "",
            email : "",
            telephone : "",
            adresse : "",
            mdp : "",
            confirmationMdp : "",
            erreurMdp : "",
            erreurMail : "",
            erreurTel : ""
        };

        this.setNom = this.setNom.bind(this);
        this.setPrenom = this.setPrenom.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setTelephone = this.setTelephone.bind(this);
        this.setAdresse = this.setAdresse.bind(this);
        this.setMdp = this.setMdp.bind(this);
        this.setConfirmationMdp = this.setConfirmationMdp.bind(this);

        this.formatterTelephone = this.formatterTelephone.bind(this);

        this.valider = this.valider.bind(this);
    }

    setNom(event) {
        this.setState({nom : event.target.value});
    }

    setPrenom(event) {
        this.setState({prenom : event.target.value});
    }

    setEmail(event) {
        this.setState({email : event.target.value});
    }

    setTelephone(event) {
        this.setState({telephone : event.target.value});
    }

    setAdresse(event) {
        this.setState({adresse : event.target.value});
    }

    setMdp(event) {
        this.setState({mdp : event.target.value});
    }

    setConfirmationMdp(event) {
        this.setState({confirmationMdp : event.target.value});
    }

    valider(event) {
        event.preventDefault();

        if(this.state.mdp === this.state.confirmationMdp) {

            this.setState({erreurMdp : ""})


            const url = 'http://obiwan2.univ-brest.fr:7145/ajtClient'

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                 body: JSON.stringify({ nom : this.state.nom.toUpperCase(), 
                                        prenom : this.state.prenom.charAt(0).toUpperCase() + this.state.prenom.slice(1).toLowerCase(),
                                        email : this.state.email,
                                        telephone : this.formatterTelephone(this.state.telephone),
                                        adresse : this.state.adresse,
                                        mdp : this.state.mdp,
                                        photo:":)"})
            };
            
            fetch(url, requestOptions)
                .then(response => response.json())
                .then(data => this.setState({ erreurMail: data.erreurMail, erreurTel : data.erreurTel }))
                .catch(error => console.error(error));
        } else {
            this.setState({erreurMdp : "Les mots de passes ne correspondent pas"})
        }
    }

    formatterTelephone(telephone) {
        let res = "";

        for (let index = 0; index < telephone.length; index++) {
            console.log(res.length % 2)
            if(telephone.charAt(index) >= '0' && telephone.charAt(index) <= '9') {
                if(res.length % 3 === 0) {
                    res += telephone.charAt(index);
                } else {
                    res += telephone.charAt(index) + " ";
                }
            }
        }

        return res;
    }

    render() {
        return (
            <div className={"formCreationCompte"}>
                <form onSubmit={this.valider}>
                    <div className={"form-group"}>
                        <input type={"text"} className={"form-control elementFormCreationCompte"} id={"nom"}
                            aria-describedby={"nom"} placeholder={"NOM"} required onChange={this.setNom} value={this.state.nom}/>
                    </div>
                    <div className={"form-group"}>
                        <input type={"text"} className={"form-control elementFormCreationCompte"} id={"prenom"}
                            aria-describedby={"prenom"} placeholder={"Prénom"} required onChange={this.setPrenom}
                            value={this.state.prenom}/>
                    </div>
                    
                    <div className={"form-group"}>
                        <input type={"email"}
                            pattern={"(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-"+
                            "\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@"+
                            "(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|"+
                            "[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e"+
                            "-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])"}
                            className={"form-control elementFormCreationCompte"} id={"email"} aria-describedby={"email"}
                            placeholder={"Email"} required onChange={this.setEmail} value={this.state.email}/>

                        <div className={"erreurCreationCompte elementFormCreationCompte"}>
                            {this.state.erreurMail}
                        </div>
                    </div>

                    <div className={"form-group"}>
                        <input type="tel"
                            pattern={"^(?:(?:\\+|00)33[\\s.-]{0,3}(?:\\(0\\)[\\s.-]{0,3})?|0)[1-9](?:(?:[\\s.-]?\\d{2}){4}|"
                                    + "\\d{2}(?:[\\s.-]?\\d{3}){2})$"}
                            className={"form-control elementFormCreationCompte"} id={"telephone"} aria-describedby={"telephone"}
                            placeholder={"Numéro de téléphone"} required onChange={this.setTelephone} value={this.state.telephone} />
                        
                        <div className={"erreurCreationCompte elementFormCreationCompte"}>
                            {this.state.erreurTel}
                        </div>
                    </div>

                    <div className={"form-group"}>
                        <input type={"text"} 
                            className={"form-control elementFormCreationCompte"} id={"adresse"} aria-describedby={"adresse"}
                            placeholder={"Adresse"} required onChange={this.setAdresse} value={this.state.adresse} />
                    </div>

                    <div className={"form-group"}>
                        <input type={"password"}
                            className={"form-control elementFormCreationCompte"} id={"mdp"} aria-describedby={"mdp"}
                            placeholder={"Mot de passe"} required onChange={this.setMdp} value={this.state.mdp} />
                    </div>

                    <div className={"form-group"}>
                        <input type={"password"} 
                            className={"form-control elementFormCreationCompte"} id={"confirmationMdp"} aria-describedby={"confirmationMdp"}
                            placeholder={"Confirmer le mot de passe"} required onChange={this.setConfirmationMdp}
                            value={this.state.confirmationMdp} />

                        <div className={"erreurCreationCompte elementFormCreationCompte"}>
                            {this.state.erreurMdp}
                        </div>
                    </div>

                    <button type="submit" className={"btn elementFormCreationCompte"}
                        id={"validerFormCreationCompte"}>Valider</button>
                </form>
            </div>
        )
    }
}

export default CreationCompteClient;