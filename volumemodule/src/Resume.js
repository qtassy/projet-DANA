import React from 'react';

export class Resume extends React.Component{
    constructor(props){
        super();
        this.state = {
            nbElements : 0,
            surface : 0
        }
    }

    submit = () => {
        var data = {
            nbElements : this.state.nbElements,
            surface : this.state.surface
        }
        this.props.validation(data);
    }

    incrementer = () => {
        var nb = this.state.nbElements + 1;
        this.setState({ nbElements : nb });
    }

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
            <div id="block-resume">
                <div id="block-nbElements">
                    <p id="nbElement">{this.state.nbElements}</p>
                    <p id="label-nbElements">Eléments</p>
                </div>
                <div id="block-surface">
                    <p id="surface">{this.state.surface + "m3"}</p>
                    <p id="label-surface">Surface</p>
                </div>
                <input type="button" id="btn-resume" onClick={this.submit}/>
                <p></p>
            </div>
        )
    }
}

export default Resume;