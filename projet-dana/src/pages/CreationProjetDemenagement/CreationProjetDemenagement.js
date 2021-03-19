import React, {Component} from 'react'
import './CreationProjetDemenagement.css'

export class CreationProjetDemenagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nomProjet : "",
            dateProjet : "",
            adresseActuelle : "",
            adresseFutur : ""
        };
        this.formaterElementDate = this.formaterElementDate.bind(this);
        this.formaterDate = this.formaterDate.bind(this);

        this.setNomProjet = this.setNomProjet.bind(this);
        this.setDateProjet = this.setDateProjet.bind(this);
        this.setAdresseActuelle = this.setAdresseActuelle.bind(this);
        this.setAdresseFutur = this.setAdresseFutur.bind(this);

        this.valider = this.valider.bind(this);
    }

    setNomProjet(event) {
        this.setState({nomProjet : event.target.value});
    }

    setDateProjet(event) {
        this.setState({dateProjet : event.target.value});
    }

    setAdresseActuelle(event) {
        this.setState({adresseActuelle : event.target.value});
    }

    setAdresseFutur(event) {
        this.setState({adresseFutur : event.target.value});
    }

    /**
     * @description Ajoute un zéro devant un élément de la date inférieur à 0
     * @param {number} nb Un élément de la date
     * @returns L'élément de la date passé en paramètre avec un zéro devant si celui-ci est inférieur à 0
     */
    formaterElementDate(nb) {
        if(nb <= 9) {
            return "0" + nb;
        } else {
            return nb;
        }
    }

    /**
     * @description Met la date au format jj/mm/aaaa - hh:mm:ss
     * @param {Date} date La date à formater
     * @returns La chaine de caractère correspondant à la date formatée
     */
    formaterDate(date) {
        let jour = this.formaterElementDate(date.getDate());
        // Les mois vont de 0 à 11, on l'incrémente donc de 1
        let mois = this.formaterElementDate(date.getMonth() + 1);
        let annee = date.getFullYear();
        
        return annee + "-" + mois + "-" + jour;
    }

    valider(event) {
        event.preventDefault();
        const url = 'http://obiwan2.univ-brest.fr:7144/ajtDemenagement'

        // TODO : récupérer l'id du client dynamiquement
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({  nomProjet : this.state.nomProjet, dateProjet : this.state.dateProjet,
                                    adresseActuelle : this.state.adresseActuelle, adresseFutur : this.state.adresseFutur,
                                    idClient : 1})
        };
        
        fetch(url, requestOptions)
        .catch(error => console.error(error));
    }

    render() {
        return (
            <div className={"formConnaissance"}>
                <form onSubmit={this.valider}>
                    <div className={"form-group"}>
                        <input type="text" className={"form-control elementFormConnaissance"} id={"nomProjet"}
                        aria-describedby={"nomProjet"} placeholder={"Nom du projet"} value={this.state.nomProjet} 
                        onChange={this.setNomProjet}/>
                    </div>
                    <div className={"form-group"}>
                    <input type="date" className={"form-control elementFormConnaissance"}
                        id={"dateProjet"} aria-describedby={"dateProjet"} placeholder={"Date de votre déménagement"}
                        min={this.formaterDate(new Date(Date.now()))} value={this.state.dateProjet} onChange={this.setDateProjet}/>
                    </div>

                    <div className={"form-group"}>
                        <input type="text" 
                            className={"form-control elementFormConnaissance"} id={"adresseActuelle"} aria-describedby={"adresseActuelle"}
                            placeholder={"Adresse de votre logement actuel"} value={this.state.adresseActuelle} 
                            onChange={this.setAdresseActuelle}/>
                    </div>

                    <div className={"form-group"}>
                        <input type="text" 
                            className={"form-control elementFormConnaissance"} id={"adresseFutur"} aria-describedby={"adresseFutur"}
                            placeholder={"Adresse de votre futur logement"} value={this.state.adresseFutur} onChange={this.setAdresseFutur}/>
                    </div>

                    <button type="submit" className={"btn elementFormConnaissance"} id={"validerFormConnaissance"}>Valider</button>
                </form>
                
            </div>
        )
    }
}

export default CreationProjetDemenagement;