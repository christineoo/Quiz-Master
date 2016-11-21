import React, {Component, PropTypes} from 'react';
import QuestionsList from '../components/question/QuestionsList';
import CreateQuestion from '../components/question/CreateQuestion';
import UpdateQuestion from '../components/question/UpdateQuestion';
import DeleteQuestion from '../components/question/DeleteQuestion';

import { loadQuestions, createQuestion, deleteQuestion } from '../actions/questions';
import { connect } from 'react-redux';
import { FloatingActionButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';

class ManageQuestionsContainer extends Component {

    static defaultProps = {
        questions: []
    };

    constructor(props) {
        super(props);
        this.state = {
            openCreateDialog: false,
            openUpdateDialog: false,
            openDeleteDialog: false,
            selectedQuestion: {}
        }
    }

    componentWillMount() {
        this.props.loadQuestions();
    }

    // Add new question
    handleAddQuestion = () => {
        this.setState({
            openCreateDialog: true
        })
    };

    handleCreateDialogClose = () => {
        this.setState({
            openCreateDialog: false
        })
    };

    handleCreateSubmit = (newQuestion) => {
        console.log('handleCreateSubmit: ', newQuestion);
        this.props.createQuestion(newQuestion);
        this.setState({
            openCreateDialog: false
        })
    };

    // Update question
    handleUpdateQuestion = (question) => {
        console.log('update question: ', question);
        this.setState({
            selectedQuestion: question,
            openUpdateDialog: true
        })
    };

    handleUpdateDialogClose = () => {
        this.setState({
            openUpdateDialog: false
        })
    };

    // Delete Question
    handleDeleteQuestion = (question) => {
        console.log('delete: ', question)
        this.setState({
            selectedQuestion: question,
            openDeleteDialog: true
        });
    };

    handleDeleteDialogClose = () => {
        this.setState({
            openDeleteDialog: false
        })
    };

    handleDeleteSubmit = () => {
        this.setState({
            openDeleteDialog: false
        });
        this.props.deleteQuestion(this.state.selectedQuestion.id);
    };

    render() {
        return (
            <div style={{paddingTop: '70px'}}>
                <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
                    <FloatingActionButton style={{position: 'fixed', right: '20px'}}
                                          secondary={true}
                                          onTouchTap={this.handleAddQuestion}
                    >
                        <ContentAdd />
                    </FloatingActionButton>
                </div>
                <CreateQuestion
                    openCreateDialog={this.state.openCreateDialog}
                    onCreateDialogClose={this.handleCreateDialogClose}
                    onSubmitClick={this.handleCreateSubmit}
                />
                <UpdateQuestion
                    selectedQuestion={this.state.selectedQuestion}
                    openUpdateDialog={this.state.openUpdateDialog}
                    onUpdateDialogClose={this.handleUpdateDialogClose}
                />
                <DeleteQuestion
                    selectedQuestion={this.state.selectedQuestion}
                    openDeleteDialog={this.state.openDeleteDialog}
                    onDeleteDialogClose={this.handleDeleteDialogClose}
                    onSubmitClick={this.handleDeleteSubmit}
                />
                <QuestionsList
                    questions={this.props.questions}
                    onUpdateQuestionClick={this.handleUpdateQuestion}
                    onDeleteQuestionClick={this.handleDeleteQuestion}
                />
            </div>
        )
    }
}

const stateToProps = state => {
    const { questions } = state.questions;

    return {
        questions
    }
};

const actionsToProps = dispatch => ({
    loadQuestions: () => dispatch(loadQuestions()),
    createQuestion: (newQuestion) => dispatch(createQuestion(newQuestion)),
    deleteQuestion: (id) => dispatch(deleteQuestion(id))
});

export default connect(stateToProps, actionsToProps)(ManageQuestionsContainer);