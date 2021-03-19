import React, {Component} from 'react'
import './CreationPieces.css'
export class CreationPieces extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pieces : [
                {
                    nom : ""
                }
            ]
        }

        this.setNomPiece = this.setNomPiece.bind(this);
        this.ajouterNomPiece = this.ajouterNomPiece.bind(this);
        this.supprimerNomPiece = this.supprimerNomPiece.bind(this);
        this.valider = this.valider.bind(this);
        this.annuler = this.annuler.bind(this);
    }

    setNomPiece(event, index) {
        // 1. On fait une copie superficielle des éléments
        let pieces = [...this.state.pieces];

        // 2. On fait une copie superficielle de l'élément qu'on souhaite modifier
        let piece = {...pieces[index]};

        // 3. On remplace la propriété qui nous intéresse
        piece.nom = event.target.value;

        // On met la première lettre en majuscule et les autres en minuscule
        piece.nom = piece.nom.charAt(0).toUpperCase() + piece.nom.slice(1).toLowerCase();

        // 4. On met à jour l'objet dans notre tableau. nous modifions le tableau ici, 
        //    c'est pourquoi nous avons d'abord fait une copie
        pieces[index] = piece;

        // 5. On définit l'état sur notre nouvelle copie
        this.setState({pieces});
    }

    ajouterNomPiece() {
        let pieces = [...this.state.pieces, {nom : ""}];
        this.setState({pieces});
    }

    supprimerNomPiece(index) {
        const pieces = [...this.state.pieces];

        if(pieces.length > 1) {
            pieces.splice((pieces.length - 1), 1);
            this.setState({pieces});
        }
    }

    valider(event) {
        event.preventDefault();

        const url = 'http://obiwan2.univ-brest.fr:7144/ajtPieces'

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({pieces : this.state.pieces, idLogement : localStorage.getItem(this.props.idLogement)})
        };
        
        fetch(url, requestOptions)
        .catch(error => console.error(error));

        window.location.href = this.props.redirect
    }

    annuler() {
        window.location.href = localStorage.getItem("lienBoutonAnnulation")
    }

    render() {
        return(
            <div className={"formCreationPieces"}>
                <form onSubmit={this.valider}>
                        {this.state.pieces.map((piece, index) => 
                            <div className={"form-group"} key={"clePiece-" + index}>
                                <input
                                    type={"text"} className={"form-control elementFormCreationPieces nomsPieces"} id={"nomPiece-" + index}
                                    aria-describedby={"nom"} placeholder={"Nom"} 
                                    onChange={(e) => this.setNomPiece(e, index)}
                                    required value={this.state.nom}
                                />
                            </div>
                        )}

                        <div className={"form-group"}>
                            <button type={"button"} onClick={this.supprimerNomPiece} id={"supprPiece"}
                                className={"btn elementFormCreationPieces ajoutSuppr"}>-</button>
                            <button type={"button"} onClick={this.ajouterNomPiece} id={"ajoutPiece"}
                                className={"btn elementFormCreationPieces ajoutSuppr"} >+</button>
                        </div>
                        
                        <div className={"form-group"}>
                            <button type="button" className={"btn elementFormCreationPieces"}
                                onClick={this.annuler} id={"annulerFormCreationPieces"}>
                                    {localStorage.getItem("texteBoutonAnnulation")}</button>

                            <button type="submit" className={"btn elementFormCreationPieces"}
                                    id={"validerFormCreationPieces"}>Valider</button>
                        </div>
                </form>
            </div>
        );
    }
}

export default CreationPieces;