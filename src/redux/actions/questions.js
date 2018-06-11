import {
  POSITION_ANSWER,
  SET_ACTIVE_ANSWER,
  SET_ACTIVE_QUESTION,
  RESET_ACTIVE_QUESTION,
  GET_QUESTIONS_START,
  GET_QUESTIONS_ERRORED,
  GET_QUESTIONS_FULFILLED,
} from '../constants';

import { getQuestions, originalQuestionsDict } from '../../firebase/questions';

/**
 * Submits new position for answer
 *
 * @param {Object} data - Contains all info necessary to position answer to new location
 * @key {Number} toIndex - new index position of answer.
 * @key {Number} fromIndex - old index position of answer.
 * @key {Number} activeQuestion - number reference for current question.
 * @key {String} toSide - new side of answer. Either 'left' or 'right'.
 * @key {String} fromSide - old side of answer. Either'left' or 'right'.
 */
export function positionAnswer(data) {
  return ({
    type: POSITION_ANSWER,
    payload: data,
  });
}

/**
 * When an Answer component is clicked or dragged, setActiveAnswer
 * stores that answer as active in the redux store.
 *
 * @param {Object} activeAnswer - The new active answer.
 * @key {String} side - The active side. Either 'left' or 'right'.
 * @key {Number} index - The index of the active answer
 */
export function setActiveAnswer(activeAnswer, question) {
  return ({
    type: SET_ACTIVE_ANSWER,
    payload: { activeAnswer, question },
  });
}

/**
 * Sets active question
 *
 * @param {Number} newQuestion - The new active question.
 */
export function setActiveQuestion(newQuestion) {
  return ({
    type: SET_ACTIVE_QUESTION,
    payload: { newQuestion },
  });
}

/**
 * Called by reset button. Resets answer locations in question to initial state.
 *
 * @param {Number} activeQuestion - The active Question
 */
export function resetActiveQuestion(activeQuestion) {
  const copy = JSON.parse(JSON.stringify(originalQuestionsDict[activeQuestion]));

  return ({
    type: RESET_ACTIVE_QUESTION,
    payload: { activeQuestion, initialVal: copy },
  });
}

/**
 * Called when firebase call to load questions starts.
 *
 */
export function getQuestionsStart() {
  return {
    type: GET_QUESTIONS_START,
  };
}

/**
 * Called when firebase call to load questions errors out.
 *
 * @param {Object} error - Error response returned by firebase is call is unsuccessful.
 */
export function getQuestionsErrored(error) {
  return {
    type: GET_QUESTIONS_ERRORED,
    payload: error,
  };
}

/**
 * Called when firebase call to load questions is successful.
 *
 * @param {Object} data - Data returned by loadQuestions().
 * EXAMPLE: {
 *         0: {
 *           questionText: '',
 *           answers: {
 *             left: {
 *               0: '',
 *               1: '',
 *               2: '',
 *               3: '',
 *               4: '',
 *             },
 *             right: {
 *             },
 *             totalAnswers: 5,
 *             activeAnswer: { side: 'left', index: -1 },
 *           },
 *         },
 *         activeQuestion: 0,
 *         status: 'loading',
 *       };
 */
export function getQuestionsFulfilled(data) {
  return {
    type: GET_QUESTIONS_FULFILLED,
    payload: data,
  };
}

/**
 * Called by components to load questions from Firebase.
 * This function kicks off all other actions related to loading Questions from Firebase.
 *
 * @param {Function} dispatch - Added to firebase function can communicate with store.
 */
export function requestGetQuestions(dispatch) {
  getQuestions(dispatch);
}
