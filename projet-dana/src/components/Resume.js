import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruck } from '@fortawesome/free-solid-svg-icons'

export class Resume extends React.Component{
    constructor(props){
        super();
        this.state = {
            nbElements : 0,
            surface : 0
        }
    }

    /**
     * Évènement de clique sur le bouton de validation
     * Apelle la fonction submit() du composant père (CalculateurVolume) recus en props.
     */
    submit = () => {
        var data = {
            nbElements : this.state.nbElements,
            surface : this.state.surface
        }
        this.props.validation(data);
    }

    /**
     * Fonction d'incrémentation du nombre d'éléments total du récapitulatif (this.state.nbElements)
     */
    incrementer = () => {
        var nb = this.state.nbElements + 1;
        this.setState({ nbElements : nb });
    }

    /**
     * Fonction de décrémentation du nombre d'éléments total du récapitulatif (this.state.nbElements)
     */
    decrementer = () => {
        var nb = this.state.nbElements - 1;
        if(nb < 0){
            this.setState({ nbElements : 0 });
        }else{
            this.setState({ nbElements : nb });
        }
    }

    render(){
        return(
            <React.Fragment>
                <div className={"col-4 my-3 text-center"} id="block-nbElements">
                    <div className={"row"}>
                    <span id="nbElement">{this.state.nbElements}</span>
                    <span id="label-nbElements">Eléments</span>
                    </div>
                </div>
                <div className={"col-4 my-3 text-center"}id="block-surface">
                    <div className={"row"}>
                    <span id="surface">{this.state.surface + "m³"}</span>
                    <span id="label-surface">Surface</span>
                    </div>
                </div>
                <div className={"col-4 my-3 text-center"}id="block-surface">
                <button className={"btn btn-content camionResume"} type="button" id="btn-resume" onClick={this.submit}> <FontAwesomeIcon  icon={faTruck} /></button>
                </div>
            </React.Fragment>
        )
    }
}

export default Resume;