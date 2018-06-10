import {
  GET_QUESTIONS,
  POSITION_ANSWER,
  SET_ACTIVE_ANSWER,
  SET_ACTIVE_QUESTION,
  GET_QUESTIONS_START,
  GET_QUESTIONS_ERRORED,
  GET_QUESTIONS_FULFILLED,
} from '../constants';

import getQuestions from '../../firebase/questions';

const initialState = {
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
};

function moveAnswerHoriz(answersDict, toSide, fromSide, toIndex, fromIndex) {
  const newAnswersDict = answersDict;
  if (newAnswersDict[toSide][toIndex] === undefined) {
    newAnswersDict[toSide][toIndex] = newAnswersDict[fromSide][fromIndex];
    newAnswersDict.activeAnswer = { side: toSide, index: toIndex };
    delete newAnswersDict[fromSide][fromIndex];
    return newAnswersDict;
  } else {
    const temp = answersDict[toSide][toIndex]
    newAnswersDict[toSide][toIndex] = newAnswersDict[fromSide][fromIndex];
    newAnswersDict.activeAnswer = { side: toSide, index: toIndex };
    newAnswersDict[fromSide][fromIndex] = temp;
    return newAnswersDict;
  }
}


function moveAnswerVert(answersDict, toSide, fromSide, toIndex, fromIndex) {
  const newAnswersDict = answersDict;
  if (toIndex < 0 || toIndex >= 5 ) {
    return newAnswersDict
  } else if (newAnswersDict[toSide][toIndex] === undefined) {
      newAnswersDict[toSide][toIndex] = newAnswersDict[fromSide][fromIndex]
      newAnswersDict.activeAnswer = { side: toSide, index: toIndex };

      delete newAnswersDict[fromSide][fromIndex];
      return newAnswersDict;
  } else {
    let currIndex = toIndex;
    if (toIndex < fromIndex) {
      while (newAnswersDict[toSide][currIndex] !== undefined) {
        currIndex -= 1
      }
    } else {
      while (newAnswersDict[toSide][currIndex] !== undefined) {
        currIndex += 1
      }
    }
    if (-1 < currIndex && currIndex < 5) {
      newAnswersDict[toSide][currIndex] = newAnswersDict[fromSide][fromIndex];
      newAnswersDict.activeAnswer = { side: toSide, index: currIndex };
      delete newAnswersDict[fromSide][fromIndex];
    }
    return newAnswersDict;
  }


}



function positionAnswer(answersDict, toSide, fromSide, toIndex, fromIndex) {
  if (toSide !== fromSide) {
    return moveAnswerHoriz(answersDict, toSide, fromSide, toIndex, fromIndex);
  } else {
    return moveAnswerVert(answersDict, toSide, fromSide, toIndex, fromIndex)
  }
}

export default function questions(state = initialState, action) {
  const newState = { ... state }
  let question = -1;
  switch (action.type) {
    case GET_QUESTIONS_FULFILLED:
      console.log('get questions fulfilled', action.payload)
      return action.payload;
    case SET_ACTIVE_ANSWER:
      question = action.payload.question;
      const { activeAnswer } = action.payload;
      console.log('active answer: ', activeAnswer)
      newState[question].answers.activeAnswer = activeAnswer;
      console.log('new state: ', newState)
      return newState
    case SET_ACTIVE_QUESTION:
      const { newQuestion } = action.payload;
      newState.activeQuestion = newQuestion;
      return newState;
    case POSITION_ANSWER:
      question = action.payload.activeQuestion;
      const { toSide, fromSide, toIndex, fromIndex } = action.payload;
      const questionDict = newState[question];
      const newQuestionDict = questionDict;
      questionDict.answers = positionAnswer(questionDict.answers, toSide, fromSide, toIndex, fromIndex);
      newState[question] = questionDict;
      return newState;
    default:
      return state;
  }
}
