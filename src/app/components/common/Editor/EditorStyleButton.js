import React, {Component, PropTypes} from 'react';

class EditorStyleButton extends React.Component {
    static propTypes = {
        active: PropTypes.bool.isRequired,
        onToggle: PropTypes.func.isRequired,
        label: PropTypes.string.isRequired,
        style: PropTypes.string.isRequired
    };

    constructor() {
        super();
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }

    render() {
        let className = 'RichEditor-styleButton';
        if (this.props.active) {
            className += ' RichEditor-activeButton';
        }

        return (
            <span className={className} onMouseDown={this.onToggle}>
                {this.props.label}
            </span>
        );
    }
}

export default EditorStyleButton;