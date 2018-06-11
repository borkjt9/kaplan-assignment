import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Spinner from 'react-spinkit';
import Section from './Section/Section';
import preloadIMGs from '../shared/assets/assetURLs';
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
    this.state = {
      initialLoad: true,
    };
  }

  componentWillMount() {
    const { dispatch } = this.props;
    questionActions.requestGetQuestions(dispatch);
  }

  componentDidMount() {

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
    const { questions } = this.props;
    const { activeQuestion } = questions;
    if (activeQuestion < 0) {
      return (
        <div className="app --dimensions-is-screen --is-loading">
          <div className="container">
            <div className="app__question-box row">
              <div className="app__question-box__header --purple d-flex align-items-center justify-content-center">
                <h1 className="app_question-box__header__question-number">
                  Question 1
                </h1>
              </div>
              <div className=" --vert-center col-12">
                <Spinner className="app__spinner --vert-center__child text-center" color="#007bff" />
              </div>
            </div>
          </div>
        </div>
      );
    }
    const activeQuestionDict = questions[activeQuestion];
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
                {`Question ${activeQuestion + 1}`}
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
        {preloadIMGs()}
      </div>
    );
  }
}

App.defaultProps = {
  questions: { activeQuestion: -1 },
};

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  questions: PropTypes.objectOf(PropTypes.any),
};

function mapStateToProps(state) {
  return (state);
}

export default connect(mapStateToProps)(DragDropContext(HTML5Backend)(App));
