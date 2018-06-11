import {
  POSITION_ANSWER,
  SET_ACTIVE_ANSWER,
  SET_ANSWER_POSITION,
  SET_ACTIVE_QUESTION,
  RESET_ACTIVE_QUESTION,
  GET_QUESTIONS_START,
  GET_QUESTIONS_ERRORED,
  GET_QUESTIONS_FULFILLED,
} from '../constants';

import { getQuestions, loadedQuestionsDict } from '../../firebase/questions';

export function positionAnswer(data) {
  console.log('loadedQuestionsDict')
  return ({
    type: POSITION_ANSWER,
    payload: data,
  });
}

export function setAnswerPosition(index, position) {
  return ({
    type: SET_ANSWER_POSITION,
    payload: { index, position },
  });
}

export function setActiveAnswer(activeAnswer, question) {
  return ({
    type: SET_ACTIVE_ANSWER,
    payload: { activeAnswer, question },
  });
}

export function setActiveQuestion(newQuestion) {
  return ({
    type: SET_ACTIVE_QUESTION,
    payload: { newQuestion },
  });
}

export function resetActiveQuestion(activeQuestion) {
  console.log('active question: ', activeQuestion)
  console.log('loadedQuestionsDict action', loadedQuestionsDict)
  const copy = JSON.parse(JSON.stringify(loadedQuestionsDict[activeQuestion]));

  return ({
    type: RESET_ACTIVE_QUESTION,
    payload: { activeQuestion, initialVal: copy },
  });
}

export function getQuestionsStart() {
  return {
    type: GET_QUESTIONS_START,
  };
}

export function getQuestionsErrored(error) {
  return {
    type: GET_QUESTIONS_ERRORED,
    payload: error,
  };
}

export function getQuestionsFulfilled(data) {
  return {
    type: GET_QUESTIONS_FULFILLED,
    payload: data,
  };
}

export function requestGetQuestions(dispatch) {
  getQuestions(dispatch);
}
