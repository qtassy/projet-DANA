import React from 'react';
import './AvailableContent.scss';

class AvailableContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render(){
        return(
            <button className="btn btn-content">{this.props.title}</button>
        )
    }
}
   


export default AvailableContent;
