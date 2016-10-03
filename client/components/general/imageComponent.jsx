import React, { Component } from 'react';

class ImageComponent extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    };

    render() {
        return (
            <img src={this.props.data} alt={this.props.alt || 'No image found.'}/>
        )
    };
};

export default ImageComponent;
