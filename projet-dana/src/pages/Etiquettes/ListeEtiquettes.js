import React, {Component} from 'react'
import ReactToPrint from 'react-to-print'
import './../../components/Etiquettes/Label.css'
import Page from './../../components/Etiquettes/Page.js'

export class ListeEtiquettes extends Component {
    render() {
        return (
            <div>
                <Page ref={(el) => (this.componentRef = el)}/>

                <div className="divBtnImpressionEtiquette d-flex justify-content-center">
                    <ReactToPrint 
                        trigger={() => <button className={"btn btn-primary btnImpressionEtiquette"}>Imprimer mes étiquettes</button>}
                        content={() => this.componentRef}
                        copyStyles={true}
                    />
                </div>
            </div>
        );
    }
}

export default ListeEtiquettes;