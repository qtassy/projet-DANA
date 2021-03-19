import React, {Component} from 'react'
import CreationPieces from './../../components/CreationPieces/CreationPieces'
import './PageCreationPieces.css'
export class CreationPiecesFutur extends Component {

    componentDidMount() {
        localStorage.setItem("lienBoutonAnnulation", "/MakeMyCardboards/myCardBoards");
    }
    
    render() {
        return(
            <div className={"pageCreationPiece"}>
                <h1 className={"titreLogement"}>Pièces du futur logement</h1>
                <CreationPieces idLogement="destination"
                                redirect="/MakeMyCardboards/myCardBoards"
                />
            </div>
        )
    }
}

export default CreationPiecesFutur;