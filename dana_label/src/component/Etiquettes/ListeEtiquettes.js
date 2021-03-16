import React, {Component} from 'react'
import ReactToPrint from 'react-to-print'
import './../../css/Label.css'
import Page from './Page.js'

export class ListeEtiquettes extends Component {
    render() {
        return (
            <div>
                <form className={"container formLabels"}>
                    <div className={"row divRowLabel"}>
                        <div className={"colLabel"}>
                            <input type="number" className={"form-control nbCopies"}
                                placeholder={"Nombre de copie"} aria-describedby={"Nombre de copie"}
                                min={"1"} />
                            <select className={"custom-select taillePapier"} defaultValue={"2"} aria-label={"Taille du papier"}>
                                <option value={"1"}>A5</option>
                                <option value={"2"}>A4</option>
                                <option value={"3"}>A3</option>
                            </select>
                        </div>
                    </div>
                </form>



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