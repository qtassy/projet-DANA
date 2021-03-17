import React, {Component} from 'react'
import './../../css/Label.css'
import logo from './../../UBO_Logo_Dana.png'

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
                    <   QRCode  value={"https://www.youtube.com/"}
                                size={256}
                                imageSettings={{
                                    src: logo,
                                    x: null,
                                    y: null,
                                    height: 30,
                                    width: 30,
                                    excavate: true,
                                }}
                    />
                </div>
            </div>
        )
    }
}

export default Etiquette;