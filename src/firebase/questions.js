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
            dispatch(getQuestionsFulfilled(defaultQuestionsObject));
          }
      });
      })
      .catch((error) => {
        dispatch(getQuestionsErrored(error));
      });
  });
}
