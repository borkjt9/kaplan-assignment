import {
  GET_QUESTIONS,
} from '../constants';

export default function items(state = { questions: [] }, action) {
  switch (action.type) {
    case GET_QUESTIONS:
      return action.payload;
    default:
      return state;
  }
}
