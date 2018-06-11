import {
  POSITION_ANSWER,
  SET_ACTIVE_ANSWER,
  SET_ACTIVE_QUESTION,
  RESET_ACTIVE_QUESTION,
  GET_QUESTIONS_START,
  GET_QUESTIONS_ERRORED,
  GET_QUESTIONS_FULFILLED,
} from '../constants';

/**
 * Initial State suplied to store.
 * Used to kick off loading animation when questions are being loaded.
 */
const initialState = {
  status: 'loading',
  activeQuestion: -1,
};

/**
 * Called if toSide not equal from Side.
 *

 * @param {Object} answersDict - Contains current locations of answers to be rendered.
 * EXAMPLE: { left: {0: 'answer1', 1: 'answer2', 3: 'answer 4'}, right: {2: 'answer4', 4: 'answer5'}} }
 * @param {String} toSide - new side of answer. Either 'left' or 'right'.
 * @param {String} fromSide - old side of answer. Either'left' or 'right'
 * @param {Number} toIndex - new index position of answer.
 * @param {Number} fromIndex - old index position of answer.
 */

function moveAnswerHoriz(answersDict, toSide, fromSide, toIndex, fromIndex) {
  const newAnswersDict = JSON.parse(JSON.stringify(answersDict));
  // Check if new location already contains an answer.
  if (newAnswersDict[toSide][toIndex] === undefined) {
    // Move answer.
    newAnswersDict[toSide][toIndex] = newAnswersDict[fromSide][fromIndex];
    // Keeps answer active after move.
    newAnswersDict.activeAnswer = { side: toSide, index: toIndex };
    delete newAnswersDict[fromSide][fromIndex];
    return newAnswersDict;
  }

  // Below runs if new location already contains answer.
  const temp = answersDict[toSide][toIndex];
  newAnswersDict[toSide][toIndex] = newAnswersDict[fromSide][fromIndex];
  newAnswersDict.activeAnswer = { side: toSide, index: toIndex };
  newAnswersDict[fromSide][fromIndex] = temp;
  return newAnswersDict;
}

/**
 * Called if toSide equals from Side.
 *

 * @param {Object} answersDict - Contains current locations of answers to be rendered.
 * EXAMPLE: { left: {0: 'answer1', 1: 'answer2', 3: 'answer 4'}, right: {2: 'answer4', 4: 'answer5'}} }
 * @param {String} toSide - new side of answer. Either 'left' or 'right'.
 * @param {String} fromSide - old side of answer. Either'left' or 'right'
 * @param {Number} toIndex - new index position of answer.
 * @param {Number} fromIndex - old index position of answer.
 */
function moveAnswerVert(answersDict, toSide, fromSide, toIndex, fromIndex) {
  const newAnswersDict = JSON.parse(JSON.stringify(answersDict));
  // Checks if toIndex is out of range
  if (toIndex < 0 || toIndex >= 5) {
    return newAnswersDict;
    // Checks if new position is occupied.
  } else if (newAnswersDict[toSide][toIndex] === undefined) {
    newAnswersDict[toSide][toIndex] = newAnswersDict[fromSide][fromIndex];
    newAnswersDict.activeAnswer = { side: toSide, index: toIndex };
    delete newAnswersDict[fromSide][fromIndex];
    return newAnswersDict;
  }

  // If position is occupied, loop through to find next open position.
  let currIndex = toIndex;
  if (toIndex < fromIndex) {
    while (newAnswersDict[toSide][currIndex] !== undefined) {
      currIndex -= 1;
    }
  } else {
    while (newAnswersDict[toSide][currIndex] !== undefined) {
      currIndex += 1;
    }
  }
  // Checks if new position is in range.
  if (currIndex >= 0 && currIndex < 5) {
    newAnswersDict[toSide][currIndex] = newAnswersDict[fromSide][fromIndex];
    newAnswersDict.activeAnswer = { side: toSide, index: currIndex };
    delete newAnswersDict[fromSide][fromIndex];
  }
  return newAnswersDict;
}

/**
 * Calls function to move answer horizontally or vertically.
 *

 * @param {Object} answersDict - Contains current locations of answers to be rendered.
 * EXAMPLE: { left: {0: 'answer1', 1: 'answer2', 3: 'answer 4'}, right: {2: 'answer4', 4: 'answer5'}} }
 * @param {String} toSide - new side of answer. Either 'left' or 'right'.
 * @param {String} fromSide - old side of answer. Either'left' or 'right'
 * @param {Number} toIndex - new index position of answer.
 * @param {Number} fromIndex - old index position of answer.
 */
function positionAnswer(answersDict, toSide, fromSide, toIndex, fromIndex) {
  if (toSide !== fromSide) {
    return moveAnswerHoriz(answersDict, toSide, fromSide, toIndex, fromIndex);
  }
  return moveAnswerVert(answersDict, toSide, fromSide, toIndex, fromIndex);
}

/**
 * Calls function to move answer horizontally or vertically.
 *

 * @param {Object} state - Maintains state for entire application.
 * @param {Object} action - New information to be loaded to sate found in payload.
 */
export default function questions(state = initialState, action) {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case GET_QUESTIONS_START:
      newState.status = 'loading';
      return newState;
    case GET_QUESTIONS_ERRORED:
      newState.status = 'error';
      return newState;
    case GET_QUESTIONS_FULFILLED:
      return action.payload;
    case SET_ACTIVE_ANSWER: {
      const { question } = action.payload;
      const { activeAnswer } = action.payload;
      newState[question].answers.activeAnswer = activeAnswer;
      return newState;
    }
    case SET_ACTIVE_QUESTION: {
      const { newQuestion } = action.payload;
      newState.activeQuestion = newQuestion;
      return newState;
    }
    case RESET_ACTIVE_QUESTION: {
      const { activeQuestion, initialVal } = action.payload;
      newState[activeQuestion] = initialVal;
      return newState;
    }
    case POSITION_ANSWER: {
      const { activeQuestion } = action.payload;
      const {
        toSide,
        fromSide,
        toIndex,
        fromIndex,
      } = action.payload;
      const questionDict = newState[activeQuestion];
      questionDict.answers = positionAnswer(questionDict.answers, toSide, fromSide, toIndex, fromIndex);
      newState[activeQuestion] = questionDict;
      return newState;
    }
    default:
      return state;
  }
}
