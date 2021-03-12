import React, {Component} from 'react'
import './../../css/Label.css'

const QRCode= require('qrcode.react');

export class Etiquette extends Component {

    render() {
        return (
            <div className={"label card col-lg-6-auto col-md-6 col-sm-6"} style={{backgroundColor: this.props.couleur}}>
                <div>
                    {this.props.id}
                </div>

                <div>
                    {this.props.origine + ' → ' + this.props.destination}
                </div>
                <div>
                    <QRCode value={"/detailCarton/" + this.props.id} />
                </div>
            </div>
        )
    }
}

export default Etiquette;