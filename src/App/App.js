/**
 * @file App
 * @author John Borkowski
 * @version 0.1
 */
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
  /**
   * The highest order React component. It connects to the Redux Store.
   * All other components are fed store data as props.
   */

  constructor(props) {
    super(props);
    this.positionAnswer = this.positionAnswer.bind(this);
    this.setActiveAnswer = this.setActiveAnswer.bind(this);
    this.setActiveQuestion = this.setActiveQuestion.bind(this);
    this.resetActiveQuestion = this.resetActiveQuestion.bind(this);
    this.loadQuestions = this.loadQuestions.bind(this);
  }

  componentWillMount() {
    this.loadQuestions();
  }

  /**
   * When an Answer component is clicked or dragged, setActiveAnswer
   * stores that answer as active in the redux store.
   *
   * @param {Object} activeAnswer - The new active answer. EXAMPLE: { side: 'left', index: 1 }
   */
  setActiveAnswer(activeAnswer) {
    const { dispatch, questions } = this.props;
    dispatch(questionActions.setActiveAnswer(activeAnswer, questions.activeQuestion));
  }

  /**
   * Rotates through questions in question props.
   *
   * @param {Number} newQuestion - The new active question.
   */
  setActiveQuestion(newQuestion) {
    const { dispatch, questions } = this.props;
    // The 2 is to account for activeQuestion and status keys
    if (newQuestion >= 0 && newQuestion < (Object.keys(questions)).length - 2) {
      dispatch(questionActions.setActiveQuestion(newQuestion));
    }
  }

  /**
   * Rotates through questions in question props.
   *
   * @param {Number} newQuestion - The new active question.
   */
  loadQuestions() {
    const { dispatch } = this.props;
    questionActions.requestGetQuestions(dispatch);
  }

  /**
   * Rotates through questions in question props.
   *
   * @param {Object} answerPosDict - Contains all info necessary to position answer to new location
   * EXAMPLE: { toIndex,
   *            fromIndex,
   *            activeQuestion,
   *            toSide,
   *            fromSide }
   */
  positionAnswer(answerPosDict) {
    const { dispatch } = this.props;
    dispatch(questionActions.positionAnswer(answerPosDict));
  }

  /**
   * Called by reset button. Resets answer locations to initial state.
   *
   * @param {Number} activeQuestion - The active Question
   */
  resetActiveQuestion(activeQuestion) {
    const { dispatch } = this.props;
    dispatch(questionActions.resetActiveQuestion(activeQuestion));
  }

  /**
   * Renders a loading animation or an error button if loadQuestions() is unsuccessful.
   *
   * @param {String} status - Set to one of ('success', 'loading', 'error')
   */
  renderLoadingError(status) {
    if (status === 'loading') {
      return (
        <div className=" --vert-center col-12">
          <Spinner className="app__spinner --vert-center__child text-center" color="#007bff" />
        </div>
      );
    }
    return (
      <div className=" --vert-center col-12 text-center">
        <button onClick={() => this.loadQuestions()} className="text-center btn btn-danger my-3">
          RELOAD QUESTIONS
        </button>
        <h5 className="my-3">
          Questions did not load correctly. Please check your internet connection and try again.
        </h5>
      </div>
    );
  }
  /**
   * Renders the question container if loadQuestions() is successful.
   * Contains question text, answer components, and placeholder components
   *
   * @param {String} status - Set to one of ('success', 'loading', 'error')
   */
  renderQuestionContainer() {
    const { questions } = this.props;
    const { activeQuestion } = questions;
    const activeQuestionDict = questions[activeQuestion];
    const { questionText, answers } = activeQuestionDict;
    const {
      left,
      right,
      totalAnswers,
      activeAnswer,
    } = answers;
    return (
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
    );
  }

  render() {
    const { questions } = this.props;
    const { activeQuestion, status } = questions;
    return (
      <div className="app --dimensions-is-screen --is-loading">
        <div className="container">
          <div className="app__question-box row">
            <div className="app__question-box__header --purple d-flex align-items-center justify-content-center">
              <h1 className="app_question-box__header__question-number">
                Question 1
              </h1>
            </div>
            {status === 'loading' || status === 'error' ? this.renderLoadingError(status) : this.renderQuestionContainer()}
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
          {preloadIMGs()}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  /** dispatch is redux function to call actions */
  dispatch: PropTypes.func.isRequired,
  /** questions pulls all questions from database. Each key is the question number.
   * There are two extra keys: activeQuestion and status of firebase question loading.
   * Each question key is assigned a dict that includes the questionText, answers, activeAnswer.
   * EXAMPLE: questions: {
               0: {
                 questionText: '',
                 answers: {
                   left: {
                     0: '',
                     1: '',
                     2: '',
                     3: '',
                     4: '',
                   },
                   right: {
                   },
                   totalAnswers: 5,
                   activeAnswer: { side: 'left', index: -1 },
                 },
               },
               activeQuestion: 0,
               status: 'loading',
             };
   */
  questions: PropTypes.objectOf(PropTypes.any).isRequired,
};

function mapStateToProps(state) {
  return (state);
}

export default connect(mapStateToProps)(DragDropContext(HTML5Backend)(App));
