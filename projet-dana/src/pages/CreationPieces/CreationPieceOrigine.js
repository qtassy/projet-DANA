import React, {Component} from 'react'
import CreationPieces from './../../components/CreationPieces/CreationPieces'
import './PageCreationPieces.css'
export class CreationPiecesOrigine extends Component {
    render() {
        return(
            <div className={"pageCreationPiece"}>
                <h1 className={"titreLogement"}>Pièces du logement d'origine</h1>
                <CreationPieces idLogement="origin" redirect="/CreationPiecesFutur" />
            </div>
        )
    }
}

export default CreationPiecesOrigine;