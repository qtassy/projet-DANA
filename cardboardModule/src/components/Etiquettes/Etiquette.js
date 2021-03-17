import React, {Component} from 'react'
import './Etiquettes.css'

const QRCode= require('qrcode.react');

export class Etiquette extends Component {

    render() {
        return (
            <div className={"label card col-lg-6-auto col-md-6 col-sm-6"} style={{backgroundColor: this.props.couleur}}>
                <div>
                    {this.props.idCarton}
                </div>

                <div>
                    {this.props.origine + ' → ' + this.props.destination}
                </div>
                <div>
                    <QRCode value={"/detailCarton/" + this.props.idCarton} />
                </div>
            </div>
        )
    }
}

export default Etiquette;