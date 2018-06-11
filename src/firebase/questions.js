import firebase from 'firebase';
import '@firebase/firestore';
import {
  getQuestionsStart,
  getQuestionsErrored,
  getQuestionsFulfilled,
} from '../redux/actions/questions';

import firestoreDB from './config';

const defaultQuestionsObject = {
  activeQuestion: 0,
};

export let loadedQuestionsDict = {
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
            loadedQuestionsDict = JSON.parse(JSON.stringify(defaultQuestionsObject));
            dispatch(getQuestionsFulfilled(defaultQuestionsObject));
          }
      });
      })
      .catch((error) => {
        console.log('error', error)
        dispatch(getQuestionsErrored(error));
      });
  });
}
