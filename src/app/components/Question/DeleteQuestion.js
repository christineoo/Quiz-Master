import React, {Component, PropTypes} from 'react';
import { Dialog, FlatButton } from 'material-ui';

class Delete extends Component {

    static propTypes = {
        selectedQuestion: PropTypes.object.isRequired,
        openDeleteDialog: PropTypes.bool.isRequired,
        onDeleteDialogClose: PropTypes.func.isRequired,
        onSubmitClick: PropTypes.func.isRequired
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
        const actions = [
            <FlatButton
                label={'Cancel'}
                secondary={true}
                onTouchTap={this.props.onDeleteDialogClose} />,
            <FlatButton
                label={'Delete'}
                primary={true}
                disabled={false}
                onTouchTap={this.props.onSubmitClick} />,
        ];

        return (
            <Dialog
                title="Are you sure you want to delete this question?"
                open={this.props.openDeleteDialog}
                onRequestClose={this.props.onDeleteDialogClose}
                modal={true}
                actions={actions}
                autoScrollBodyContent={true}
            >
                <p>Question: </p>
                <p dangerouslySetInnerHTML={{__html: this.props.selectedQuestion.content}} />
                <p>Answer: </p>
                <p>{this.props.selectedQuestion.answer}</p>
            </Dialog>
        )
    }
}

export default Delete;