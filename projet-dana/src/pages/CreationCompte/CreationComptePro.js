import React, {Component} from 'react'
import './CreationCompte.css'

export class CreationComptePro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nomEntreprise : "",
            email : "",
            telephone : "",
            adresseEntreprise : "",
            urlSite : "",
            mdp : "",
            confirmationMdp : "",
            erreurMdp : "",
            erreurMail : "",
            erreurTel : ""
        };

        this.setNomEntreprise = this.setNomEntreprise.bind(this);
        this.setAdresseEntreprise = this.setAdresseEntreprise.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setTelephone = this.setTelephone.bind(this);
        this.setMdp = this.setMdp.bind(this);
        this.setUrlSite = this.setUrlSite.bind(this);
        this.setConfirmationMdp = this.setConfirmationMdp.bind(this);

        this.formatterTelephone = this.formatterTelephone.bind(this);

        this.valider = this.valider.bind(this);
    }

    setNomEntreprise(event) {
        this.setState({nomEntreprise : event.target.value});
    }

    setUrlSite(event) {
        this.setState({urlSite : event.target.value});
    }

    setEmail(event) {
        this.setState({email : event.target.value});
    }

    setTelephone(event) {
        this.setState({telephone : event.target.value});
    }

    setAdresseEntreprise(event) {
        this.setState({adresseEntreprise : event.target.value});
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


            const url = 'http://obiwan2.univ-brest.fr:7145/ajtPro'

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                 body: JSON.stringify({ nomEntreprise : this.state.nomEntreprise,
                                        email : this.state.email,
                                        telephone : this.formatterTelephone(this.state.telephone),
                                        adresseEntreprise : this.state.adresseEntreprise,
                                        urlSite : this.state.urlSite,
                                        mdp : this.state.mdp})
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
                            aria-describedby={"nomEntreprise"} placeholder={"Nom d'entreprise"}
                             onChange={this.setNomEntreprise} required value={this.state.nomEntreprise}/>
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
                        <input type={"text"} 
                            className={"form-control elementFormCreationCompte"} id={"url"} aria-describedby={"url"}
                            placeholder={"URL Site"} onChange={this.setUrlSite} value={this.state.urlSite}
                            pattern={"((https|http):\\/\\/)?(www\\.)[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)"}/>
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
                            placeholder={"Adresse"}  onChange={this.setAdresseEntreprise} value={this.state.adresseEntreprise} />
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

export default CreationComptePro;