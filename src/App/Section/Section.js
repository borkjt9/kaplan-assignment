import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Answer from './Answer/Answer';
import Placeholder from './Placeholder/Placeholder';
import './_Section.scss';

const Section = (props) => {
  const {
    setActiveAnswer,
    positionAnswer,
    answersDict,
    totalAnswers,
    side,
    activeQuestion,
    activeAnswer,
  } = props;

  function renderPlaceholders(total) {
    const optionsInnerHTML = [...Array(total).keys()].map((index) => {
      if (answersDict[index] === undefined) {
        return (
          <Placeholder
            toIndex={index}
            fromIndex={activeAnswer.index}
            fromSide={activeAnswer.side}
            toSide={side}
            activeQuestion={activeQuestion}
            positionAnswer={positionAnswer}
          />
        );
      }
      return (
        <div className="section__answers-container__answer--blank my-4" />
      );
    });
    return (
      <div className="section__placeholder-container">
        {optionsInnerHTML}
      </div>
    );
  }

  function toggleArrowButtons(index) {
    if (index === activeAnswer.index) {
      setActiveAnswer({ side, index: -1 }, activeQuestion);
    } else {
      setActiveAnswer({ side, index }, activeQuestion);
    }
  }

  function renderAnswers() {
    const answersInnerHTML = [...Array(5).keys()].map((index) => {
      // let answerBtnClassName = 'section__answers-container__answer__answer-btn';
      // if (activeAnswer.index === index && activeAnswer.side === side) {
      //   answerBtnClassName += ' --active';
      // }
      if (answersDict[index] !== undefined) {
        return (
          <Answer
            toggleArrowButtons={toggleArrowButtons}
            activeAnswer={activeAnswer}
            side={side}
            index={index}
            answersDict={answersDict}
            totalAnswers={totalAnswers}
            positionAnswer={positionAnswer}
            activeQuestion={activeQuestion}
            setActiveAnswer={setActiveAnswer}
          />
        );
      }
      return (
        <div className="section__answers-container__answer--blank my-4" />
      );
    });

    return (
      <div className="section__answers-container">
        {answersInnerHTML}
      </div>
    );
  }

  return (
    <div className="section col-6">
      {renderPlaceholders(totalAnswers)}
      {renderAnswers()}
    </div>
  );
};


Section.propTypes = {
  setActiveAnswer: PropTypes.func.isRequired,
  positionAnswer: PropTypes.func.isRequired,
  answersDict: PropTypes.objectOf(PropTypes.any).isRequired,
  totalAnswers: PropTypes.number.isRequired,
  side: PropTypes.string.isRequired,
  activeQuestion: PropTypes.number.isRequired,
  activeAnswer: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DragDropContext(HTML5Backend)(Section);
