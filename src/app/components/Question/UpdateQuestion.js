import React, {Component, PropTypes} from 'react';
import { Dialog, FlatButton, TextField } from 'material-ui';

class Edit extends Component {

    static propTypes = {
        selectedQuestion: PropTypes.object.isRequired,
        openUpdateDialog: PropTypes.bool.isRequired,
        onUpdateDialogClose: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            question: this.props.selectedQuestion,
            content: this.props.selectedQuestion.content,
            answer: this.props.selectedQuestion.answer
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.selectedQuestion != nextProps.selectedQuestion) {
            this.setState({
                content: nextProps.selectedQuestion.content,
                answer: nextProps.selectedQuestion.answer
            });
        }
    }

    render () {
        // TODO: clean up
console.log('state: ', this.state)
        const actions = [
            <FlatButton
                label={'Cancel'}
                secondary={true}
                onTouchTap={this.props.onUpdateDialogClose} />,
            <FlatButton
                label={'Submit'}
                primary={true}
                disabled={false}
                onTouchTap={this.handleSubmit} />,
        ];

        return (
            <Dialog
                title="Edit Question"
                open={this.props.openUpdateDialog}
                onRequestClose={this.props.onUpdateDialogClose}
                modal={true}
                actions={actions}
                autoScrollBodyContent={true}
            >
                <TextField fullWidth
                           value={this.state.content}
                           floatingLabelText={'Question Content'}
                           errorText={this.state.content ? null : 'This field is required.'}
                           onChange={(event) => this.setState({ content: event.target.value })}
                />
                <TextField fullWidth
                           value={this.state.answer}
                           floatingLabelText={'Answer'}
                           onChange={(event) => this.setState({ answer: event.target.value })}
                           errorText={this.state.answer ? null : 'This field is required.'}
                />
            </Dialog>
        )
    }
}

export default Edit;