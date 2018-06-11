import {
  POSITION_ANSWER,
  SET_ACTIVE_ANSWER,
  SET_ACTIVE_QUESTION,
  RESET_ACTIVE_QUESTION,
  GET_QUESTIONS_START,
  GET_QUESTIONS_ERRORED,
  GET_QUESTIONS_FULFILLED,
} from '../constants';

const initialState = {
  status: 'loading',
  activeQuestion: -1,
};

function moveAnswerHoriz(answersDict, toSide, fromSide, toIndex, fromIndex) {
  const newAnswersDict = answersDict;
  if (newAnswersDict[toSide][toIndex] === undefined) {
    newAnswersDict[toSide][toIndex] = newAnswersDict[fromSide][fromIndex];
    newAnswersDict.activeAnswer = { side: toSide, index: toIndex };
    delete newAnswersDict[fromSide][fromIndex];
    return newAnswersDict;
  }
  const temp = answersDict[toSide][toIndex];
  newAnswersDict[toSide][toIndex] = newAnswersDict[fromSide][fromIndex];
  newAnswersDict.activeAnswer = { side: toSide, index: toIndex };
  newAnswersDict[fromSide][fromIndex] = temp;
  return newAnswersDict;
}


function moveAnswerVert(answersDict, toSide, fromSide, toIndex, fromIndex) {
  const newAnswersDict = JSON.parse(JSON.stringify(answersDict));
  if (toIndex < 0 || toIndex >= 5) {
    return newAnswersDict;
  } else if (newAnswersDict[toSide][toIndex] === undefined) {
    newAnswersDict[toSide][toIndex] = newAnswersDict[fromSide][fromIndex];
    newAnswersDict.activeAnswer = { side: toSide, index: toIndex };
    delete newAnswersDict[fromSide][fromIndex];
    return newAnswersDict;
  }
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
  if (currIndex >= 0 && currIndex < 5) {
    newAnswersDict[toSide][currIndex] = newAnswersDict[fromSide][fromIndex];
    newAnswersDict.activeAnswer = { side: toSide, index: currIndex };
    delete newAnswersDict[fromSide][fromIndex];
  }
  return newAnswersDict;
}

function positionAnswer(answersDict, toSide, fromSide, toIndex, fromIndex) {
  if (toSide !== fromSide) {
    return moveAnswerHoriz(answersDict, toSide, fromSide, toIndex, fromIndex);
  }
  return moveAnswerVert(answersDict, toSide, fromSide, toIndex, fromIndex);
}

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
