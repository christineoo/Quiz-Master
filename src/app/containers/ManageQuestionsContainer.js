import React, {Component, PropTypes} from 'react';
import QuestionsList from '../components/question/QuestionsList';
import CreateQuestion from '../components/question/CreateQuestion';
import UpdateQuestion from '../components/question/UpdateQuestion';
import DeleteQuestion from '../components/question/DeleteQuestion';

import {loadQuestions, createQuestion, updateQuestion, deleteQuestion} from '../actions/questions';
import {connect} from 'react-redux';
import {FloatingActionButton} from 'material-ui';
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

    handleCreateSubmit = (newQuestion) => {
        console.log('handleCreateSubmit: ', newQuestion);
        this.props.createQuestion(newQuestion);
        this.setState({
            openCreateDialog: false
        })
    };

    // Update question
    handleUpdateQuestion = (question) => {
        this.setState({
            selectedQuestion: question,
            openUpdateDialog: true
        })
    };

    handleUpdateSubmit = (updatedQuestion) => {
        this.props.updateQuestion(updatedQuestion);
        this.setState({
            openUpdateDialog: false
        })
    };

    // Delete Question
    handleDeleteQuestion = (question) => {
        this.setState({
            selectedQuestion: question,
            openDeleteDialog: true
        });
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
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <FloatingActionButton style={{position: 'fixed', right: '20px'}}
                                          secondary={true}
                                          onTouchTap={this.handleAddQuestion}
                    >
                        <ContentAdd />
                    </FloatingActionButton>
                </div>
                <CreateQuestion
                    openCreateDialog={this.state.openCreateDialog}
                    onSubmitClick={this.handleCreateSubmit}
                    onCreateDialogClose={() => this.setState({openCreateDialog: false})}
                />
                <UpdateQuestion
                    openUpdateDialog={this.state.openUpdateDialog}
                    onUpdateClick={this.handleUpdateSubmit}
                    selectedQuestion={this.state.selectedQuestion}
                    onUpdateDialogClose={() => this.setState({openUpdateDialog: false})}
                />
                <DeleteQuestion
                    openDeleteDialog={this.state.openDeleteDialog}
                    selectedQuestion={this.state.selectedQuestion}
                    onSubmitClick={this.handleDeleteSubmit}
                    onDeleteDialogClose={() => this.setState({openDeleteDialog: false})}
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
    const {questions} = state.questions;

    return {
        questions
    }
};

const actionsToProps = dispatch => ({
    loadQuestions: () => dispatch(loadQuestions()),
    createQuestion: (newQuestion) => dispatch(createQuestion(newQuestion)),
    updateQuestion: (updatedQuestion) => dispatch(updateQuestion(updatedQuestion)),
    deleteQuestion: (id) => dispatch(deleteQuestion(id))
});

export default connect(stateToProps, actionsToProps)(ManageQuestionsContainer);