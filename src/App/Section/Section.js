import React from 'react';
import PropTypes from 'prop-types';
import './_Section.scss';

function renderPlaceholders(total) {
  const optionsInnerHTML = [...Array(total).keys()].map(option => (
    <div className="section__placeholder-container__option my-4 d-flex align-items-center">
      <h1 className="section__placeholder-container__option__number ml-4">{ option + 1 }</h1>
      <div className="section__placeholder-container__option__placeholder" />
    </div>
  ));
  return (
    <div className="section__placeholder-container">
      {optionsInnerHTML}
    </div>
  );
}

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


  function toggleArrowButtons(index) {
    if (index === activeAnswer.index) {
      setActiveAnswer({ side, index: -1 }, activeQuestion);
    } else {
      setActiveAnswer({ side, index }, activeQuestion);
    }
  }

  function callPositionAnswer(toIndex, fromIndex, dir) {
    const data = {
      toIndex,
      fromIndex,
      activeQuestion,
    };
    if (side === 'left' && dir === 'hor') {
      data.toSide = 'right';
      data.fromSide = 'left';
    } else if (side === 'left' && dir === 'ver') {
      data.toSide = 'left';
      data.fromSide = 'left';
    } else if (side === 'right' && dir === 'hor') {
      data.toSide = 'left';
      data.fromSide = 'right';
    } else {
      data.toSide = 'right';
      data.fromSide = 'right';
    }
    positionAnswer(data);
  }

  function renderArrowButtons(index) {
    const btnHorizClassName = `section__answers-container__answer__arrow-btn --hor --${side}`;
    const horizBtn = () => {
      return (
        <button onClick={() => callPositionAnswer(index, index, 'hor')} className={btnHorizClassName}>
          <img
            className= "section__answers-container__answer__arrow-btn__img"
            alt="move answers to left side or right side"
            src={require('../../shared/assets/horizontal-arrows.svg')}
          />
        </button>
      )
    }
    let btnUpClassName = `section__answers-container__answer__arrow-btns__arrow-btn --vert --up --${side}`;
    let btnDownClassName = `section__answers-container__answer__arrow-btns__arrow-btn --vert --down --${side}`;
    if (index === 0) {
      btnUpClassName += ' --is-disabled';
    }

    if (index === totalAnswers - 1) {
      btnDownClassName += ' --is-disabled';
    }

    if (side === 'right') {
      const upBtn = () => {
        return (
          <button onClick={() => callPositionAnswer(index-1, index, 'vert')} className={btnUpClassName}>
            <img
              className= "section__answers-container__answer__arrow-btns__arrow-btn__up__img"
              alt="move answers to left side or right side"
              src={require('../../shared/assets/up-arrow.svg')}
            />
          </button>
        );
      };
      const downBtn = () => {
        return (
          <button onClick={() => callPositionAnswer(index+1, index, 'vert')} className={btnDownClassName}>
            <img
              className= "section__answers-container__answer__arrow-btns__arrow-btn__down__img"
              alt="move answers to left side or right side"
              src={require('../../shared/assets/down-arrow.svg')}
            />
          </button>
        );
      };
      return (
        <div>
          {horizBtn()}
          <div className="section__answers-container__answer__arrow-btns --vert">
            {upBtn()}
            {downBtn()}
          </div>
        </div>
      );
    }
    return (
      horizBtn()
    );
  }

  function renderAnswers() {
    const answersInnerHTML = [...Array(5).keys()].map((index) => {
      let answerBtnClassName = 'section__answers-container__answer__answer-btn';
      if (activeAnswer.index === index && activeAnswer.side === side) {
        answerBtnClassName += ' --active';
      }
      if (answersDict[index] !== undefined) {
        return (
          <div className="section__answers-container__answer my-4">
            <button onClick={() => toggleArrowButtons(index)} className={answerBtnClassName}>
              <p className="m-2">{answersDict[index]}</p>
            </button>
            { (activeAnswer.index === index && activeAnswer.side === side) ? renderArrowButtons(index) : ''}
          </div>
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

export default Section;
