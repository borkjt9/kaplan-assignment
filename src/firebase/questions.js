import {
  getQuestionsStart,
  getQuestionsErrored,
  getQuestionsFulfilled,
} from '../redux/actions/questions';

import firestoreDB from './config';

const defaultQuestionsObject = {
  activeQuestion: 0,
};

export let originalQuestionsDict = {
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

export function getQuestions(dispatch) {
  dispatch(() => {
    dispatch(getQuestionsStart());
    firestoreDB.collection('questions').get()
      .then((snapshotDocs) => {
        const snapShotLength = snapshotDocs.docs.length;
        let itemsCounted = 0;
        snapshotDocs.forEach((doc) => {
          defaultQuestionsObject[doc.id] = doc.data();
          itemsCounted += 1;
          if (itemsCounted === snapShotLength) {
            originalQuestionsDict = JSON.parse(JSON.stringify(defaultQuestionsObject));
            dispatch(getQuestionsFulfilled(defaultQuestionsObject));
          }
        });
      })
      .catch((error) => {
        dispatch(getQuestionsErrored(error));
      });
  });
}
