/**
 * @file Sesction
 * @author John Borkowski
 * @version 0.1
 */
import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Answer from './Answer/Answer';
import Placeholder from './Placeholder/Placeholder';
import './_Section.scss';

const Section = (props) => {
  /**
   * There are two Sections: left and right. It containers answer and placeholder locations.
   * There are a total of five Answers/Placeholders in each section.
   */
  const {
    setActiveAnswer,
    positionAnswer,
    answersDict,
    totalAnswers,
    side,
    activeQuestion,
    activeAnswer,
  } = props;

  /**
   * Renders horizontal, down, and up arrow buttons if an Answer is active.
   *
   * @param {Number} index - The index of the Answer component being rendered.
   */
  function toggleArrowButtons(index) {
    if (index === activeAnswer.index) {
      // Sets index to -1 if you click on the current active answer (i.e. to deselect)
      setActiveAnswer({ side, index: -1 }, activeQuestion);
    } else {
      setActiveAnswer({ side, index }, activeQuestion);
    }
  }

  /**
   * Renders Answer Components for indexes found in AnswersDict.
   * Renders Placeholder component if index not found.
   *
   */
  function renderAnswers() {
    const answersInnerHTML = [...Array(5).keys()].map((index) => {
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
        <Placeholder
          toIndex={index}
          fromIndex={activeAnswer.index}
          fromSide={activeAnswer.side}
          toSide={side}
          activeQuestion={activeQuestion}
          positionAnswer={positionAnswer}
        />
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
      {renderAnswers()}
    </div>
  );
};


Section.propTypes = {
  /** called in toggleArrowButtons function. I.e when answer is clicked or dragged. */
  setActiveAnswer: PropTypes.func.isRequired,
  /** Changes location of answer in section. */
  positionAnswer: PropTypes.func.isRequired,
  /**
   * Contains current locations of answers to be rendered.
   * EXAMPLE: {0: 'answer1', 1: 'answer2', 3: 'answer 4'} }
   *
   */
  answersDict: PropTypes.objectOf(PropTypes.any).isRequired,
  /**
   * Total answers for the question.
   * Used to render total number of answers and placeholders.
   */
  totalAnswers: PropTypes.number.isRequired,
  /** Either 'left' or 'right'. */
  side: PropTypes.string.isRequired,
  /** Active question number. */
  activeQuestion: PropTypes.number.isRequired,
  /**
   * Current active answer. Used to select / deselect answerComponent.
   * EXAMPLE: {side: 'left', index: 2}
   */
  activeAnswer: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DragDropContext(HTML5Backend)(Section);
