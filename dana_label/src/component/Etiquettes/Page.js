import React, {Component} from 'react'
import './../../css/Label.css'
import Etiquette from './Etiquette.js'

const fetch = require('node-fetch');

export class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartons : []
        };

        this.getCartons = this.getCartons.bind(this);
    }

    getCartons() {
        const url = 'http://obiwan2.univ-brest.fr:7144/cartonsPiece/6';

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => this.setState({cartons : data}))
        .catch(error => console.error(error));
    }

    componentDidMount() {
        this.getCartons();
    }

    render() {
        const labels = this.state.cartons.map((carton) =>
            <Etiquette  id={carton.idCarton}
                    couleur={carton.couleur}
                    origine={carton.origine}
                    destination={carton.destination}
                    key={carton.idCarton}
            />
        );

        return (
            <div>
                <div className={"page container-sm"}>
                    <div className={"row"}>
                        {labels}
                    </div>
                </div>
            </div>
        )
    }
}

export default Page;