import React, { Component } from 'react';


class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const { type, name, value, onChange, placeholder } = this.props
        return (
                <input type={type} name={name} className="input" value={value} onChange={onChange} placeholder={placeholder} />
        );
    }
}

export default Input;