import React, {Component, PropTypes} from 'react'
import {Card, CardActions, CardText, FlatButton} from 'material-ui';

class QuestionsList extends Component {

    static propTypes = {
        questions: PropTypes.array.isRequired,
        onUpdateQuestionClick: PropTypes.func.isRequired,
        onDeleteQuestionClick: PropTypes.func.isRequired
    };

    renderQuestion(question) {
        const cardStyle = {
            margin: '10px 0',
            maxWidth: '400px',
            minWidth: '400px'

        };

        return Object.keys(question).map((key) => {
            return (
                <Card style={cardStyle}>
                    <CardText>
                        <p dangerouslySetInnerHTML={{__html: question[key].content}}/>
                    </CardText>
                    <CardActions>
                        <FlatButton label="Edit" onTouchTap={() => this.props.onUpdateQuestionClick(question[key])}/>
                        <FlatButton label="Delete" onTouchTap={() => this.props.onDeleteQuestionClick(question[key])}/>
                    </CardActions>
                </Card>
            )
        })
    }

    render() {
        const {questions} = this.props;

        const QuestionListStyle = {
            // paddingTop: '70px',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column'
        }
        return (
            <div style={QuestionListStyle}>
                <h1>Questions List</h1>

                {questions.map((question) =>
                    this.renderQuestion(question)
                )}

            </div>
        )
    }

}

export default QuestionsList;