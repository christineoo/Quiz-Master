import React, {Component, PropTypes} from 'react'

class CenteredView extends Component {

    componentDidMount() {
        window.addEventListener('resize', this.onResize);
        setTimeout(this.onResize, 100);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize);
    }

    componentWillReceiveProps() {
        this.onResize();
    }

    onResize = () => {
        let view = this.refs.view;
        if (view) {
            let height = window.innerHeight - view.getBoundingClientRect().top;
            view.style.minHeight = `${height}px`;
        }
    };

    render() {
        const centeredViewStyle = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '500px',
            flexDirection: 'column'
        };

        return (
            <div ref="view" style={centeredViewStyle}>
                {this.props.children}
            </div>
        )
    }
}

export default CenteredView;