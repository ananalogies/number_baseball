import React, { Component } from 'react';

class Try extends Component {
    render() {
        const { props } = this;
        return (
            <li><strong>{props.value.try}</strong> : {props.value.result}</li>
        );
    }
}

export default Try;