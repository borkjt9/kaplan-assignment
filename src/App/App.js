import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Section from './Section/Section';
import * as questionActions from '../redux/actions/questions';
import './_App.scss';
import '../shared/styles/_rootStyles.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.positionAnswer = this.positionAnswer.bind(this);
    this.setActiveAnswer = this.setActiveAnswer.bind(this);
    this.setActiveQuestion = this.setActiveQuestion.bind(this);
    this.resetActiveQuestion = this.resetActiveQuestion.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    questionActions.requestGetQuestions(dispatch);
  }

  setActiveAnswer(activeAnswer, activeQuestion) {
    const { dispatch } = this.props;
    dispatch(questionActions.setActiveAnswer(activeAnswer, activeQuestion));
  }

  setActiveQuestion(newQuestion) {
    const { dispatch, questions } = this.props;
    if (newQuestion >= 0 && newQuestion < (Object.keys(questions)).length - 1) {
      dispatch(questionActions.setActiveQuestion(newQuestion));
    }
  }

  setAnswerPosition(answer, position) {
    const { dispatch } = this.props;
    dispatch(questionActions.setAnswerPosition(answer, position));
  }

  positionAnswer(data) {
    const { dispatch } = this.props;
    dispatch(questionActions.positionAnswer(data));
  }

  resetActiveQuestion(activeQuestion) {
    const { dispatch } = this.props;
    dispatch(questionActions.resetActiveQuestion(activeQuestion));
  }

  render() {
    const { activeQuestion } = this.props.questions;
    const activeQuestionDict = this.props.questions[activeQuestion];
    const { questionText, answers } = activeQuestionDict;
    const {
      left,
      right,
      totalAnswers,
      activeAnswer,
    } = answers;
    return (
      <div className="app --dimensions-is-screen">
        <div className="container">
          <div className="app__question-box row">
            <div className="app__question-box__header --purple d-flex align-items-center justify-content-center">
              <h1 className="app_question-box__header__question-number">
                Question 1
              </h1>
            </div>
            <div className="app__question-box__question-container p-5">
              <p className="app__question-box__question-container__question-text">
                {questionText}
              </p>
              <div className="app_question-box__question-container__options row">
                <Section
                  answersDict={left}
                  totalAnswers={totalAnswers}
                  side="left"
                  activeAnswer={activeAnswer}
                  positionAnswer={this.positionAnswer}
                  setActiveAnswer={this.setActiveAnswer}
                  activeQuestion={activeQuestion}
                />
                <Section
                  answersDict={right}
                  totalAnswers={totalAnswers}
                  side="right"
                  activeAnswer={activeAnswer}
                  positionAnswer={this.positionAnswer}
                  setActiveAnswer={this.setActiveAnswer}
                  activeQuestion={activeQuestion}
                />
              </div>
              <div className="app__question-box__question-container__reset-container">
                <button
                  className="app__question-box__question-container__reset-container__btn btn btn-link"
                  onClick={() => this.resetActiveQuestion(activeQuestion)}
                >
                  RESET
                </button>
              </div>
            </div>

          </div>
          <div className="app__btns-container row align-items-center justify-content-between ">
            <button
              type="button"
              onClick={() => this.setActiveQuestion(activeQuestion - 1)}
              className="app__btns-container__btn --prev col-2 btn btn-secondary"
            >
              PREV
            </button>
            <button
              type="button"
              onClick={() => this.setActiveQuestion(activeQuestion + 1)}
              className="app__btns-container__btn --next col-2 btn btn-primary"
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    );
  }
}

App.defaultProps = {
  activeQuestion: 0,
};

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  activeQuestion: PropTypes.number,
  questions: PropTypes.objectOf(PropTypes.any).isRequired,
};

function mapStateToProps(state) {
  return (state);
}

export default connect(mapStateToProps)(DragDropContext(HTML5Backend)(App));
