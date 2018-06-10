import {
  POSITION_ANSWER,
  SET_ACTIVE_ANSWER,
} from '../constants';

export function positionAnswer(data) {
  return ({
    type: POSITION_ANSWER,
    payload: data,
  });
}

export function setActiveAnswer(activeAnswer, question) {
  return ({
    type: SET_ACTIVE_ANSWER,
    payload: { activeAnswer, question },
  });
}
