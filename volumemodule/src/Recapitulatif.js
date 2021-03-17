import React from 'react';

export class Recapitulatif extends React.Component {

    componentDidMount = () => {
        var recap = localStorage.getItem("Recapitulatif");
        console.log(recap.idUtilisateur);
    }

    render() {
        return(
            <div></div>
        )
    }
}

export default Recapitulatif;